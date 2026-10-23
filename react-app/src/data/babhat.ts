// Données du tournoi BAB'HAT, une entrée par édition.
// Aucun nom de joueur ici : la composition des équipes est publiée
// uniquement sous forme d'image (non indexée).

export type Terrain = 'Bègles' | 'Ambarès' | 'Bordeaux';

export const TERRAINS: Terrain[] = ['Bègles', 'Ambarès', 'Bordeaux'];

/** Signature du tournoi. */
export const BABHAT_EMOJI = '🦅🐿️🍷';

/** Match de poule : `clair` porte le haut blanc/clair, `sombre` le haut noir/sombre. */
export interface PoolMatch {
  clair: number;
  sombre: number;
}

export interface Round {
  time: string;
  matches: Record<Terrain, PoolMatch>;
}

export interface FinalsRound {
  time: string;
  matches: Record<Terrain, string>;
}

export interface TimelineStep {
  time: string;
  label: string;
  detail?: string;
  highlight?: boolean;
}

export interface ChecklistItem {
  label: string;
  tone?: 'clair' | 'sombre';
}

export interface Place {
  name: string;
  address: string;
  detail?: string;
  mapsUrl: string;
  embedUrl: string;
}

/** Club du tournoi. Ordre : toujours Bègles, puis Ambarès, puis Bordeaux (B-A-B). */
export interface Club {
  name: string;
  city: Terrain;
  emoji: string;
  role: 'organisateur' | 'participant';
  /** Forme utilisée dans la phrase, avec son article : « les Aigles de Bègles », « des Suricatch d'Ambarès »… */
  mention: string;
}

export interface BabHatEdition {
  slug: string;
  clubs: Club[];
  number: number;
  date: string; // ISO yyyy-mm-dd
  dateLabel: string;
  endTime: string;
  timeline: TimelineStep[];
  format: string[];
  venue: Place & { facilities: string };
  after: Place & { time: string; principle: string; drinks: string };
  checklist: ChecklistItem[];
  teamCount: number;
  schedule: Round[];
  finals: FinalsRound;
  images: {
    plan: string;
    equipes: string;
  };
}

export const editions: BabHatEdition[] = [
  {
    slug: '2026-2027',
    clubs: [
      { name: 'Aigles de Bègles', city: 'Bègles', emoji: '🦅', role: 'organisateur', mention: 'les Aigles de Bègles' },
      { name: 'Suricatch', city: 'Ambarès', emoji: '🐿️', role: 'participant', mention: "des Suricatch d'Ambarès" },
      { name: '33 Tours', city: 'Bordeaux', emoji: '🍷', role: 'participant', mention: 'du 33 Tours de Bordeaux' },
    ],
    number: 1,
    date: '2026-10-24',
    dateLabel: 'Samedi 24 octobre 2026',
    endTime: '18h50',
    timeline: [
      { time: '14h30', label: 'Rendez-vous sur place', detail: 'Crampons, briefing et échauffement collectif' },
      { time: '15h00', label: 'Début des matchs', detail: 'Poule unique, 5 matchs par équipe', highlight: true },
      { time: '18h20', label: 'Matchs de classement', detail: 'Finale sur le terrain Bègles, la mieux classée choisit sa couleur' },
      { time: '19h00', label: 'After et auberge espagnole', detail: 'ZÀP de Bègles' },
    ],
    format: [
      '5 contre 5, équipes mixtes.',
      'Championnat en une seule poule, puis matchs de classement.',
      '6 matchs de 30 minutes par équipe, 10 minutes de pause entre deux matchs.',
    ],
    venue: {
      name: 'Stade du Haut Verduc',
      detail: 'Terrain synthétique n°4',
      address: '33130 Bègles',
      facilities: 'Vestiaires et douches sur place.',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ultimate+B%C3%A8gles+33130+-+Les+Aigles+-+Frisbee',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d905.2279411288449!2d-0.5364532970710829!3d44.80095664016078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd552700625c78e1%3A0xb7e786157a61d015!2sUltimate%20B%C3%A8gles%2033130%20-%20Les%20Aigles%20-%20Frisbee%20-%20Bordeaux%20-%20Gironde!5e1!3m2!1sfr!2sfr!4v1757434094645!5m2!1sfr!2sfr',
    },
    after: {
      time: '19h00',
      name: 'ZÀP de Bègles',
      address: '1 place du 14 Juillet, 33130 Bègles',
      principle:
        'Auberge espagnole : chacun·e apporte un petit quelque chose à boire ou à manger, salé ou sucré, à partager.',
      drinks: 'Le club prévoit des boissons sur place.',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Z%C3%80P+de+B%C3%A8gles+1+Place+du+14+Juillet+33130+B%C3%A8gles',
      embedUrl: 'https://maps.google.com/maps?q=Z%C3%80P%20de%20B%C3%A8gles%2C%201%20Place%20du%2014%20Juillet%2C%2033130%20B%C3%A8gles&z=16&output=embed',
    },
    checklist: [
      { label: 'Crampons' },
      { label: 'Un haut blanc ou clair', tone: 'clair' },
      { label: 'Un haut noir ou sombre', tone: 'sombre' },
      { label: 'Une gourde' },
    ],
    teamCount: 6,
    // Poule unique à 6 équipes : chaque équipe rencontre les 5 autres et joue sur chaque terrain.
    // Hauts : 3/2 par équipe, et nombre minimal de changements de haut (8 au total, 2 max par équipe),
    // vérifié par recherche exhaustive.
    schedule: [
      { time: '15h00', matches: { 'Bègles': { clair: 1, sombre: 6 }, 'Ambarès': { clair: 5, sombre: 2 }, 'Bordeaux': { clair: 4, sombre: 3 } } },
      { time: '15h40', matches: { 'Bègles': { clair: 3, sombre: 2 }, 'Ambarès': { clair: 4, sombre: 6 }, 'Bordeaux': { clair: 1, sombre: 5 } } },
      { time: '16h20', matches: { 'Bègles': { clair: 3, sombre: 5 }, 'Ambarès': { clair: 4, sombre: 1 }, 'Bordeaux': { clair: 2, sombre: 6 } } },
      { time: '17h00', matches: { 'Bègles': { clair: 2, sombre: 4 }, 'Ambarès': { clair: 3, sombre: 1 }, 'Bordeaux': { clair: 6, sombre: 5 } } },
      { time: '17h40', matches: { 'Bègles': { clair: 5, sombre: 4 }, 'Ambarès': { clair: 6, sombre: 3 }, 'Bordeaux': { clair: 2, sombre: 1 } } },
    ],
    finals: {
      time: '18h20',
      matches: { 'Bègles': 'Finale, 1er – 2e', 'Ambarès': '3e – 4e', 'Bordeaux': '5e – 6e' },
    },
    images: {
      plan: '/images/babhat/2026-2027/3terrains.png',
      equipes: '/images/babhat/2026-2027/equipes.png',
    },
  },
];

export const currentEdition = editions[editions.length - 1];
