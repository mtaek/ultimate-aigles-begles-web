/*
 * Modèle « par temps » (comme tactical-board / Ultiplays) :
 * un play est une suite de temps ; chaque temps contient la position de tous les joueurs
 * et l'état du disque. Les flèches et l'animation sont déduites des différences entre temps.
 *
 * Version 8 :
 *  - chaque temps peut porter un titre, une explication, une question et des zones pédagogiques ;
 *  - les défenseurs peuvent être orientés (pos[id].r, angle en degrés dans le repère du terrain) ;
 *  - une seule suite de temps, sans bifurcation.
 * Coordonnées monde : x = longueur 0-100 (en-but attaqué 82-100), y = largeur 0-37.
 */
export const copy = x => structuredClone(x);
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export const endpoints = { half: { x: 37, y: 50 } };
// Le demi-terrain montre toujours l'en-but attaqué en haut.
export const toWorld = p => ({ x: 100 - p.y, y: p.x });
export const toScreen = p => ({ x: p.y, y: 100 - p.x });
export const FORCES = ['none', 'flick', 'backhand', 'middle', 'line', 'straight', 'no-dump-left', 'no-dump-right'];
export const ZONE_SHAPES = ['rect', 'ellipse', 'arrow'];
export const ZONE_KINDS = ['free', 'lane', 'help', 'danger'];
export const HOLD = 0.4;          // pause sur chaque temps pendant la lecture (s)
export const MAX_FRAMES = 30;
export const MAX_ZONES = 12;      // par temps
export const LIMITS = { title: 80, text: 400, question: 200, label: 40, playerName: 24 };

export const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
export const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
/* Angle ramené dans ]-180, 180]. */
export const norm = a => { const r = ((a + 180) % 360 + 360) % 360 - 180; return r === -180 ? 180 : r; };
export function bez(a, c, b, t) {
  if (!c) return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
  const s = 1 - t;
  return { x: s * s * a.x + 2 * s * t * c.x + t * t * b.x, y: s * s * a.y + 2 * s * t * c.y + t * t * b.y };
}
const ease = t => t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;

// Emplacement proposé quand on clique un joueur du banc (pile verticale, handlers derrière).
const SPOTS = [[80, 18.5], [75, 18.5], [70, 18.5], [65, 18.5], [57, 10], [57, 27], [57, 18.5]];
export const mirror = p => ({ x: 100 - p.x, y: 37 - p.y });
export function defaultSpot(id) {
  const [x, y] = SPOTS[Number(id[1]) - 1];
  return id[0] === 'o' ? { x, y } : { x: x + 2.5, y: clamp(y + 2.5, 1, 36) };
}
export function emptyPlay(speed = 1.5, force = 'none') {
  return { version: 8, view: 'half', attack: 'right', force, speed, players: [], names: {},
    frames: [{ pos: {}, disc: { carrier: null, x: 64, y: 18.5 }, zones: [] }] };
}
export const newPlay = () => emptyPlay();

/* Nouveau temps à partir d'un temps existant : mêmes positions, sans courbes, textes ni zones. */
export function newFrame(from) {
  const f = copy(from);
  for (const q of Object.values(f.pos)) delete q.c;
  delete f.disc.c;
  f.zones = []; delete f.title; delete f.text; delete f.question;
  return f;
}

const order = p => (p.team === 'o' ? 0 : 10) + Number(p.id[1]);
/* Entrée d'un joueur : présent à la même place dans tous les temps. */
export function addPlayer(play, id, p) {
  if (play.players.some(x => x.id === id)) return;
  play.players.push({ id, team: id[0] });
  play.players.sort((a, b) => order(a) - order(b));
  for (const f of play.frames) f.pos[id] = { x: p.x, y: p.y };
}
/* Retour au banc : le disque qu'il portait reste au sol à sa place. */
export function removePlayer(play, id) {
  play.players = play.players.filter(p => p.id !== id);
  for (const f of play.frames) {
    const q = f.pos[id];
    if (q && f.disc.carrier === id) f.disc = { carrier: null, x: q.x, y: q.y };
    delete f.pos[id];
  }
}
/* Inverse le sens de l'attaque : rotation de 180° de tout le play (zones et orientations comprises). */
export function mirrorPlay(play) {
  const flip = q => { Object.assign(q, mirror(q)); if (q.c) q.c = mirror(q.c); };
  for (const f of play.frames) {
    for (const q of Object.values(f.pos)) { flip(q); if (q.r != null) q.r = norm(q.r + 180); }
    flip(f.disc);
    for (const z of f.zones || []) { z.a = mirror(z.a); z.b = mirror(z.b); }
  }
}
export function isInvolved(play, id) {
  return play.frames.some((f, k) => hasMoved(play, k, id) || hasTurned(play, k, id) || f.disc.carrier === id);
}

/* Point du disque à un temps donné (sur le porteur, ou libre au sol / en l'air). */
export function discPoint(frame) {
  const p = frame.disc.carrier && frame.pos[frame.disc.carrier];
  return p ? { x: p.x, y: p.y } : { x: frame.disc.x, y: frame.disc.y };
}
export const hasMoved = (play, k, id) => k > 0 && dist(play.frames[k - 1].pos[id], play.frames[k].pos[id]) > .05;
export const hasTurned = (play, k, id) => k > 0 && (play.frames[k - 1].pos[id].r ?? null) !== (play.frames[k].pos[id].r ?? null);
export function hasPass(play, k) {
  if (k === 0) return false;
  const a = play.frames[k - 1].disc, b = play.frames[k].disc;
  return a.carrier !== b.carrier || (!b.carrier && dist(discPoint(play.frames[k - 1]), discPoint(play.frames[k])) > .05);
}

/* Flèches de la transition (k-1 -> k). */
export function arrowsInto(play, k) {
  if (k <= 0 || k >= play.frames.length) return [];
  const A = play.frames[k - 1], B = play.frames[k], arrows = [];
  for (const p of play.players) {
    if (!hasMoved(play, k, p.id)) continue;
    arrows.push({ kind: 'run', id: p.id, team: p.team, from: A.pos[p.id], c: B.pos[p.id].c || null, to: B.pos[p.id] });
  }
  if (hasPass(play, k)) arrows.push({ kind: 'pass', id: 'disc', from: discPoint(A), c: B.disc.c || null, to: discPoint(B) });
  return arrows;
}
/* Zones visibles au temps k : celles du temps k et celles gardées depuis les temps précédents. */
export function zonesAt(play, k) {
  const out = [];
  for (let j = 0; j <= k && j < play.frames.length; j++) {
    for (const z of play.frames[j].zones || []) if (j === k || z.keep) out.push(z);
  }
  return out;
}

/* Pose figée sur un temps. */
export function framePose(play, k) {
  const f = play.frames[k];
  return {
    players: play.players.map(p => ({ ...p, name: play.names?.[p.id] || '', x: f.pos[p.id].x, y: f.pos[p.id].y, r: f.pos[p.id].r })),
    disc: { ...discPoint(f), off: f.disc.carrier ? 1 : 0 }
  };
}
/* Pose pendant la transition k -> k+1, t entre 0 et 1. */
export function transitionPose(play, k, t) {
  const A = play.frames[k], B = play.frames[k + 1], e = ease(t);
  const players = play.players.map(p => {
    const ra = A.pos[p.id].r, rb = B.pos[p.id].r;
    // Rotation par le chemin le plus court.
    const upright = 0;
    const r = ra == null && rb == null ? undefined : (ra ?? upright) + norm((rb ?? upright) - (ra ?? upright)) * e;
    return { ...p, name: play.names?.[p.id] || '', ...bez(A.pos[p.id], B.pos[p.id].c, B.pos[p.id], e), r };
  });
  let disc;
  if (A.disc.carrier && A.disc.carrier === B.disc.carrier) {
    const c = players.find(p => p.id === A.disc.carrier);
    disc = { x: c.x, y: c.y, off: 1 };
  } else {
    // Passe : le disque part du lanceur et vole à vitesse constante vers la réception.
    const pt = bez(discPoint(A), B.disc.c, discPoint(B), t);
    const offA = A.disc.carrier ? 1 : 0, offB = B.disc.carrier ? 1 : 0;
    disc = { ...pt, off: t < .5 ? offA * (1 - 2 * t) : offB * (2 * t - 1) };
  }
  return { players, disc };
}

/* Chronologie de lecture : pause, transition, pause, transition, ..., pause.
   Le temps k (k ≥ 1) est atteint à k × pas ; la transition k -> k+1 commence à HOLD + k × pas. */
export const step = play => play.speed + HOLD;
export const totalTime = play => HOLD + (play.frames.length - 1) * step(play);
export const transitionStart = (play, k) => HOLD + k * step(play);
export function sampleAt(play, time) {
  const n = play.frames.length, st = step(play), pos = time - HOLD;
  if (n < 2 || pos < 0) return { frame: 0, t: 0, seg: n > 1 ? 1 : 0 };
  const i = Math.floor(pos / st);
  if (i >= n - 1) return { frame: n - 1, t: 0, seg: 0 };
  const r = pos - i * st;
  if (r >= play.speed) return { frame: i + 1, t: 0, seg: i + 2 < n ? i + 2 : 0 };
  return { frame: i, t: r / play.speed, seg: i + 1 };
}
export const poseAt = (play, s) => s.t > 0 ? transitionPose(play, s.frame, s.t) : framePose(play, s.frame);

/* ---------- import : migration et validation ---------- */
export function migrate(p) {
  if (p && p.version === 6) {
    p = { ...p, version: 7, branches: [] };
    for (const f of p.frames || []) if (f && !Array.isArray(f.zones)) f.zones = [];
  }
  // Les plays créés avec l'ancien no-dump sans côté gardent le côté droit par défaut.
  if (p && p.version === 7 && p.force === 'no-dump') p.force = 'no-dump-right';
  if (p && p.version === 7) {
    // Conserver le parcours de l'issue A en supprimant la bifurcation.
    const first = Array.isArray(p.branches) ? p.branches[0] : null;
    p = { ...p, version: 8, frames: [...(Array.isArray(p.frames) ? p.frames : []), ...(Array.isArray(first?.frames) ? first.frames : [])] };
    delete p.branches;
  }
  if (p && p.version === 8 && (p.view !== 'half' || p.attack !== 'right')) {
    // Replacer les anciens plays « terrain complet » sur la moitié attaquée.
    if (p.attack === 'left') mirrorPlay(p);
    if (p.view === 'full') {
      for (const f of p.frames || []) {
        for (const q of Object.values(f.pos || {})) {
          q.x = clamp(q.x, 50, 100);
          if (q.c) q.c.x = clamp(q.c.x, 50, 100);
        }
        if (f.disc) {
          f.disc.x = clamp(f.disc.x, 50, 100);
          if (f.disc.c) f.disc.c.x = clamp(f.disc.c.x, 50, 100);
        }
        for (const z of f.zones || []) {
          z.a.x = clamp(z.a.x, 50, 100); z.b.x = clamp(z.b.x, 50, 100);
        }
      }
    }
    p.view = 'half'; p.attack = 'right';
  }
  return p;
}
export function validate(p) {
  p = migrate(p);
  const ok = q => q && Number.isFinite(q.x) && Number.isFinite(q.y) && q.x >= 0 && q.x <= 100 && q.y >= 0 && q.y <= 37;
  const str = (v, max) => v == null || (typeof v === 'string' && v.length <= max);
  if (!p || p.version !== 8 || !endpoints[p.view] || !['right', 'left'].includes(p.attack) || !FORCES.includes(p.force)
    || !Number.isFinite(p.speed) || p.speed < .3 || p.speed > 5
    || !Array.isArray(p.players) || !Array.isArray(p.frames) || !p.frames.length || p.frames.length > MAX_FRAMES) throw Error('Fichier incompatible ou invalide.');
  if (p.names != null && (typeof p.names !== 'object' || Array.isArray(p.names) || Object.entries(p.names).some(([id, name]) =>
    !/^[od][1-7]$/.test(id) || typeof name !== 'string' || name.length > LIMITS.playerName))) throw Error('Nom de joueur invalide.');
  const ids = new Set();
  for (const pl of p.players) {
    if (!pl || !/^[od][1-7]$/.test(pl.id) || pl.team !== pl.id[0] || ids.has(pl.id)) throw Error('Joueur invalide.');
    ids.add(pl.id);
  }
  for (const f of p.frames) {
    if (!f || !f.pos || !f.disc) throw Error('Temps invalide.');
    for (const id of ids) {
      const q = f.pos[id];
      if (!ok(q) || (q.c && !ok(q.c)) || (q.r != null && !Number.isFinite(q.r))) throw Error('Position invalide.');
    }
    if ((f.disc.carrier && !ids.has(f.disc.carrier)) || !ok(f.disc) || (f.disc.c && !ok(f.disc.c))) throw Error('Disque invalide.');
    if (!str(f.title, LIMITS.title) || !str(f.text, LIMITS.text) || !str(f.question, LIMITS.question)) throw Error('Texte trop long.');
    if (f.zones == null) f.zones = [];
    if (!Array.isArray(f.zones) || f.zones.length > MAX_ZONES) throw Error('Zones invalides.');
    for (const z of f.zones) {
      if (!z || typeof z.id !== 'string' || !ZONE_SHAPES.includes(z.shape) || !ZONE_KINDS.includes(z.kind)
        || !ok(z.a) || !ok(z.b) || !str(z.label, LIMITS.label) || typeof z.keep !== 'boolean') throw Error('Zone invalide.');
    }
  }
  return p;
}
