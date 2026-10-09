import { endpoints, toScreen, bez, mid } from './model.js';

export const COLORS = { o: '#2e86c1', d: '#f3982a' };
const RUN = { o: '#cfe8f8', d: '#ffd29e' };
let discLogo = null;
export function setDiscLogo(image) { discLogo = image; }

export function measure(width = 920) {
  const { x, y } = endpoints.half;
  return { w: width, h: Math.round(width * y / x), scale: width / x, view: 'half', attack: 'right' };
}
export function pointPixel(p, m) {
  const q = toScreen(p);
  return { x: q.x * m.scale, y: q.y * m.scale };
}
export const playerRadius = m => Math.max(14, Math.min(24, m.scale * .95));
export const handleRadius = m => Math.max(9, playerRadius(m) * .5);
/* Position à l'écran du disque : décalé à côté du porteur (off = 1) ou centré (off = 0). */
export function discPixel(disc, m) {
  const q = pointPixel(disc, m), r = playerRadius(m), f = disc.off ?? 0;
  return { x: q.x + r * .8 * f, y: q.y - r * .75 * f, r: Math.max(9, r * .58) };
}

function field(c, m) {
  const u = m.scale;
  c.fillStyle = '#3f8f4e'; c.fillRect(0, 0, m.w, m.h);
  // Bandes de tonte, comme sur les planches tactiques.
  c.fillStyle = '#44964f';
  for (let y = 18; y < 50; y += 8) c.fillRect(0, y * u, m.w, 4 * u);
  c.fillStyle = '#4fa05e';
  c.fillRect(0, 0, m.w, 18 * u);
  c.strokeStyle = '#f5f8ed'; c.lineWidth = Math.max(2, u * .14);
  c.strokeRect(c.lineWidth / 2, c.lineWidth / 2, m.w - c.lineWidth, m.h - c.lineWidth);
  c.beginPath();
  c.moveTo(0, 18 * u); c.lineTo(m.w, 18 * u);
  c.stroke();
  const mark = { x: 18.5 * u, y: 36 * u };
  c.beginPath(); c.moveTo(mark.x - 6, mark.y - 6); c.lineTo(mark.x + 6, mark.y + 6);
  c.moveTo(mark.x + 6, mark.y - 6); c.lineTo(mark.x - 6, mark.y + 6); c.stroke();
  c.fillStyle = '#ecf6e8'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.font = `600 ${Math.max(13, u * .8)}px "Open Sans", system-ui`;
  c.fillText('EN-BUT', m.w / 2, 9 * u);
  attackArrow(c, m);
}

/* Flèche « sens de l'attaque », discrète, le long d'une ligne de touche. */
function attackArrow(c, m) {
  const u = m.scale;
  c.save(); c.globalAlpha = .6; c.fillStyle = c.strokeStyle = '#ffffff';
  c.lineWidth = Math.max(3, u * .22); c.lineCap = 'round';
  c.font = `700 ${Math.max(11, u * .62)}px "Open Sans", system-ui`; c.textAlign = 'center'; c.textBaseline = 'middle';
  const x = 1.6 * u, a = { x, y: 45 * u }, b = { x, y: 31 * u };
  const label = { x: x + 1.4 * u, y: 38 * u, rot: -Math.PI / 2 };
  c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
  const ang = Math.atan2(b.y - a.y, b.x - a.x), L = Math.max(12, u * .9);
  c.beginPath(); c.moveTo(b.x + Math.cos(ang) * 4, b.y + Math.sin(ang) * 4);
  c.lineTo(b.x - L * Math.cos(ang - .5), b.y - L * Math.sin(ang - .5));
  c.lineTo(b.x - L * Math.cos(ang + .5), b.y - L * Math.sin(ang + .5)); c.closePath(); c.fill();
  c.translate(label.x, label.y); c.rotate(label.rot); c.fillText('SENS DE L’ATTAQUE', 0, 0);
  c.restore();
}

/*
 * Force de la défense, pour un lanceur droitier.
 * Repère : « avant » = sens de l'attaque, « droite » = main droite du lanceur.
 * Coup droit (flick) = côté droit ouvert ; revers = côté gauche ouvert ;
 * milieu = côté du centre ouvert ; ligne = côté de la touche ouvert ;
 * straight up = marqueur en face : axe fermé, les deux côtés ouverts ;
 * no-dump = remise latérale arrière fermée à gauche ou à droite du lanceur.
 */
export const FORCE_LABEL = { flick: 'Force coup droit', backhand: 'Force revers', middle: 'Force milieu', line: 'Force ligne', straight: 'Straight up', 'no-dump-left': 'No-dump à gauche', 'no-dump-right': 'No-dump à droite' };
function openSign(force, a, disc) {           // signe, sur l'axe de la largeur, du côté ouvert
  if (force === 'flick') return a;
  if (force === 'backhand') return -a;
  const toCentre = Math.sign(18.5 - disc.y) || a;
  return force === 'middle' ? toCentre : -toCentre;
}
function drawForce(c, m, disc, force) {
  if (force === 'no-dump-left' || force === 'no-dump-right') { drawNoDump(c, m, disc, force); return; }
  const a = m.attack === 'left' ? -1 : 1;
  // Point à r mètres du lanceur ; angle th : 0 = vers l'avant, π/2 = sur le côté `side`.
  const at = (r, th, side) => pointPixel({ x: disc.x + r * Math.cos(th) * a, y: disc.y + r * Math.sin(th) * side }, m);
  const straight = force === 'straight', s = straight ? 1 : openSign(force, a, disc);
  const R = 20, centre = pointPixel(disc, m), fontPx = Math.max(14, m.scale * .8);
  c.save();
  c.lineCap = 'round'; c.lineJoin = 'round';
  for (const side of straight ? [1, -1] : [s]) {
    // Zone ouverte.
    c.beginPath(); c.moveTo(centre.x, centre.y);
    for (let th = straight ? .45 : 0; th <= 1.75 + 1e-9; th += .05) { const p = at(R, th, side); c.lineTo(p.x, p.y); }
    c.closePath();
    const g = c.createRadialGradient(centre.x, centre.y, 0, centre.x, centre.y, R * m.scale);
    g.addColorStop(0, 'rgba(255,255,255,.30)'); g.addColorStop(1, 'rgba(255,255,255,.06)');
    c.fillStyle = g; c.fill();
    c.setLineDash([7, 6]); c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 2; c.stroke(); c.setLineDash([]);
    // Flèche « ouvert ».
    const th = 1.0, p0 = at(2.6, th, side), p1 = at(14, th, side);
    c.strokeStyle = c.fillStyle = 'rgba(255,255,255,.95)'; c.lineWidth = Math.max(4, m.scale * .22);
    c.beginPath(); c.moveTo(p0.x, p0.y); c.lineTo(p1.x, p1.y); c.stroke();
    const ang = Math.atan2(p1.y - p0.y, p1.x - p0.x), L = Math.max(13, m.scale * .85);
    c.beginPath(); c.moveTo(p1.x + Math.cos(ang) * 3, p1.y + Math.sin(ang) * 3);
    c.lineTo(p1.x - L * Math.cos(ang - .5), p1.y - L * Math.sin(ang - .5));
    c.lineTo(p1.x - L * Math.cos(ang + .5), p1.y - L * Math.sin(ang + .5)); c.closePath(); c.fill();
    const lp = at(17, th, side);
    c.font = `700 ${fontPx}px "Open Sans", system-ui, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.lineWidth = 3; c.strokeStyle = 'rgba(31,45,58,.55)'; c.strokeText('OUVERT', lp.x, lp.y);
    c.fillStyle = '#fff'; c.fillText('OUVERT', lp.x, lp.y);
  }
  // Barre du marqueur : côté fermé, ou en face pour straight up.
  const thWall = straight ? 0 : .7, sideWall = straight ? 1 : -s;
  const ux = Math.cos(thWall) * a, uy = Math.sin(thWall) * sideWall;      // direction lanceur -> marqueur
  const wc = { x: disc.x + 1.9 * ux, y: disc.y + 1.9 * uy }, half = 1.5;
  const e1 = pointPixel({ x: wc.x - uy * half, y: wc.y + ux * half }, m), e2 = pointPixel({ x: wc.x + uy * half, y: wc.y - ux * half }, m);
  c.beginPath(); c.moveTo(e1.x, e1.y); c.lineTo(e2.x, e2.y);
  c.strokeStyle = '#ffffff'; c.lineWidth = Math.max(9, m.scale * .5); c.stroke();
  c.strokeStyle = '#f3982a'; c.lineWidth = Math.max(6, m.scale * .34); c.stroke();
  c.restore();
}
function drawNoDump(c, m, disc, force) {
  const forward = m.attack === 'left' ? -1 : 1;
  const at = (x, y) => pointPixel({ x: disc.x + x * forward, y: disc.y + y * forward }, m);
  const center = at(0, 0), radius = 20;
  // Gauche/droite sont celles du lanceur regardant vers l'en-but attaqué.
  const blockedSide = force === 'no-dump-right' ? 1 : -1;
  const openSide = -blockedSide;
  c.save();
  // Le secteur ouvert reste devant, du côté opposé à la remise bloquée.
  c.beginPath(); c.moveTo(center.x, center.y);
  for (let angle = -.2; angle <= 1.41; angle += .04) {
    const p = at(radius * Math.cos(angle), openSide * radius * Math.sin(angle)); c.lineTo(p.x, p.y);
  }
  c.closePath();
  const gradient = c.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius * m.scale);
  gradient.addColorStop(0, 'rgba(255,255,255,.30)'); gradient.addColorStop(1, 'rgba(255,255,255,.06)');
  c.fillStyle = gradient; c.fill(); c.strokeStyle = 'rgba(255,255,255,.75)'; c.lineWidth = 2;
  c.setLineDash([7, 6]); c.stroke(); c.setLineDash([]);
  const directionAngle = .55;
  const start = at(2.6 * Math.cos(directionAngle), openSide * 2.6 * Math.sin(directionAngle));
  const end = at(14 * Math.cos(directionAngle), openSide * 14 * Math.sin(directionAngle));
  const tip = at(14.7 * Math.cos(directionAngle), openSide * 14.7 * Math.sin(directionAngle));
  c.strokeStyle = c.fillStyle = '#fff'; c.lineWidth = Math.max(4, m.scale * .22); c.lineCap = 'round';
  c.beginPath(); c.moveTo(start.x, start.y); c.lineTo(end.x, end.y); c.stroke();
  const direction = Math.atan2(end.y - start.y, end.x - start.x), length = Math.max(13, m.scale * .85);
  c.beginPath(); c.moveTo(tip.x, tip.y);
  c.lineTo(tip.x - length * Math.cos(direction - .5), tip.y - length * Math.sin(direction - .5));
  c.lineTo(tip.x - length * Math.cos(direction + .5), tip.y - length * Math.sin(direction + .5));
  c.closePath(); c.fill();
  const label = at(17 * Math.cos(directionAngle), openSide * 17 * Math.sin(directionAngle));
  c.font = `700 ${Math.max(14, m.scale * .8)}px "Open Sans", system-ui, sans-serif`;
  c.textAlign = 'center'; c.textBaseline = 'middle'; c.strokeStyle = 'rgba(31,45,58,.55)'; c.lineWidth = 3;
  c.strokeText('OUVERT', label.x, label.y); c.fillText('OUVERT', label.x, label.y);
  // Marqueur sur le flanc choisi du porteur : trait court parallèle au sens
  // de l'attaque, devant la ligne de remise, sans traverser le joueur.
  const wall1 = at(-1.4, blockedSide * 2.4), wall2 = at(1.4, blockedSide * 2.4);
  c.beginPath(); c.moveTo(wall1.x, wall1.y); c.lineTo(wall2.x, wall2.y);
  c.strokeStyle = '#fff'; c.lineWidth = Math.max(9, m.scale * .5); c.stroke();
  c.strokeStyle = '#f3982a'; c.lineWidth = Math.max(6, m.scale * .34); c.stroke();
  c.restore();
}
function forceBadge(c, m, force) {
  const text = FORCE_LABEL[force].toUpperCase();
  c.save();
  c.font = `700 ${Math.max(12, m.scale * .62)}px "Open Sans", system-ui, sans-serif`;
  c.textAlign = 'left'; c.textBaseline = 'middle';
  const w = c.measureText(text).width + 24, h = Math.max(24, m.scale * 1.25), x = 10, y = 10;
  c.fillStyle = 'rgba(243,152,42,.95)'; c.beginPath();
  c.roundRect ? c.roundRect(x, y, w, h, h / 2) : c.rect(x, y, w, h); c.fill();
  c.fillStyle = '#fff'; c.fillText(text, x + 12, y + h / 2 + 1);
  c.restore();
}

function drawArrow(c, m, a, alpha = 1) {
  const from = pointPixel(a.from, m), to = pointPixel(a.to, m), ctl = a.c && pointPixel(a.c, m);
  c.save(); c.globalAlpha = alpha;
  c.strokeStyle = c.fillStyle = a.kind === 'pass' ? '#ffffff' : RUN[a.team];
  c.lineWidth = a.kind === 'pass' ? 3 : 4; c.lineCap = 'round'; c.lineJoin = 'round';
  c.setLineDash(a.kind === 'pass' ? [10, 8] : []);
  c.beginPath(); c.moveTo(from.x, from.y);
  if (ctl) c.quadraticCurveTo(ctl.x, ctl.y, to.x, to.y); else c.lineTo(to.x, to.y);
  c.stroke(); c.setLineDash([]);
  // La pointe s'arrête au bord du joueur d'arrivée.
  const before = pointPixel(bez(a.from, a.c, a.to, .85), m);
  const ang = Math.atan2(to.y - before.y, to.x - before.x), back = a.kind === 'pass' ? 4 : playerRadius(m) * .9;
  const tip = { x: to.x - Math.cos(ang) * back, y: to.y - Math.sin(ang) * back }, L = 15;
  c.beginPath(); c.moveTo(tip.x, tip.y);
  c.lineTo(tip.x - L * Math.cos(ang - .45), tip.y - L * Math.sin(ang - .45));
  c.lineTo(tip.x - L * Math.cos(ang + .45), tip.y - L * Math.sin(ang + .45));
  c.closePath(); c.fill();
  c.restore();
}

/* Angle à l'écran (radians) d'une orientation `r` exprimée en degrés dans le repère du terrain. */
export function screenAngle(p, r, m) {
  const a = pointPixel(p, m), rad = r * Math.PI / 180;
  const b = pointPixel({ x: p.x + Math.cos(rad), y: p.y + Math.sin(rad) }, m);
  return Math.atan2(b.y - a.y, b.x - a.x);
}

function drawPlayer(c, m, p, { selected = false, alpha = 1 } = {}) {
  const q = pointPixel(p, m), r = playerRadius(m);
  c.save(); c.globalAlpha = alpha;
  c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowBlur = alpha === 1 ? 4 : 0; c.shadowOffsetY = alpha === 1 ? 2 : 0;
  c.fillStyle = COLORS[p.team];
  c.strokeStyle = selected ? '#ffe258' : '#fff'; c.lineWidth = selected ? 4 : 2.5; c.lineJoin = 'round';
  let ty = q.y;
  if (p.team === 'o') {
    c.beginPath(); c.arc(q.x, q.y, r, 0, 7); c.fill(); c.shadowColor = 'transparent'; c.stroke();
  } else {
    // Triangle : la pointe indique la direction regardée par le défenseur (vers le haut par défaut).
    const R = r * 1.3, oriented = p.r != null;
    c.save(); c.translate(q.x, q.y);
    if (oriented) c.rotate(screenAngle(p, p.r, m) + Math.PI / 2);
    c.beginPath(); c.moveTo(0, -R); c.lineTo(R * .866, R * .5); c.lineTo(-R * .866, R * .5); c.closePath();
    c.fill(); c.shadowColor = 'transparent'; c.stroke();
    if (oriented) { // petit repère sur la pointe pour bien lire l'orientation
      c.beginPath(); c.arc(0, -R * .62, Math.max(2.5, R * .12), 0, 7); c.fillStyle = '#fff'; c.fill();
    }
    c.restore();
    ty = oriented ? q.y : q.y + R * .12;
  }
  c.fillStyle = p.team === 'o' ? '#fff' : '#1f2d3a';
  c.font = `700 ${Math.round(r * 1.05)}px "Open Sans", system-ui, sans-serif`;
  c.textAlign = 'center'; c.textBaseline = 'middle';
  c.fillText(p.id.slice(1), q.x, ty + 1);
  if (p.name) {
    const fontSize = Math.max(12, Math.round(r * .75));
    c.font = `600 ${fontSize}px "Open Sans", system-ui, sans-serif`;
    c.textAlign = 'center';
    const nameY = q.y + r * 1.3 + fontSize / 2 + 5;
    c.lineWidth = 3.5; c.strokeStyle = 'rgba(20,35,45,.8)';
    c.strokeText(p.name, q.x, nameY);
    c.fillStyle = '#fff'; c.fillText(p.name, q.x, nameY);
  }
  c.restore();
}

/* ---------- zones pédagogiques ---------- */
export const ZONE_STYLE = {
  free:   { fill: 'rgba(120,255,160,.26)', stroke: '#c4ffd4', name: 'Espace libre' },
  lane:   { fill: 'rgba(110,185,255,.30)', stroke: '#d6ecff', name: 'Couloir de passe' },
  help:   { fill: 'rgba(243,152,42,.32)', stroke: '#ffd29e', name: 'Aide défensive' },
  danger: { fill: 'rgba(230,57,70,.32)', stroke: '#ffb8be', name: 'À éviter' }
};
export function zoneGeom(z, m) {
  const a = pointPixel(z.a, m), b = pointPixel(z.b, m);
  return { a, b, x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), w: Math.abs(a.x - b.x), h: Math.abs(a.y - b.y),
    cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2, width: Math.max(18, 3.2 * m.scale) };
}
function wideArrow(c, a, b, w) {
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1, ux = (b.x - a.x) / len, uy = (b.y - a.y) / len, nx = -uy, ny = ux;
  const head = Math.min(len * .45, w * 1.6), sx = b.x - ux * head, sy = b.y - uy * head;
  c.moveTo(a.x + nx * w / 2, a.y + ny * w / 2); c.lineTo(sx + nx * w / 2, sy + ny * w / 2); c.lineTo(sx + nx * w, sy + ny * w);
  c.lineTo(b.x, b.y);
  c.lineTo(sx - nx * w, sy - ny * w); c.lineTo(sx - nx * w / 2, sy - ny * w / 2); c.lineTo(a.x - nx * w / 2, a.y - ny * w / 2);
  c.closePath();
}
function drawZone(c, m, z, selected) {
  const s = ZONE_STYLE[z.kind] || ZONE_STYLE.free, g = zoneGeom(z, m);
  c.save();
  c.fillStyle = s.fill; c.strokeStyle = selected ? '#ffe258' : s.stroke; c.lineWidth = selected ? 3.5 : 2.2; c.lineJoin = 'round';
  c.setLineDash(selected ? [] : [9, 6]);
  c.beginPath();
  if (z.shape === 'rect') { if (c.roundRect) c.roundRect(g.x, g.y, g.w, g.h, 8); else c.rect(g.x, g.y, g.w, g.h); }
  else if (z.shape === 'ellipse') c.ellipse(g.cx, g.cy, Math.max(g.w / 2, 1), Math.max(g.h / 2, 1), 0, 0, Math.PI * 2);
  else wideArrow(c, g.a, g.b, g.width);
  c.fill(); c.stroke(); c.setLineDash([]);
  if (z.label) {
    const fs = Math.max(12, m.scale * .62);
    c.font = `700 ${fs}px "Open Sans", system-ui, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.lineWidth = 3.5; c.strokeStyle = 'rgba(20,35,45,.65)'; c.strokeText(z.label.toUpperCase(), g.cx, g.cy);
    c.fillStyle = '#fff'; c.fillText(z.label.toUpperCase(), g.cx, g.cy);
  }
  c.restore();
}
/* Clic sur une zone ? (coordonnées en pixels du canvas) */
export function hitZone(z, m, px, slack = 0) {
  const g = zoneGeom(z, m);
  if (z.shape === 'rect') return px.x >= g.x - slack && px.x <= g.x + g.w + slack && px.y >= g.y - slack && px.y <= g.y + g.h + slack;
  if (z.shape === 'ellipse') {
    const rx = Math.max(g.w / 2, 1) + slack, ry = Math.max(g.h / 2, 1) + slack;
    return ((px.x - g.cx) / rx) ** 2 + ((px.y - g.cy) / ry) ** 2 <= 1;
  }
  const dx = g.b.x - g.a.x, dy = g.b.y - g.a.y, l2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((px.x - g.a.x) * dx + (px.y - g.a.y) * dy) / l2));
  return Math.hypot(px.x - (g.a.x + t * dx), px.y - (g.a.y + t * dy)) <= g.width + slack;
}

/* ---------- bandeau d'explication (exports GIF / PNG) ---------- */
function wrap(c, text, width) {
  const lines = [];
  for (const para of String(text).split('\n')) {
    let line = '';
    for (const word of para.split(/\s+/).filter(Boolean)) {
      const test = line ? `${line} ${word}` : word;
      if (c.measureText(test).width > width && line) { lines.push(line); line = word; } else line = test;
    }
    lines.push(line);
  }
  return lines;
}
export const captionHeight = m => Math.round(Math.max(130, m.w * .25));
export function drawCaption(c, m, info, top, h) {
  const pad = Math.round(Math.max(12, m.w * .03)), fs = Math.max(13, Math.round(m.w * .026)), maxY = top + h - pad;
  c.save();
  c.fillStyle = '#ffffff'; c.fillRect(0, top, m.w, h);
  c.fillStyle = '#f3982a'; c.fillRect(0, top, m.w, 4);
  c.textAlign = 'left'; c.textBaseline = 'top';
  let y = top + pad;
  c.font = `700 ${Math.round(fs * .78)}px "Open Sans", system-ui, sans-serif`; c.fillStyle = '#2e86c1';
  c.fillText(info.head.toUpperCase(), pad, y); y += fs * 1.15;
  const block = (text, font, color, lh) => {
    if (!text) return;
    c.font = font; c.fillStyle = color;
    const lines = wrap(c, text, m.w - pad * 2);
    for (let i = 0; i < lines.length; i++) {
      if (y + lh > maxY) { c.fillText('…', pad, y - lh * .4); return; }
      c.fillText(lines[i], pad, y); y += lh;
    }
  };
  block(info.title, `700 ${fs}px "Open Sans", system-ui, sans-serif`, '#1f2d3a', fs * 1.3);
  block(info.text, `400 ${Math.round(fs * .9)}px "Open Sans", system-ui, sans-serif`, '#374151', fs * 1.18);
  c.restore();
}

/*
 * scene = { players, disc, zones?, selectedZone?, ghosts?, arrows?, arrowAlpha?, handles?, zoneHandles?, rotHandle?, selected? }
 */
export function draw(c, m, scene, opts = {}) {
  c.clearRect(0, 0, m.w, m.h); field(c, m);
  c.save(); c.beginPath(); c.rect(0, 0, m.w, m.h); c.clip();
  for (const z of scene.zones || []) drawZone(c, m, z, z === scene.selectedZone);
  const force = opts.force && opts.force !== 'none' ? opts.force : null;
  if (force && (scene.disc.off ?? 0) > .99) drawForce(c, m, scene.disc, force);
  for (const g of scene.ghosts || []) drawPlayer(c, m, g, { alpha: .3 });
  if (opts.showPaths !== false) for (const a of scene.arrows || []) drawArrow(c, m, a, scene.arrowAlpha ?? 1);
  for (const p of scene.players) if (p.id !== scene.selected) drawPlayer(c, m, p);
  const sel = scene.players.find(p => p.id === scene.selected);
  if (sel) drawPlayer(c, m, sel, { selected: true });
  const d = discPixel(scene.disc, m);
  c.save();
  c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 4; c.shadowOffsetY = 2;
  c.fillStyle = '#ffffff'; c.beginPath(); c.arc(d.x, d.y, d.r, 0, 7); c.fill();
  c.shadowColor = 'transparent';
  if (discLogo?.complete && discLogo.naturalWidth) {
    // À cette taille, le blason entier serait illisible : cadrer sur l'aigle.
    c.save(); c.beginPath(); c.arc(d.x, d.y, d.r - 1.5, 0, 7); c.clip();
    c.drawImage(discLogo, discLogo.naturalWidth * .19, discLogo.naturalHeight * .29,
      discLogo.naturalWidth * .63, discLogo.naturalHeight * .42,
      d.x - d.r + 1, d.y - d.r + 1, 2 * (d.r - 1), 2 * (d.r - 1));
    c.restore();
  } else {
    c.beginPath(); c.arc(d.x, d.y, d.r * .55, 0, 7); c.strokeStyle = '#9cc7e4'; c.lineWidth = 1.5; c.stroke();
  }
  c.beginPath(); c.arc(d.x, d.y, d.r, 0, 7);
  c.strokeStyle = scene.selected === 'disc' ? '#ffe258' : '#246a9c'; c.lineWidth = scene.selected === 'disc' ? 3.5 : 2.5; c.stroke();
  c.restore();
  for (const h of scene.handles || []) {
    const v = pointPixel(h, m);
    c.beginPath(); c.arc(v.x, v.y, handleRadius(m), 0, 7);
    c.fillStyle = '#f3982a'; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2.5; c.stroke();
  }
  for (const h of scene.zoneHandles || []) {
    const v = pointPixel(h, m), s = handleRadius(m) * .9;
    c.fillStyle = '#fff'; c.strokeStyle = '#246a9c'; c.lineWidth = 2.5;
    c.beginPath(); c.rect(v.x - s, v.y - s, 2 * s, 2 * s); c.fill(); c.stroke();
  }
  if (scene.rotHandle) {
    // Poignée de rotation du défenseur sélectionné.
    const from = pointPixel(scene.rotHandle.from, m), to = pointPixel(scene.rotHandle.to, m), hr = handleRadius(m);
    c.save();
    c.setLineDash([4, 4]); c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(from.x, from.y); c.lineTo(to.x, to.y); c.stroke(); c.setLineDash([]);
    c.beginPath(); c.arc(to.x, to.y, hr, 0, 7); c.fillStyle = '#246a9c'; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 2.5; c.stroke();
    c.beginPath(); c.arc(to.x, to.y, hr * .5, -Math.PI * .9, Math.PI * .45); c.strokeStyle = '#fff'; c.lineWidth = 2; c.stroke();
    c.restore();
  }
  if (force) forceBadge(c, m, force);
  c.restore();
}
export { mid };
