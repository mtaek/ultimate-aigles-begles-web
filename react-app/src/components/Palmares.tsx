import React, { useState } from 'react';
import { useSEO } from '../hooks/useSEO';

interface Tournament {
  saison: string;
  terrain: string;
  categorie: string;
  title: string;
  date: string;
  rank?: string;
  rankClass?: string;
  details?: string;
  sotg?: boolean;
}

interface NiveauEquipe {
  categorie: string;
  niveaux: { terrain: string; niveau: string; }[];
}

const categorieNiveauxIcons: Record<string, string> = {
  'Senior Open': 'fas fa-male',
  'Senior Mixte': 'fas fa-venus-mars',
  'Senior Féminin': 'fas fa-female',
};

const niveauxEquipes: NiveauEquipe[] = [
  {
    categorie: 'Senior Open',
    niveaux: [
      { terrain: 'Beach', niveau: 'National 2' },
      { terrain: 'Outdoor', niveau: 'National 3' },
      { terrain: 'Indoor', niveau: 'Division Régionale 1' },
    ]
  },
  {
    categorie: 'Senior Mixte',
    niveaux: [
      { terrain: 'Beach', niveau: 'National 2' },
      { terrain: 'Outdoor', niveau: 'National 3' },
      { terrain: 'Indoor', niveau: 'Coupe Nouvelle Aquitaine' },
    ]
  },
  {
    categorie: 'Senior Féminin',
    niveaux: [
      { terrain: 'Beach', niveau: 'National 1' },
    ]
  }
];

const data: Tournament[] = [
  // Saison 2025-2026
  { saison: '2025-2026', terrain: 'indoor', categorie: 'mixte', title: 'Coupe Indoor', date: '2025-2026', rank: '1er', rankClass: 'gold', details: 'Victoire en coupe indoor, sprint aussi !', sotg: true },
  { saison: '2025-2026', terrain: 'beach', categorie: 'mixte', title: 'Championnat N2', date: '2025-2026', rank: '4ème', rankClass: '' },
  { saison: '2025-2026', terrain: 'outdoor', categorie: 'mixte', title: 'Championnat N3', date: '2025-2026', rank: '3ème', rankClass: 'bronze' },
  { saison: '2025-2026', terrain: 'beach', categorie: 'open', title: 'Championnat N2', date: '2025-2026', rank: '2ème', rankClass: 'silver' },
  { saison: '2025-2026', terrain: 'beach', categorie: 'feminin', title: 'Championnat N1', date: '2025-2026', rank: '11ème', rankClass: '' },
  { saison: '2025-2026', terrain: 'indoor', categorie: 'feminin', title: 'Championnat DR', date: '2025-2026', rank: '2ème DR', rankClass: 'silver' },
  { saison: '2025-2026', terrain: 'indoor', categorie: 'junior', title: 'Championnat U20 Mixte DR', date: '2025-2026', rank: '2ème', rankClass: 'silver', details: 'Championnat DR' },
  { saison: '2025-2026', terrain: 'indoor', categorie: 'junior', title: 'Tournoi U15 Open', date: '2025-2026', rank: '3ème', rankClass: 'bronze' },
  { saison: '2025-2026', terrain: 'indoor', categorie: 'junior', title: 'Tournoi U15 Open', date: '2025-2026', rank: '2ème', rankClass: 'silver' },
  { saison: '2025-2026', terrain: 'indoor', categorie: 'junior', title: 'Tournoi U13 Open', date: '2025-2026', rank: '6ème', rankClass: '' },

  // Saison 2024-2025
  { saison: '2024-2025', terrain: 'outdoor', categorie: 'mixte', title: 'Championnat N3', date: '2024-2025', rank: '4ème', rankClass: '' },
  { saison: '2024-2025', terrain: 'beach', categorie: 'mixte', title: 'Championnat N2', date: '2024-2025', rank: '9ème', rankClass: '' },
  { saison: '2024-2025', terrain: 'outdoor', categorie: 'open', title: 'Championnat N3', date: '2024-2025', rank: '5ème', rankClass: '' },
  { saison: '2024-2025', terrain: 'beach', categorie: 'open', title: 'Championnat N2', date: '2024-2025', rank: '6ème', rankClass: '' },
  { saison: '2024-2025', terrain: 'beach', categorie: 'open', title: 'Championnat N1', date: '2024-2025', rank: '6ème', rankClass: '' },
  { saison: '2024-2025', terrain: 'indoor', categorie: 'open', title: 'Championnat DR1', date: '2024-2025', rank: '5ème', rankClass: '' },
  { saison: '2024-2025', terrain: 'indoor', categorie: 'open', title: 'Championnat N2', date: '2024-2025', rank: '13ème', rankClass: '' },
  { saison: '2024-2025', terrain: 'indoor', categorie: 'junior', title: 'Championnat U20 Mixte', date: '2024-2025', rank: '4ème', rankClass: '' },
  { saison: '2024-2025', terrain: 'indoor', categorie: 'junior', title: 'Championnat U20 Mixte', date: '2024-2025', rank: '5ème', rankClass: '' },
  { saison: '2024-2025', terrain: 'outdoor', categorie: 'junior', title: 'Championnat U20 Mixte', date: '2024-2025', rank: '10ème', rankClass: '' },
  { saison: '2024-2025', terrain: 'outdoor', categorie: 'junior', title: 'Championnat U17 Open', date: '2024-2025', rank: '3ème', rankClass: 'bronze', sotg: true },
  { saison: '2024-2025', terrain: 'outdoor', categorie: 'junior', title: 'Championnat U17 Open', date: '2024-2025', rank: '8ème', rankClass: '' },
  { saison: '2024-2025', terrain: 'indoor', categorie: 'junior', title: 'Championnat U17 Mixte', date: '2024-2025', rank: '3ème', rankClass: 'bronze' },

  // Saison 2023-2024
  { saison: '2023-2024', terrain: 'outdoor', categorie: 'mixte', title: 'Championnat N3', date: '2023-2024', rank: '3ème', rankClass: 'bronze' },
  { saison: '2023-2024', terrain: 'beach', categorie: 'mixte', title: 'Championnat N2', date: '2023-2024', rank: '13ème', rankClass: '' },
  { saison: '2023-2024', terrain: 'outdoor', categorie: 'open', title: 'Championnat N3', date: '2023-2024', rank: '2ème', rankClass: 'silver' },
  { saison: '2023-2024', terrain: 'beach', categorie: 'open', title: 'Championnat N2', date: '2023-2024', rank: '8ème', rankClass: '' },
  { saison: '2023-2024', terrain: 'beach', categorie: 'open', title: 'Championnat N2', date: '2023-2024', rank: '5ème', rankClass: '' },
  { saison: '2023-2024', terrain: 'indoor', categorie: 'open', title: 'Championnat DR', date: '2023-2024', rank: 'DR', rankClass: '' },
  { saison: '2023-2024', terrain: 'indoor', categorie: 'junior', title: 'Championnat U20 Mixte', date: '2023-2024', rank: '11ème', rankClass: '' },
  { saison: '2023-2024', terrain: 'indoor', categorie: 'junior', title: 'Championnat U20 Mixte', date: '2023-2024', rank: '7ème', rankClass: '' },
  { saison: '2023-2024', terrain: 'outdoor', categorie: 'junior', title: 'Championnat U20 Mixte', date: '2023-2024', rank: '11ème', rankClass: '' },
  { saison: '2023-2024', terrain: 'outdoor', categorie: 'junior', title: 'Championnat U17 Open', date: '2023-2024', rank: '4ème', rankClass: '' },
  { saison: '2023-2024', terrain: 'beach', categorie: 'junior', title: 'Tournoi U15 Open', date: '2023-2024', rank: '9ème', rankClass: '' },
  { saison: '2023-2024', terrain: 'indoor', categorie: 'junior', title: 'Tournoi U15 Open', date: '2023-2024', rank: '4ème', rankClass: '' },
  { saison: '2023-2024', terrain: 'indoor', categorie: 'junior', title: 'Tournoi U13 Open', date: '2023-2024', rank: '5ème', rankClass: '' },
  { saison: '2023-2024', terrain: 'outdoor', categorie: 'junior', title: 'Tournoi U13 Open', date: '2023-2024', rank: '3ème', rankClass: 'bronze' },
  { saison: '2023-2024', terrain: 'outdoor', categorie: 'junior', title: 'Tournoi U13 Open', date: '2023-2024', rank: '4ème', rankClass: '' },

  // Saison 2022-2023
  { saison: '2022-2023', terrain: 'outdoor', categorie: 'mixte', title: 'Championnat N3', date: '2022-2023', rank: '7ème', rankClass: '' },
  { saison: '2022-2023', terrain: 'beach', categorie: 'open', title: 'Championnat N2', date: '2022-2023', rank: '6ème', rankClass: '' },
  { saison: '2022-2023', terrain: 'outdoor', categorie: 'open', title: 'Championnat DR', date: '2022-2023', rank: '1er', rankClass: 'gold', details: 'Victoire en championnat régional' },
  { saison: '2022-2023', terrain: 'beach', categorie: 'master', title: 'Tournoi Master Open', date: '2022-2023', rank: '3ème', rankClass: 'bronze' },
  { saison: '2022-2023', terrain: 'indoor', categorie: 'open', title: 'Championnat DR', date: '2022-2023', rank: 'DR', rankClass: '' },
  { saison: '2022-2023', terrain: 'indoor', categorie: 'junior', title: 'Championnat U17 Mixte', date: '2022-2023', rank: '9ème', rankClass: '' },
  { saison: '2022-2023', terrain: 'beach', categorie: 'junior', title: 'Tournoi U15 Open', date: '2022-2023', rank: '7ème', rankClass: '' },
  { saison: '2022-2023', terrain: 'indoor', categorie: 'junior', title: 'Tournoi U15 Open', date: '2022-2023', rank: '8ème', rankClass: '' },
  { saison: '2022-2023', terrain: 'indoor', categorie: 'junior', title: 'Tournoi U13 Open', date: '2022-2023', rank: '9ème', rankClass: '' },
  { saison: '2022-2023', terrain: 'outdoor', categorie: 'junior', title: 'Tournoi U13 Open', date: '2022-2023', rank: '6ème', rankClass: '' },
];

const terrainIcons: Record<string, string> = { outdoor: 'fas fa-tree', indoor: 'fas fa-home', beach: 'fas fa-umbrella-beach' };
const categorieIcons: Record<string, string> = { 
  open: 'fas fa-male', 
  mixte: 'fas fa-venus-mars', 
  feminin: 'fas fa-female',
  junior: 'fas fa-child',
  master: 'fas fa-user-clock'
};

const categorieLabels: Record<string, string> = {
  open: 'Senior Open',
  mixte: 'Senior Mixte',
  feminin: 'Senior Féminin',
  junior: 'Junior',
  master: 'Master'
};

const terrainLabels: Record<string, string> = {
  outdoor: 'Outdoor',
  indoor: 'Indoor',
  beach: 'Beach'
};

const Palmares: React.FC = () => {
  useSEO({
    title: 'Palmarès',
    description: 'Découvrez le palmarès des Aigles de Bègles : tous nos titres, podiums et performances en tournois d\'Ultimate Frisbee depuis 2010.',
    canonical: 'https://ultimatebegles.fr/palmares',
  });

  const [filterSaison, setFilterSaison] = useState<string>('all');

  const saisons = Array.from(new Set(data.map(d => d.saison))).sort().reverse();
  
  const filtered = React.useMemo(() => {
    return data.filter(t => {
      if (filterSaison !== 'all' && t.saison !== filterSaison) return false;
      return true;
    });
  }, [filterSaison]);

  const groupedBySaison = React.useMemo(() => {
    return saisons
      .map(s => ({
        saison: s,
        tournaments: filtered.filter(t => t.saison === s)
      }))
      .filter(g => g.tournaments.length > 0);
  }, [saisons, filtered]);

  return (
    <main className="section bg-gray-50 min-h-screen" id="palmares" data-reveal>
      <div className="container">
        <h1 className="text-4xl font-bold mb-2 text-secondary">Palmarès des Aigles de Bègles</h1>
        <p className="text-gray-600 mb-4">Nos performances depuis 2022, classées par saison et catégorie</p>
        
        <div className="mb-8 p-4 bg-white rounded shadow">
          <p className="mb-3 font-semibold">Le club propose des équipes pour tous les profils :</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <p><i className="fas fa-female text-primary mr-2"></i><strong>Féminin</strong> : 100% féminine</p>
            <p><i className="fas fa-male text-primary mr-2"></i><strong>Open</strong> : Principalement masculin</p>
            <p><i className="fas fa-venus-mars text-primary mr-2"></i><strong>Mixte</strong> : 4♂/3♀ (7v7) ou 3♂/2♀ (5v5)</p>
            <p><i className="fas fa-child text-primary mr-2"></i><strong>Junior</strong> : U13/U15/U17/U20</p>
            <p><i className="fas fa-user-clock text-primary mr-2"></i><strong>Master</strong> : 30+ ans</p>
          </div>
        </div>

        {/* Tableau des niveaux actuels */}
        <div className="mb-8 p-6 bg-white rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Niveaux actuels de compétition</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="border border-gray-300 px-4 py-3 text-left">Catégorie</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Terrain</th>
                  <th className="border border-gray-300 px-4 py-3 text-left">Niveau</th>
                </tr>
              </thead>
              <tbody>
                {niveauxEquipes.map((equipe, idx) => (
                  equipe.niveaux.map((niveau, nIdx) => (
                    <tr key={`${idx}-${nIdx}`} className="hover:bg-gray-50">
                      {nIdx === 0 && (
                        <td 
                          className="border border-gray-300 px-4 py-3 font-semibold" 
                          rowSpan={equipe.niveaux.length}
                        >
                          <i className={`${categorieNiveauxIcons[equipe.categorie]} text-primary mr-2`}></i>
                          {equipe.categorie}
                        </td>
                      )}
                      <td className="border border-gray-300 px-4 py-3">
                        {niveau.terrain === 'Beach' && <i className="fas fa-umbrella-beach text-secondary mr-2"></i>}
                        {niveau.terrain === 'Outdoor' && <i className="fas fa-tree text-green-600 mr-2"></i>}
                        {niveau.terrain === 'Indoor' && <i className="fas fa-home text-blue-600 mr-2"></i>}
                        {niveau.terrain}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 font-semibold text-primary">
                        {niveau.niveau}
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            <strong>Légende :</strong> National 1 = Élite nationale • National 2/3 = Championnats nationaux • Division Régionale = Championnat régional
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="max-w-xs">
            <label htmlFor="saison-filter" className="block text-center font-semibold mb-2">Filtrer par saison</label>
            <select 
              id="saison-filter" 
              value={filterSaison} 
              onChange={e => setFilterSaison(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Toutes les saisons</option>
              {saisons.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {groupedBySaison.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Aucun résultat pour ces filtres.</p>
        ) : (
          <>
            <div className="space-y-12">
              {groupedBySaison.map(g => (
                <div key={g.saison} className="space-y-6">
                  <h2 className="text-2xl font-semibold border-b pb-2 text-secondary">Saison {g.saison}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {g.tournaments.map(t => (
                      <div key={t.title + t.date} className="bg-white rounded shadow p-4 transition hover:shadow-md flex flex-col">
                        <div className="flex-1">
                          <h3 className="font-bold text-base mb-1">{t.title}</h3>
                          <p className="text-xs text-gray-500 mb-2">{t.date}</p>
                          <div className="text-xs flex flex-col gap-1 mb-3">
                            <span className="text-primary"><i className={terrainIcons[t.terrain]}></i> {terrainLabels[t.terrain]}</span>
                            <span className="text-primary"><i className={categorieIcons[t.categorie]}></i> {categorieLabels[t.categorie]}</span>
                          </div>
                          {t.details && <p className="text-xs text-gray-700 mb-3">{t.details}</p>}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-auto">
                          {t.rank && (
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                              t.rankClass === 'gold' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-400' :
                              t.rankClass === 'silver' ? 'bg-gray-100 text-gray-700 border-2 border-gray-400' :
                              t.rankClass === 'bronze' ? 'bg-amber-100 text-amber-800 border-2 border-amber-500' :
                              'bg-blue-50 text-blue-700 border border-blue-300'
                            }`}>
                              {t.rankClass === 'gold' && '🥇 '}
                              {t.rankClass === 'silver' && '🥈 '}
                              {t.rankClass === 'bronze' && '🥉 '}
                              {t.rank}
                            </span>
                          )}
                          {t.sotg && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border-2 border-green-400">
                              🤝 SOTG
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-white rounded shadow border-l-4 border-green-500">
              <p className="text-sm text-gray-700">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-400 mr-2">
                  🤝 SOTG
                </span>
                <strong>Spirit of the Game</strong> : Gagnant de l'esprit du jeu - Récompense l'équipe ayant fait preuve du meilleur fair-play et respect des valeurs de l'Ultimate
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Palmares;