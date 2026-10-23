import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { BABHAT_EMOJI, currentEdition as edition, TERRAINS } from '../data/babhat';
import type { PoolMatch, Terrain } from '../data/babhat';

const TEAM_IDS = Array.from({ length: edition.teamCount }, (_, i) => i + 1);
const ordinal = (n: number) => (n === 1 ? '1re' : `${n}e`);

/** « A, B et C » */
const listFr = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} et ${items[items.length - 1]}`;

const ORGANIZERS = edition.clubs.filter(c => c.role === 'organisateur');
const PARTICIPANTS = edition.clubs.filter(c => c.role === 'participant');
const CITIES = listFr(edition.clubs.map(c => c.city));

/** Club suivi de son emoji (masqué pour les lecteurs d'écran). */
const ClubMention: React.FC<{ mention: string; emoji: string }> = ({ mention, emoji }) => (
  <span className="whitespace-nowrap">
    {mention} <span aria-hidden="true">{emoji}</span>
  </span>
);

const joinNodes = (nodes: React.ReactNode[]) =>
  nodes.flatMap((n, i) => (i === 0 ? [n] : [i === nodes.length - 1 ? ' et ' : ', ', n]));

/** Empêche l'indexation des images de la page (composition des équipes). */
const useNoImageIndex = () => {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noimageindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
};

/** Signature emoji du tournoi, masquée pour les lecteurs d'écran. */
const Emoji: React.FC<{ className?: string }> = ({ className }) => (
  <span aria-hidden="true" className={className}>{BABHAT_EMOJI}</span>
);

/** Pastille de haut : blanche (clair) ou noire (sombre). */
const Jersey: React.FC<{ tone: 'clair' | 'sombre' }> = ({ tone }) => (
  <span
    aria-hidden="true"
    className={`inline-block w-3 h-3 rounded-full border align-[-1px] ${
      tone === 'clair' ? 'bg-white border-gray-500' : 'bg-gray-900 border-gray-900'
    }`}
  />
);

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section aria-labelledby={id} className="border-t border-gray-200 py-10 scroll-mt-20">
    <h2 id={id} className="text-xl font-semibold text-gray-900 mb-5">{title}</h2>
    {children}
  </section>
);

/** Carte Google Maps intégrée, chargée seulement à l'approche. */
const MapEmbed: React.FC<{ src: string; title: string }> = ({ src, title }) => (
  <iframe
    src={src}
    title={title}
    className="w-full aspect-[4/3] rounded-md border border-gray-200 bg-gray-100"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
);

const LinkItineraire: React.FC<{ href: string; place: string }> = ({ href, place }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Itinéraire vers ${place} (nouvel onglet)`}
    className="inline-block mt-4 text-primary font-medium underline underline-offset-2 hover:no-underline"
  >
    Itinéraire
  </a>
);

/** Image qui s'ouvre seule en grand (nouvel onglet) pour pouvoir zoomer sur téléphone. */
const ZoomableImage: React.FC<{ src: string; alt: string; width: number; height: number }> = ({ src, alt, width, height }) => (
  <a href={src} target="_blank" rel="noopener noreferrer nofollow" className="group block">
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      draggable={false}
      className="w-full h-auto rounded-md border border-gray-200"
    />
    <span className="mt-2 inline-block text-sm text-primary underline underline-offset-2 group-hover:no-underline">
      Ouvrir l'image en grand
    </span>
  </a>
);

const MatchCell: React.FC<{ match: PoolMatch; selected: number | null }> = ({ match, selected }) => {
  const mine = selected !== null && (match.clair === selected || match.sombre === selected);
  const faded = selected !== null && !mine;
  const num = (id: number) => (
    <span className={id === selected ? 'font-bold' : undefined}>{id}</span>
  );
  return (
    <td className={`py-2.5 px-2 sm:px-3 whitespace-nowrap ${mine ? 'bg-primary/10 text-gray-900' : ''} ${faded ? 'text-gray-400' : ''}`}>
      <span className="inline-flex items-center gap-1.5">
        <Jersey tone="clair" />
        {num(match.clair)}
        <span className={faded ? '' : 'text-gray-400'}>–</span>
        <Jersey tone="sombre" />
        {num(match.sombre)}
      </span>
      <span className="sr-only">
        {` : équipe ${match.clair} en haut clair contre équipe ${match.sombre} en haut sombre`}
      </span>
    </td>
  );
};

const TeamProgram: React.FC<{ team: number }> = ({ team }) => {
  const games = edition.schedule.flatMap(round =>
    TERRAINS.flatMap((terrain: Terrain) => {
      const m = round.matches[terrain];
      if (m.clair !== team && m.sombre !== team) return [];
      const clair = m.clair === team;
      return [{ time: round.time, terrain, opponent: clair ? m.sombre : m.clair, clair }];
    })
  );
  return (
    <div className="mb-6 rounded-md border border-gray-200 p-4 sm:p-5">
      <h3 className="font-semibold text-gray-900 mb-3">Programme de l'équipe {team}</h3>
      <ol className="grid gap-2 text-sm sm:text-base">
        {games.map(g => (
          <li key={g.time} className="grid grid-cols-[3.5rem_1fr] gap-3">
            <span className="font-semibold tabular-nums text-primary">{g.time}</span>
            <span className="text-gray-800">
              Terrain {g.terrain}, contre l'équipe {g.opponent}
              <span className="text-gray-500"> · </span>
              <span className="inline-flex items-center gap-1.5 text-gray-600">
                <Jersey tone={g.clair ? 'clair' : 'sombre'} />
                haut {g.clair ? 'clair' : 'sombre'}
              </span>
            </span>
          </li>
        ))}
        <li className="grid grid-cols-[3.5rem_1fr] gap-3">
          <span className="font-bold tabular-nums text-orange-700">{edition.finals.time}</span>
          <span className="text-gray-800">Match de classement, terrain selon ta place dans la poule, haut clair si ton équipe est la mieux classée</span>
        </li>
      </ol>
    </div>
  );
};

const BabHat: React.FC = () => {
  useSEO({
    title: `BAB'HAT ${BABHAT_EMOJI} ${edition.date.slice(0, 4)}, hat tournoi d'ultimate de ${CITIES}`,
    description: `BAB'HAT, hat tournoi d'ultimate de ${CITIES}, organisé par ${listFr(ORGANIZERS.map(c => c.mention))} avec la participation ${listFr(PARTICIPANTS.map(c => c.mention))}. ${edition.dateLabel} au ${edition.venue.name}. Horaires, planning des matchs, infos pratiques et after.`,
  });
  useNoImageIndex();

  const [searchParams, setSearchParams] = useSearchParams();
  const param = Number(searchParams.get('equipe'));
  const selected = TEAM_IDS.includes(param) ? param : null;
  const setSelected = (id: number | null) =>
    setSearchParams(id === null ? {} : { equipe: String(id) }, { replace: true, preventScrollReset: true });

  const [meeting, start] = edition.timeline;

  return (
    <main id="bab-hat" className="bg-white text-gray-700">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* En-tête */}
        <div className="pt-12 pb-10 md:pt-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            <span translate="no">BAB'HAT</span> <Emoji className="whitespace-nowrap" />
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Hat tournoi d'ultimate de {CITIES}, {ordinal(edition.number)} édition
          </p>
          <p className="mt-1 text-gray-600">
            Organisé par {joinNodes(ORGANIZERS.map(c => <ClubMention key={c.name} mention={c.mention} emoji={c.emoji} />))}
            {PARTICIPANTS.length > 0 ? (
              <>, avec la participation {joinNodes(PARTICIPANTS.map(c => <ClubMention key={c.name} mention={c.mention} emoji={c.emoji} />))}</>
            ) : null}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-start border-l-4 border-primary bg-primary/5 rounded-r-md p-5 sm:p-6">
            <div>
              <p className="text-xl md:text-2xl font-semibold text-gray-900">{edition.dateLabel}</p>
              <p className="mt-2 text-gray-900">
                Rendez-vous à <strong className="text-primary">{meeting.time}</strong>, début des matchs à{' '}
                <strong className="text-primary">{start.time}</strong>
              </p>
              <p className="mt-4">
                {edition.venue.name}<br />
                {edition.venue.detail}<br />
                {edition.venue.address}
              </p>
              <p className="mt-2 font-semibold text-gray-900">{edition.venue.facilities}</p>
              <LinkItineraire href={edition.venue.mapsUrl} place={edition.venue.name} />
            </div>
            <MapEmbed src={edition.venue.embedUrl} title={`Carte : ${edition.venue.name}, Bègles`} />
          </div>
        </div>

        {/* Journée */}
        <Section id="journee" title="La journée">
          <ol className="grid gap-4">
            {edition.timeline.map(step => (
              <li key={step.time} className="grid grid-cols-[4rem_1fr] gap-4">
                <span className={`tabular-nums text-primary ${step.highlight ? 'font-bold' : 'font-semibold'}`}>{step.time}</span>
                <span>
                  <span className={`block text-gray-900 ${step.highlight ? 'font-semibold' : ''}`}>{step.label}</span>
                  {step.detail ? <span className="block text-sm text-gray-500">{step.detail}</span> : null}
                </span>
              </li>
            ))}
          </ol>
        </Section>

        {/* Planning */}
        <Section id="planning" title="Planning des matchs">
          <div className="mb-6">
            <p id="filtre-equipe" className="text-sm text-gray-600 mb-2">Mon équipe</p>
            <div role="group" aria-labelledby="filtre-equipe" className="flex flex-wrap gap-1.5 sm:gap-2">
              {[null, ...TEAM_IDS].map(id => {
                const active = selected === id;
                return (
                  <button
                    key={id ?? 'toutes'}
                    type="button"
                    onClick={() => setSelected(id)}
                    aria-pressed={active}
                    className={`min-w-[2.5rem] px-2.5 sm:px-3 py-1.5 rounded-md border text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      active ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {id === null ? 'Toutes' : id}
                  </button>
                );
              })}
            </div>
          </div>

          {selected !== null ? <TeamProgram team={selected} /> : null}

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full table-fixed text-left text-sm sm:text-base tabular-nums">
              <caption className="sr-only">
                Planning des matchs par créneau et par terrain. Les numéros désignent les équipes.
              </caption>
              <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                  <th scope="col" className="w-16 sm:w-24 py-2 px-2 sm:px-3 font-medium">Heure</th>
                  {TERRAINS.map(t => (
                    <th key={t} scope="col" className="py-2 px-2 sm:px-3 font-medium">{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {edition.schedule.map(round => (
                  <tr key={round.time} className="border-b border-gray-100">
                    <th scope="row" className="py-2.5 px-2 sm:px-3 font-semibold text-primary">{round.time}</th>
                    {TERRAINS.map(t => (
                      <MatchCell key={t} match={round.matches[t]} selected={selected} />
                    ))}
                  </tr>
                ))}
                <tr className="bg-secondary/10">
                  <th scope="row" className="py-2.5 px-2 sm:px-3 font-bold text-orange-700">{edition.finals.time}</th>
                  {TERRAINS.map(t => (
                    <td key={t} className={`py-2.5 px-2 sm:px-3 ${t === 'Bègles' ? 'font-bold text-orange-700' : 'text-gray-900'}`}>
                      {edition.finals.matches[t]}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1.5"><Jersey tone="clair" /> haut clair</span>
            <span className="inline-flex items-center gap-1.5"><Jersey tone="sombre" /> haut sombre</span>
            <span>Matchs de 30 min, 10 min de pause. Fin vers {edition.endTime}.</span>
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Matchs de classement : l'équipe la mieux classée joue en haut clair.
          </p>
        </Section>

        {/* Infos pratiques */}
        <Section id="infos" title="Infos pratiques">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Format</h3>
              <ul className="grid gap-1.5">
                {edition.format.map(line => <li key={line}>{line}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Dans ton sac</h3>
              <ul className="grid gap-1.5">
                {edition.checklist.map(item => (
                  <li key={item.label} className="flex items-center gap-2.5">
                    {item.tone ? <Jersey tone={item.tone} /> : <span aria-hidden="true" className="inline-block w-3 h-3" />}
                    {item.label}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-semibold text-gray-900">Les deux hauts servent à distinguer les équipes.</p>
            </div>
          </div>
        </Section>

        {/* Plan */}
        <Section id="plan" title="Plan des terrains">
          <div className="max-w-2xl">
            <ZoomableImage
              src={edition.images.plan}
              alt="Vue aérienne du synthétique : terrains Bordeaux, Ambarès et Bègles, vestiaires, point d'eau et entrée"
              width={798}
              height={853}
            />
          </div>
        </Section>

        {/* Équipes : image uniquement, noms jamais en texte */}
        <Section id="equipes" title="Les équipes">
          <ZoomableImage src={edition.images.equipes} alt="Composition des 6 équipes" width={1341} height={885} />
        </Section>

        {/* After */}
        <Section id="after" title="After et auberge espagnole">
          <div className="grid gap-6 md:grid-cols-2 md:items-start border-l-4 border-secondary pl-5">
            <div>
              <p className="text-xl font-semibold text-orange-700">Dès {edition.after.time}</p>
              <p className="mt-2 text-gray-900">
                {edition.after.name}<br />
                {edition.after.address}
              </p>
              <p className="mt-3 font-semibold text-gray-900">{edition.after.principle}</p>
              <p className="mt-1.5">{edition.after.drinks}</p>
              <LinkItineraire href={edition.after.mapsUrl} place={edition.after.name} />
            </div>
            <MapEmbed src={edition.after.embedUrl} title={`Carte : ${edition.after.name}`} />
          </div>
        </Section>
      </div>
    </main>
  );
};

export default BabHat;
