import { copy, clamp, toWorld, dist, mid, norm, emptyPlay, newPlay, validate,
  framePose, arrowsInto, zonesAt, newFrame,
  addPlayer, removePlayer, defaultSpot, isInvolved, discPoint,
  hasMoved, hasTurned, hasPass, sampleAt, poseAt, totalTime, transitionStart, MAX_FRAMES } from './model.js';
import { measure, pointPixel, playerRadius, handleRadius, discPixel, screenAngle,
  hitZone, zoneGeom, captionHeight, drawCaption, draw, setDiscLogo } from './render.js';
// gifenc 1.0.3 (MIT) : voir vendor/LICENSE-gifenc.md
import { GIFEncoder, quantize, applyPalette } from './vendor/gifenc.esm.js';

const $ = id => document.getElementById(id), canvas = $('field'), ctx = canvas.getContext('2d');
const storage = 'ulti-tactics-v8', oldStorage = 'ulti-tactics-v7', legacyStorage = 'ulti-tactics-v6';
let play, cur = 0, selected = null, zoneSel = null, zoneMode = null, drag = null, board;
let time = 0, running = false, raf = 0, last = 0, readOnly = false, history = [];
let stepTarget = null;
const logo = new Image();
logo.onload = () => { setDiscLogo(logo); if (board) render(); };
logo.src = '/images/logo_aigles_2025.png';
const seq = () => play.frames;
const story = () => play;
const current = () => play.frames[cur];
const hint = text => { $('hint').textContent = text || ''; };
function remember(state = JSON.stringify(play)) { history.push(state); if (history.length > 40) history.shift(); }
function persist() { if (!readOnly) { try { localStorage.setItem(storage, JSON.stringify(play)); } catch {} } }
function stop() { running = false; cancelAnimationFrame(raf); $('play').textContent = '▶'; stepTarget = null; }
function clipCursor() { cur = clamp(cur, 0, seq().length - 1); }
const playing = () => running || time > 0;
const frameNumber = k => `Temps ${k + 1}`;
document.querySelectorAll('[data-editor-tab]').forEach(button => {
  button.onclick = () => {
    const selected = button.dataset.editorTab;
    document.querySelectorAll('[data-editor-tab]').forEach(tab => tab.setAttribute('aria-selected', String(tab === button)));
    document.querySelectorAll('[data-editor-panel]').forEach(panel => { panel.hidden = panel.dataset.editorPanel !== selected; });
  };
});

function captionInfo(k) {
  const f = seq()[clamp(k, 0, seq().length - 1)];
  return { head: frameNumber(k), title: f.title || '', text: f.text || '' };
}
function rotationHandle(p) {
  // Direction vers laquelle pointe le triangle sur le terrain ; sans rotation, vers le haut de l'écran.
  const angle = p.r == null ? 0 : p.r;
  const rad = angle * Math.PI / 180, d = (playerRadius(board) + handleRadius(board) + 16) / board.scale;
  return { from: p, to: { x: p.x + Math.cos(rad) * d, y: p.y + Math.sin(rad) * d } };
}
function editScene(k = cur, interactive = true) {
  const L = story(), arrows = arrowsInto(L, k);
  const ghosts = k > 0 ? play.players.filter(p => hasMoved(L, k, p.id))
    .map(p => ({ ...p, ...L.frames[k - 1].pos[p.id] })) : [];
  const handles = [], zoneHandles = [];
  if (interactive && selected && k > 0) {
    const a = arrows.find(a => a.id === selected);
    if (a) handles.push(a.c || mid(a.from, a.to));
  }
  if (interactive && zoneSel && zonesAt(L, k).includes(zoneSel)) zoneHandles.push(zoneSel.a, zoneSel.b);
  const pose = framePose(L, k), defender = pose.players.find(p => p.id === selected && p.team === 'd');
  return { ...pose, arrows, ghosts, handles, zoneHandles, selected: interactive ? selected : null,
    selectedZone: interactive ? zoneSel : null, rotHandle: interactive && defender ? rotationHandle(defender) : null,
    zones: zonesAt(L, k) };
}
function playScene(t) {
  const L = story(), s = sampleAt(L, t), k = s.t > 0 ? s.frame + 1 : s.frame;
  return { ...poseAt(L, s), arrows: s.seg ? arrowsInto(L, s.seg) : [],
    arrowAlpha: s.t > 0 ? .55 : .85, zones: zonesAt(L, k), s, captionIndex: k };
}
function showCaption(k) {
  const info = captionInfo(k), hasText = !!(info.title || info.text);
  const box = $('caption'); box.classList.toggle('empty', !hasText && readOnly);
  $('capHead').textContent = info.head;
  $('capTitle').textContent = info.title;
  $('capText').textContent = info.text;
  if (readOnly) {
    const list = $('readingSteps'), active = list.querySelector(`[data-reading-index="${k}"]`);
    if (active && !active.classList.contains('active')) {
      list.querySelector('.active')?.classList.remove('active');
      active.classList.add('active');
      const top = active.offsetTop - list.offsetTop;
      if (top < list.scrollTop || top + active.offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTop = Math.max(0, top - 18);
      }
    }
  } else {
    const list = $('creationStepList'), active = list.querySelector(`[data-creation-index="${k}"]`);
    if (active && !active.classList.contains('active')) {
      list.querySelector('.active')?.classList.remove('active');
      active.classList.add('active');
    }
  }
}
function render() {
  const scene = playing() ? playScene(time) : editScene();
  draw(ctx, board, scene, { showPaths: $('showPaths').checked, force: play.force });
  const L = story(), total = totalTime(L);
  $('scrub').value = Math.round(Math.min(time, total) / total * 1000);
  const k = playing() ? scene.captionIndex : cur;
  showCaption(k);
  document.querySelectorAll('#frames button[data-index]').forEach(b => b.classList.toggle('playing', playing() && Number(b.dataset.index) === k));
  document.querySelectorAll('#readonlyTimeline .time-node').forEach(b => b.classList.toggle('active', Number(b.dataset.timeIndex) === k));
}
function describe(k) {
  const L = story(), f = L.frames[k];
  if (k === 0) return 'départ';
  const n = play.players.filter(p => hasMoved(L, k, p.id)).length;
  const parts = [];
  if (n) parts.push(`${n} course${n > 1 ? 's' : ''}`);
  if (hasPass(L, k)) parts.push('passe');
  if (play.players.some(p => p.team === 'd' && hasTurned(L, k, p.id))) parts.push('orientation');
  if (f.zones?.length) parts.push(`${f.zones.length} zone${f.zones.length > 1 ? 's' : ''}`);
  if (f.title || f.text) parts.push('texte');
  return parts.join(' · ') || 'rien';
}
function buildFrames() {
  const box = $('frames'); box.replaceChildren();
  seq().forEach((_, k) => {
    const b = document.createElement('button'); b.dataset.index = k;
    const title = document.createTextNode(frameNumber(k)), small = document.createElement('small'); small.textContent = describe(k);
    b.append(title, small); b.classList.toggle('active', k === cur);
    b.onclick = () => goTo(k); box.append(b);
  });
  const active = box.querySelector(`button[data-index="${cur}"]`);
  if (active) {
    const bounds = box.getBoundingClientRect(), item = active.getBoundingClientRect();
    // Ne défile que la chronologie horizontalement : scrollIntoView déplaçait toute la page.
    if (item.left < bounds.left) box.scrollLeft += item.left - bounds.left;
    else if (item.right > bounds.right) box.scrollLeft += item.right - bounds.right;
  }
  if (readOnly) buildReadingTimeline();
}
function buildReadingTimeline() {
  const box = $('readonlyTimeline'); box.replaceChildren(); box.hidden = false;
  for (let k = 0; k < seq().length; k++) {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'time-node';
    b.dataset.timeIndex = k; b.textContent = String(k + 1); b.title = frameNumber(k);
    b.onclick = () => goTo(k); box.append(b);
  }
}
function buildReadingSteps() {
  const box = $('readingSteps'); box.replaceChildren();
  if (!readOnly) return;
  for (let k = 0; k < seq().length; k++) {
    const info = captionInfo(k), b = document.createElement('button');
    b.type = 'button'; b.className = 'reading-step'; b.dataset.readingIndex = k;
    const head = document.createElement('strong'); head.textContent = info.head; b.append(head);
    for (const [value, className] of [[info.title, 'reading-title'], [info.text, 'reading-text']]) {
      if (value) { const el = document.createElement('span'); el.className = className; el.textContent = value; b.append(el); }
    }
    if (!info.title && !info.text) {
      const text = document.createElement('span'); text.className = 'reading-text';
      text.textContent = k === 0 ? 'Situation initiale' : describe(k); b.append(text);
    }
    b.onclick = () => goTo(k); box.append(b);
  }
}
function buildCreationSteps() {
  const box = $('creationStepList'), previousScroll = box.scrollTop; box.replaceChildren();
  if (readOnly) return;
  seq().forEach((_, k) => {
    const info = captionInfo(k), b = document.createElement('button');
    b.type = 'button'; b.className = 'reading-step'; b.dataset.creationIndex = k;
    const head = document.createElement('strong'); head.textContent = info.head; b.append(head);
    for (const [value, className] of [[info.title, 'reading-title'], [info.text, 'reading-text']]) {
      if (value) { const el = document.createElement('span'); el.className = className; el.textContent = value; b.append(el); }
    }
    if (!info.title && !info.text) {
      const text = document.createElement('span'); text.className = 'reading-text';
      text.textContent = k === 0 ? 'Situation initiale' : describe(k); b.append(text);
    }
    b.onclick = () => goTo(k); box.append(b);
  });
  box.scrollTop = previousScroll;
  const active = box.querySelector(`[data-creation-index="${cur}"]`);
  if (active) {
    const top = active.offsetTop - box.offsetTop;
    if (top < box.scrollTop || top + active.offsetHeight > box.scrollTop + box.clientHeight) {
      box.scrollTop = Math.max(0, top - 12);
    }
  }
}
function openEditorTab(name) {
  const button = document.querySelector(`[data-editor-tab="${name}"]`);
  if (button && button.getAttribute('aria-selected') !== 'true') button.click();
}
function updatePanels() {
  const f = current(); $('textFor').textContent = frameNumber(cur).toLowerCase();
  const namedPlayer = play.players.find(p => p.id === selected);
  $('playerPanel').hidden = !namedPlayer;
  if (namedPlayer) {
    $('playerNameFor').textContent = `${namedPlayer.team === 'o' ? 'attaque' : 'défense'} ${selected.slice(1)}`;
    if (document.activeElement !== $('playerName')) $('playerName').value = play.names?.[selected] || '';
  }
  for (const [id, key] of [['fTitle', 'title'], ['fText', 'text']]) {
    if (document.activeElement !== $(id)) $(id).value = f[key] || '';
  }
  const found = zoneSel && zonesAt(story(), cur).includes(zoneSel);
  if (!found) zoneSel = null;
  $('zoneProps').hidden = !zoneSel;
  if (zoneSel) {
    const owner = seq().findIndex(x => x.zones?.includes(zoneSel));
    $('zoneOrigin').textContent = owner < cur ? `Zone créée au ${frameNumber(owner).toLowerCase()}, gardée ici.` : `Zone de ce temps.`;
    if (document.activeElement !== $('zoneLabel')) $('zoneLabel').value = zoneSel.label || '';
    $('zoneKindSel').value = zoneSel.kind; $('zoneKeep').checked = zoneSel.keep;
  }
  const defender = play.players.find(p => p.id === selected && p.team === 'd');
  $('defPanel').hidden = !defender;
  if (defender) {
    $('defName').textContent = `défenseur ${selected.slice(1)} — ${frameNumber(cur).toLowerCase()}`;
    const r = f.pos[selected].r;
    const shown = r == null ? 0 : norm(r);
    if (document.activeElement !== $('rot')) $('rot').value = String(Math.round(shown / 5) * 5);
    $('rotVal').textContent = `${Math.round(shown)}°`;
  }
  document.querySelectorAll('[data-zone]').forEach(b => b.classList.toggle('active', b.dataset.zone === zoneMode));
}
function updateButtons() {
  const L = story();
  $('undo').disabled = !history.length;
  $('removeMove').disabled = !(selected && (cur === 0 ? selected !== 'disc' : selected === 'disc' ? hasPass(L, cur) : hasMoved(L, cur, selected) || hasTurned(L, cur, selected)));
  $('delFrame').disabled = seq().length < 2;
  $('addFrame').disabled = seq().length >= MAX_FRAMES;
  $('prev').disabled = !playing() && cur === 0;
  $('next').disabled = !playing() && cur >= seq().length - 1;
  $('stepPlay').disabled = !playing() && cur === 0;
}
function refresh() {
  clipCursor();
  $('force').value = play.force; $('speed').value = String(play.speed);
  board = measure(); canvas.width = board.w; canvas.height = board.h;
  buildFrames(); buildReadingSteps(); buildCreationSteps(); buildBench(); updatePanels(); updateButtons(); render();
  if (!play.players.length && !readOnly) hint('Glissez des joueurs depuis le banc, ou cliquez-les.');
}
function changed() { persist(); buildFrames(); buildReadingSteps(); buildCreationSteps(); buildBench(); updatePanels(); updateButtons(); render(); }
function goTo(k) { stop(); time = 0; cur = clamp(k, 0, seq().length - 1); selected = null; zoneSel = null; zoneMode = null; refresh(); }

/* ---------- coordonnées et détection ---------- */
function canvasPixel(e) { const r = canvas.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * board.w, y: (e.clientY - r.top) / r.height * board.h }; }
const locate = e => { const px = canvasPixel(e); return toWorld({ x: px.x / board.scale, y: px.y / board.scale }); };
const bounded = p => ({ x: clamp(p.x, 50, 100), y: clamp(p.y, 0, 37) });
const pxDist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const slack = px => px * board.w / canvas.getBoundingClientRect().width;
function hitPlayer(px, scene, except) {
  return [...scene.players].reverse().find(p => p.id !== except && pxDist(px, pointPixel(p, board)) < playerRadius(board) + slack(5));
}
const hitDisc = (px, scene) => { const d = discPixel(scene.disc, board); return pxDist(px, d) < d.r + slack(6); };
const hitHandle = (px, scene) => scene.handles.some(h => pxDist(px, pointPixel(h, board)) < handleRadius(board) + slack(8));
function hitZoneHandle(px, scene) { return scene.zoneHandles.findIndex(h => pxDist(px, pointPixel(h, board)) < handleRadius(board) + slack(8)); }
function hitRotHandle(px, scene) { return scene.rotHandle && pxDist(px, pointPixel(scene.rotHandle.to, board)) < handleRadius(board) + slack(8); }
function findZone(px) { return [...zonesAt(story(), cur)].reverse().find(z => hitZone(z, board, px, slack(3))) || null; }
const posKey = q => `${q.x},${q.y},${q.r ?? ''}`;
const discKey = d => d.carrier ? `c:${d.carrier}` : `f:${d.x},${d.y}`;
function chain(key, read) {
  const L = seq(), ref = key(read(current())), out = [];
  for (let j = cur + 1; j < L.length && key(read(L[j])) === ref; j++) out.push(L[j]);
  return out;
}
function zoneOwner(z) { return seq().find(f => f.zones?.includes(z)); }

/* ---------- rotation ---------- */
function setRotation(id, angle, linked) {
  const q = current().pos[id], prev = q.r;
  const links = linked || chain(v => String(v), f => f.pos[id].r ?? null);
  q.r = norm(angle);
  for (const f of links) if (f.pos[id].r === prev) f.pos[id].r = q.r;
}
function rotationAtPointer(id, e) {
  const origin = current().pos[id], p = locate(e), raw = Math.atan2(p.y - origin.y, p.x - origin.x) * 180 / Math.PI;
  const snap = e.shiftKey ? 15 : 5;
  setRotation(id, Math.round(raw / snap) * snap, drag.chain);
}
$('rot').onpointerdown = () => {
  $('rot').dataset.before = JSON.stringify(play);
  if (selected?.[0] === 'd') $('rot').rotationChain = chain(v => String(v), f => f.pos[selected].r ?? null);
};
$('rot').oninput = e => {
  if (!selected || selected[0] !== 'd') return;
  if (!$('rot').dataset.before) $('rot').dataset.before = JSON.stringify(play);
  if (!$('rot').rotationChain) $('rot').rotationChain = chain(v => String(v), f => f.pos[selected].r ?? null);
  setRotation(selected, Number(e.target.value), $('rot').rotationChain);
  $('rotVal').textContent = `${e.target.value}°`; persist(); render();
};
$('rot').onchange = () => {
  const before = $('rot').dataset.before; if (before && before !== JSON.stringify(play)) remember(before);
  delete $('rot').dataset.before; delete $('rot').rotationChain; changed();
};
$('faceDisc').onclick = () => {
  if (!selected || selected[0] !== 'd') return;
  remember(); const q = current().pos[selected], d = discPoint(current());
  setRotation(selected, Math.atan2(d.y - q.y, d.x - q.x) * 180 / Math.PI); changed();
};
$('faceBack').onclick = () => { if (!selected || selected[0] !== 'd') return; remember(); setRotation(selected, 180); changed(); };

/* ---------- édition sur le terrain ---------- */
canvas.addEventListener('pointerdown', e => {
  if (readOnly) return;
  if (playing()) { const s = sampleAt(story(), time); stop(); time = 0; cur = s.t > 0 ? s.frame + 1 : s.frame; selected = null; zoneSel = null; buildFrames(); }
  const scene = editScene(), px = canvasPixel(e), p = bounded(locate(e)), before = JSON.stringify(play);
  if (hitRotHandle(px, scene)) drag = { type: 'rotate', id: selected, before,
    chain: chain(v => String(v), f => f.pos[selected].r ?? null) };
  else if (zoneSel && hitZoneHandle(px, scene) >= 0) drag = { type: 'zoneHandle', handle: hitZoneHandle(px, scene), before };
  else if (hitHandle(px, scene)) drag = { type: 'curve', before };
  else if (zoneMode) {
    if ((current().zones || []).length >= 12) { hint('Maximum 12 zones par temps.'); return; }
    const z = { id: `z${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      shape: zoneMode, kind: $('zoneKind').value, a: p, b: { ...p }, label: '', keep: false };
    current().zones.push(z); zoneSel = z; selected = null; drag = { type: 'newZone', before }; zoneMode = null;
  } else if (hitDisc(px, scene)) { selected = 'disc'; zoneSel = null; drag = { type: 'disc', before, chain: chain(discKey, f => f.disc) }; }
  else {
    const pl = hitPlayer(px, scene);
    if (pl) { selected = pl.id; zoneSel = null; drag = { type: 'player', id: pl.id, before, chain: chain(posKey, f => f.pos[pl.id]) }; }
    else { selected = null; zoneSel = findZone(px); if (zoneSel) drag = { type: 'zoneMove', start: p, a: copy(zoneSel.a), b: copy(zoneSel.b), before }; }
  }
  if (drag) { canvas.setPointerCapture(e.pointerId); canvas.classList.add('dragging'); }
  if ((selected && selected !== 'disc') || zoneSel) openEditorTab('pedagogy');
  if (selected && cur === 0) hint('Temps 1 = position de départ. Cliquez « + Temps » puis déplacez les joueurs pour créer un mouvement.');
  updatePanels(); updateButtons(); render();
});
canvas.addEventListener('pointermove', e => {
  if (!drag) return;
  const p = bounded(locate(e)), f = current();
  if (drag.type === 'player') {
    const q = f.pos[drag.id]; q.x = p.x; q.y = p.y;
    for (const next of drag.chain) { next.pos[drag.id].x = p.x; next.pos[drag.id].y = p.y; }
    $('bench').classList.toggle('drop', overBench(e));
  } else if (drag.type === 'disc') f.disc = { carrier: null, x: p.x, y: p.y, ...(f.disc.c ? { c: f.disc.c } : {}) };
  else if (drag.type === 'curve') (selected === 'disc' ? f.disc : f.pos[selected]).c = p;
  else if (drag.type === 'rotate') rotationAtPointer(drag.id, e);
  else if (drag.type === 'newZone') zoneSel.b = p;
  else if (drag.type === 'zoneHandle') zoneSel[drag.handle === 0 ? 'a' : 'b'] = p;
  else if (drag.type === 'zoneMove') {
    const dx = p.x - drag.start.x, dy = p.y - drag.start.y;
    const minX = Math.min(drag.a.x, drag.b.x), maxX = Math.max(drag.a.x, drag.b.x);
    const minY = Math.min(drag.a.y, drag.b.y), maxY = Math.max(drag.a.y, drag.b.y);
    const X = clamp(dx, 50 - minX, 100 - maxX), Y = clamp(dy, -minY, 37 - maxY);
    zoneSel.a = { x: drag.a.x + X, y: drag.a.y + Y }; zoneSel.b = { x: drag.b.x + X, y: drag.b.y + Y };
  }
  drag.moved = true; render();
});
function pointerEnd(e) {
  if (!drag) return;
  canvas.classList.remove('dragging'); $('bench').classList.remove('drop');
  if (drag.type === 'player' && overBench(e)) {
    const id = drag.id; play = JSON.parse(drag.before); removePlayer(play, id);
    remember(drag.before); drag = null; selected = null;
    hint(`Joueur ${id.slice(1)} renvoyé sur le banc (Ctrl+Z pour annuler).`); changed(); return;
  }
  const f = current();
  if (drag.type === 'disc' && drag.moved) {
    const target = hitPlayer(canvasPixel(e), editScene(cur, false)), p = bounded(locate(e));
    const d = target ? { carrier: target.id, x: p.x, y: p.y } : { carrier: null, x: p.x, y: p.y };
    const prior = cur > 0 ? seq()[cur - 1] : f;
    if (f.disc.c && hasPass({ ...play, frames: [prior, { ...f, disc: d }] }, 1)) d.c = f.disc.c;
    f.disc = d;
    for (const next of drag.chain) next.disc = { carrier: d.carrier, x: d.x, y: d.y };
    if (cur === 0) hint(target ? `Le disque est au joueur ${target.id.slice(1)}.` : 'Disque posé au sol.');
    else hint(hasPass(story(), cur) ? 'Passe créée. Tirez le rond orange pour la courber.' : '');
  } else if (drag.type === 'player' && drag.moved && cur > 0) {
    hint(hasMoved(story(), cur, drag.id) ? 'Course créée. Tirez le rond orange pour la courber.' : '');
  } else if (drag.type === 'curve') {
    const a = arrowsInto(story(), cur).find(a => a.id === selected), target = selected === 'disc' ? f.disc : f.pos[selected];
    if (a && a.c && pxDist(pointPixel(a.c, board), pointPixel(mid(a.from, a.to), board)) < slack(10)) delete target.c;
  } else if (drag.type === 'newZone') {
    const g = zoneGeom(zoneSel, board);
    if ((zoneSel.shape === 'arrow' ? Math.hypot(g.w, g.h) : Math.min(g.w, g.h)) < slack(16)) {
      f.zones = f.zones.filter(z => z !== zoneSel); zoneSel = null;
    } else hint('Zone créée. Renseignez son étiquette et choisissez si elle reste aux temps suivants.');
  }
  if (JSON.stringify(play) !== drag.before) remember(drag.before);
  drag = null; changed();
}
canvas.addEventListener('pointerup', pointerEnd);
canvas.addEventListener('pointercancel', pointerEnd);
canvas.addEventListener('dblclick', e => {
  if (readOnly || playing() || cur === 0) return;
  const p = hitPlayer(canvasPixel(e), editScene());
  if (p) { selected = p.id; zoneSel = null; removeMove(); }
});

/* ---------- textes et zones ---------- */
function trackedInput(id, update) {
  const el = $(id);
  el.addEventListener('focus', () => { el.dataset.before = JSON.stringify(play); });
  el.addEventListener('input', () => {
    update(el); persist();
    if (['fTitle', 'fText'].includes(id)) buildCreationSteps();
    render();
  });
  el.addEventListener('blur', () => {
    if (el.dataset.before && el.dataset.before !== JSON.stringify(play)) remember(el.dataset.before);
    delete el.dataset.before; changed();
  });
}
for (const [id, key] of [['fTitle', 'title'], ['fText', 'text']]) {
  trackedInput(id, el => { current()[key] = el.value; });
}
trackedInput('playerName', el => {
  if (!play.players.some(p => p.id === selected)) return;
  play.names ||= {};
  const name = el.value.trim();
  if (name) play.names[selected] = name;
  else delete play.names[selected];
  buildBench();
});
document.querySelectorAll('[data-zone]').forEach(b => b.onclick = () => {
  zoneMode = zoneMode === b.dataset.zone ? null : b.dataset.zone;
  selected = null; zoneSel = null; updatePanels(); render();
  hint(zoneMode ? 'Glissez sur le terrain pour dessiner la zone pédagogique.' : '');
});
trackedInput('zoneLabel', el => { if (zoneSel) zoneSel.label = el.value; });
$('zoneKindSel').onchange = e => { if (!zoneSel) return; remember(); zoneSel.kind = e.target.value; changed(); };
$('zoneKeep').onchange = e => { if (!zoneSel) return; remember(); zoneSel.keep = e.target.checked; changed(); };
function deleteZone() {
  if (!zoneSel) return;
  remember(); const owner = zoneOwner(zoneSel); owner.zones = owner.zones.filter(z => z !== zoneSel);
  zoneSel = null; changed();
}
$('zoneDelete').onclick = deleteZone;

/* Remet le joueur (ou le disque) sélectionné à sa pose du temps précédent. */
function removeMove() {
  if (cur === 0 && selected && selected !== 'disc') { benchPlayer(selected); return; }
  if (cur === 0 || !selected) return;
  const prev = seq()[cur - 1]; remember();
  if (selected === 'disc') {
    const links = chain(discKey, f => f.disc), d = prev.disc;
    for (const f of [current(), ...links]) f.disc = { carrier: d.carrier, x: d.x, y: d.y };
  } else {
    const links = chain(posKey, f => f.pos[selected]), q = prev.pos[selected];
    for (const f of [current(), ...links]) f.pos[selected] = { x: q.x, y: q.y, ...(q.r == null ? {} : { r: q.r }) };
  }
  hint(''); changed();
}
$('removeMove').onclick = removeMove;

/* ---------- banc des joueurs ---------- */
function overBench(e) { const r = $('bench').getBoundingClientRect(); return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom; }
const onField = id => play.players.some(p => p.id === id);
function placePlayer(id, p) {
  if (onField(id)) return;
  remember(); addPlayer(play, id, p); selected = id;
  hint(`${id[0] === 'o' ? 'Attaquant' : 'Défenseur'} ${id.slice(1)} placé.` + (current().disc.carrier ? '' : ' Glissez le disque sur le porteur.'));
  changed();
}
function benchPlayer(id) {
  if (!onField(id)) return;
  if (seq().length > 1 && isInvolved(play, id) && !confirm(`Le joueur ${id.slice(1)} a des mouvements. Le renvoyer sur le banc ?`)) return;
  remember(); removePlayer(play, id); if (selected === id) selected = null;
  hint(`Joueur ${id.slice(1)} renvoyé sur le banc.`); changed();
}
function buildBench() {
  for (const team of ['o', 'd']) {
    const box = $(team === 'o' ? 'benchO' : 'benchD'); box.replaceChildren();
    for (let n = 1; n <= 7; n++) {
      const id = team + n, placed = onField(id), b = document.createElement('button');
      b.className = `tok ${team}${placed ? ' placed' : ''}`;
      b.innerHTML = `<span>${n}</span>`;
      const name = play.names?.[id];
      b.title = `${team === 'o' ? 'Attaquant' : 'Défenseur'} ${n}${name ? ` — ${name}` : ''} : ${placed ? 'cliquer pour le renvoyer sur le banc' : 'glisser sur le terrain (ou cliquer)'}`;
      b.addEventListener('pointerdown', e => benchDown(e, id, b)); box.append(b);
    }
  }
}
function benchDown(e, id, token) {
  if (readOnly || e.button > 0) return;
  e.preventDefault();
  if (playing()) { stop(); time = 0; render(); }
  const placed = onField(id), start = { x: e.clientX, y: e.clientY };
  let moved = false, ghost = null;
  const move = ev => {
    if (!moved && Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > 6) {
      moved = true;
      if (!placed) { ghost = token.cloneNode(true); ghost.classList.add('drag-ghost'); document.body.append(ghost); }
    }
    if (ghost) { ghost.style.left = ev.clientX + 'px'; ghost.style.top = ev.clientY + 'px'; }
  };
  const end = ev => {
    window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', end); window.removeEventListener('pointercancel', end);
    ghost?.remove(); if (ev.type === 'pointercancel') return;
    if (placed) { if (!moved) benchPlayer(id); return; }
    const r = canvas.getBoundingClientRect();
    const inside = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
    if (!moved) placePlayer(id, defaultSpot(id));
    else if (inside) placePlayer(id, bounded(locate(ev)));
  };
  window.addEventListener('pointermove', move); window.addEventListener('pointerup', end); window.addEventListener('pointercancel', end);
}
/* ---------- temps ---------- */
$('addFrame').onclick = () => {
  if ($('addFrame').disabled) return;
  stop(); time = 0; remember();
  const f = newFrame(current());
  play.frames.splice(cur + 1, 0, f);
  cur++; selected = null; zoneSel = null;
  hint(`${frameNumber(cur)} : déplacez les joueurs, le disque ou les défenseurs ; ajoutez une explication ou une zone.`);
  changed();
};
$('delFrame').onclick = () => {
  if ($('delFrame').disabled) return;
  stop(); time = 0; remember();
  play.frames.splice(cur, 1);
  clipCursor(); selected = null; zoneSel = null; hint(''); changed();
};

/* ---------- réglages ---------- */
$('force').onchange = e => {
  remember(); play.force = e.target.value; persist(); updateButtons(); render();
  if (play.force !== 'none' && !current().disc.carrier) hint('La zone « OUVERT » s’affiche quand un joueur tient le disque : glissez le disque sur un attaquant.');
  else hint('');
};
$('reset').onclick = () => {
  if ((play.players.length || seq().length > 1) && !confirm('Réinitialiser : vider le terrain et effacer tous les temps ?')) return;
  remember(); stop(); time = 0; cur = 0; selected = null; zoneSel = null;
  play = emptyPlay(play.speed, play.force); persist(); refresh();
};
$('undo').onclick = () => {
  if (!history.length) return;
  stop(); time = 0; play = validate(JSON.parse(history.pop())); clipCursor();
  selected = null; zoneSel = null; persist(); refresh();
};
$('speed').onchange = e => { play.speed = Number(e.target.value); persist(); render(); };
$('showPaths').onchange = render;
document.addEventListener('keydown', e => {
  if (readOnly && !['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) return;
  if (/INPUT|SELECT|TEXTAREA|BUTTON/.test(e.target.tagName)) return;
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !readOnly) { e.preventDefault(); $('undo').click(); }
  else if ((e.key === 'Delete' || e.key === 'Backspace') && !readOnly) { if (zoneSel) deleteZone(); else removeMove(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); $('prev').click(); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); $('next').click(); }
  else if (e.key === ' ') { e.preventDefault(); $('play').click(); }
});

/* ---------- lecture pas à pas et lecture complète ---------- */
function tick(now) {
  if (!running) return;
  const L = story(), total = totalTime(L);
  time += Math.min((now - last) / 1000, .1); last = now;
  if (stepTarget != null && time >= stepTarget) {
    time = 0; cur = clamp(Math.floor((stepTarget - HOLD) / (L.speed + HOLD)) + 1, 0, L.frames.length - 1);
    stop(); refresh(); return;
  }
  if (time >= total) {
    if ($('loop').checked) time = .0001;
    else { time = total; stop(); render(); return; }
  }
  render(); raf = requestAnimationFrame(tick);
}
$('play').onclick = () => {
  if (running) { stop(); render(); return; }
  if (seq().length < 2) { hint('Ajoutez au moins un temps avec « + Temps » pour créer une animation.'); return; }
  if (time >= totalTime(story()) || time === 0) time = .0001;
  selected = null; zoneSel = null; running = true; last = performance.now(); $('play').textContent = '❚❚';
  raf = requestAnimationFrame(tick);
};
$('stop').onclick = () => { stop(); time = 0; cur = 0; refresh(); };
$('scrub').oninput = e => {
  stop(); time = Math.max(.0001, Number(e.target.value) / 1000 * totalTime(story()));
  render();
};
$('prev').onclick = () => {
  const k = playing() ? playScene(time).captionIndex : cur;
  goTo(Math.max(0, k - 1));
};
$('next').onclick = () => {
  const k = playing() ? playScene(time).captionIndex : cur;
  goTo(Math.min(seq().length - 1, k + 1));
};
$('stepPlay').onclick = () => {
  if (running) stop();
  const k = playing() ? playScene(time).captionIndex : cur;
  if (k < 1) { hint('Choisissez un temps après le départ, puis cliquez « ↻ » pour animer cette transition.'); return; }
  time = transitionStart(story(), k - 1) + .0001;
  stepTarget = transitionStart(story(), k - 1) + story().speed;
  selected = null; zoneSel = null; running = true; last = performance.now(); $('play').textContent = '❚❚';
  raf = requestAnimationFrame(tick);
};

/* ---------- exports ---------- */
function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = filename; a.click(); setTimeout(() => URL.revokeObjectURL(url), 30000);
}
function offscreen() {
  const m = measure(Number($('gifWidth').value)), c = document.createElement('canvas');
  c.width = m.w; c.height = m.h + ($('withText').checked ? captionHeight(m) : 0);
  return { m, c, context: c.getContext('2d', { willReadFrequently: true }) };
}
function exportScene(context, m, scene, k) {
  draw(context, m, scene, { showPaths: $('showPaths').checked, force: play.force });
  if ($('withText').checked) drawCaption(context, m, captionInfo(k), m.h, captionHeight(m));
}
$('png').onclick = () => {
  const { m, c, context } = offscreen(), scene = playing() ? playScene(time) : editScene(cur, false);
  exportScene(context, m, scene, playing() ? scene.captionIndex : cur);
  c.toBlob(blob => blob && saveBlob(blob, `ulti-tactics-temps${cur + 1}.png`));
};
$('gif').onclick = async () => {
  const button = $('gif'), status = $('exportStatus'), L = story();
  if (L.frames.length < 2) { status.textContent = 'Ajoutez un deuxième temps pour un GIF animé.'; return; }
  button.disabled = true; stop();
  try {
    const { m, c, context } = offscreen(), gif = GIFEncoder(), fps = 12;
    const capture = (scene, k, delay) => {
      exportScene(context, m, scene, k);
      const rgba = context.getImageData(0, 0, c.width, c.height).data, palette = quantize(rgba, 128);
      gif.writeFrame(applyPalette(rgba, palette), c.width, c.height, { palette, delay, repeat: 0 });
    };
    for (let k = 0; k < L.frames.length; k++) {
      const info = captionInfo(k);
      const text = `${info.title} ${info.text}`.trim();
      const pause = $('withText').checked && text ? clamp(1.8 + text.length / 60, 2, 6) * 1000 : k === L.frames.length - 1 ? 1500 : HOLD * 1000;
      capture({ ...framePose(L, k), zones: zonesAt(L, k), arrows: k + 1 < L.frames.length ? arrowsInto(L, k + 1) : [] }, k, pause);
      if (k + 1 < L.frames.length) {
        const count = Math.max(2, Math.round(L.speed * fps));
        for (let j = 1; j < count; j++) {
          capture({ ...poseAt(L, { frame: k, t: j / count }), zones: zonesAt(L, k + 1), arrows: arrowsInto(L, k + 1), arrowAlpha: .5 }, k + 1, Math.round(1000 / fps));
        }
      }
      status.textContent = `GIF : ${Math.round((k + 1) / L.frames.length * 100)} %`;
      await new Promise(r => setTimeout(r, 0));
    }
    gif.finish(); saveBlob(new Blob([gif.bytes()], { type: 'image/gif' }), 'ulti-tactics.gif');
    status.textContent = 'GIF téléchargé.';
  } catch (error) { status.textContent = 'Erreur GIF : ' + error.message; }
  finally { button.disabled = false; render(); }
};
$('jsonSave').onclick = () => saveBlob(new Blob([JSON.stringify(play, null, 2)], { type: 'application/json' }), 'ulti-tactics.json');
$('jsonLoad').onclick = () => $('file').click();
$('file').onchange = async e => {
  const file = e.target.files[0]; if (!file) return;
  try { const data = validate(JSON.parse(await file.text())); remember(); stop(); play = data; time = 0; cur = 0; selected = null; zoneSel = null; persist(); refresh(); }
  catch (error) { alert(error.message); }
  e.target.value = '';
};
function urlEncode(o) {
  const bytes = new TextEncoder().encode(JSON.stringify(o)); let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
const urlDecode = text => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(text.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))));
$('share').onclick = async () => {
  const url = new URL(location.href); url.search = '?play=' + urlEncode(play); url.hash = '';
  try { await navigator.clipboard.writeText(url.href); $('exportStatus').textContent = `Lien copié (${url.href.length} caractères).`; }
  catch { prompt('Copiez ce lien :', url.href); }
};

/* ---------- démarrage et migration ---------- */
function init() {
  const params = new URLSearchParams(location.search);
  if (params.has('play')) {
    try { play = validate(urlDecode(params.get('play'))); readOnly = true; document.body.classList.add('readonly'); $('loop').checked = true; }
    catch (error) { alert('Lien invalide : ' + error.message); }
  }
  if (!play) {
    try { play = validate(JSON.parse(localStorage.getItem(storage))); }
    catch {
      try { play = validate(JSON.parse(localStorage.getItem(oldStorage))); persist(); }
      catch {
        try { play = validate(JSON.parse(localStorage.getItem(legacyStorage))); persist(); }
        catch { play = newPlay(); }
      }
    }
  }
  refresh();
  if (readOnly && params.get('autoplay') !== '0') $('play').click();
}
init();
