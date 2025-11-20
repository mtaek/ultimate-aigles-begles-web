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
}

const data: Tournament[] = [
  { saison: '2023-2024', terrain: 'outdoor', categorie: 'open', title: 'Championnat Régional Nouvelle-Aquitaine', date: 'Juin 2024', rank: '🥇 1ère place', rankClass: 'gold', details: 'Victoire en finale contre les Pirates de Poitiers (15-12). Qualification pour les play-offs nationaux.' },
  { saison: '2023-2024', terrain: 'outdoor', categorie: 'open', title: 'Tournoi de Bordeaux', date: 'Avril 2024', rank: '🥈 2ème place', rankClass: 'silver', details: 'Finale perdue contre les Ultimate Falcons (13-15).' },
  { saison: '2023-2024', terrain: 'outdoor', categorie: 'mixte', title: 'Coupe de France Mixte', date: 'Mai 2024', rank: '🥉 3ème place', rankClass: 'bronze', details: "Première médaille nationale pour l'équipe mixte ! Victoire contre les Sharks de Lyon." },
  { saison: '2023-2024', terrain: 'beach', categorie: 'open', title: 'Beach Ultimate Tour - Étape de Biarritz', date: 'Juillet 2023', rank: '🥇 1ère place', rankClass: 'gold', details: 'Victoire en finale contre les Sunburners de Montpelier (13-10).' },
  { saison: '2022-2023', terrain: 'outdoor', categorie: 'open', title: 'Championnat Régional', date: 'Juin 2023', rank: '🥈 2ème place', rankClass: 'silver', details: 'Finale perdue contre les Pirates de Poitiers (12-14).' },
  { saison: '2022-2023', terrain: 'outdoor', categorie: 'feminin', title: 'Tournoi Féminin de Toulouse', date: 'Mars 2023', rank: '🥇 1ère place', rankClass: 'gold', details: 'Première victoire en tournoi féminin pour les Aigles !' },
  { saison: '2022-2023', terrain: 'indoor', categorie: 'mixte', title: 'Championnat Indoor Régional', date: 'Février 2023', rank: '🥉 3ème place', rankClass: 'bronze' },
  { saison: '2021-2022', terrain: 'outdoor', categorie: 'open', title: 'Championnat Régional', date: 'Juin 2022', rank: '🥉 3ème place', rankClass: 'bronze' },
  { saison: '2021-2022', terrain: 'outdoor', categorie: 'junior', title: 'Tournoi Junior de Bordeaux', date: 'Avril 2022', rank: '🥇 1ère place', rankClass: 'gold', details: 'Victoire des juniors U17 contre Talence et Mérignac.' },
  { saison: '2020-2021', terrain: 'outdoor', categorie: 'master', title: 'Tournoi Vétérans Aquitaine', date: 'Septembre 2020', rank: '4 éme place', rankClass: '' }
];

const rankColor: Record<string, string> = { gold: 'text-yellow-500', silver: 'text-gray-400', bronze: 'text-amber-600' };
const terrainIcons: Record<string, string> = { outdoor: 'fas fa-tree', indoor: 'fas fa-home', beach: 'fas fa-umbrella-beach' };
const categorieIcons: Record<string, string> = { 
  open: 'fas fa-male', 
  mixte: 'fas fa-venus-mars', 
  feminin: 'fas fa-female',
  junior: 'fas fa-child',
  master: 'fas fa-user-clock'
};

const Palmares: React.FC = () => {
  useSEO({
    title: 'Palmarès',
    description: 'Découvrez le palmarès des Aigles de Bègles : tous nos titres, podiums et performances en tournois d\'Ultimate Frisbee depuis 2010.',
    canonical: 'https://ultimatebegles.fr/palmares',
  });

  const [filterSaison, setFilterSaison] = useState('all');
  const [filterTerrain, setFilterTerrain] = useState('all');
  const [filterCategorie, setFilterCategorie] = useState('all');

  const saisons = Array.from(new Set(data.map(d => d.saison)));
  
  const filtered = data.filter(t => 
    (filterSaison === 'all' || t.saison === filterSaison) &&
    (filterTerrain === 'all' || t.terrain === filterTerrain) &&
    (filterCategorie === 'all' || t.categorie === filterCategorie)
  );

  const groupedBySaison = saisons.map(s => ({
    saison: s,
    tournaments: filtered.filter(t => t.saison === s)
  })).filter(g => g.tournaments.length > 0);

  return (
    <main className="section bg-gray-50 min-h-screen" id="palmares" data-reveal>
      <div className="container">
        <h1 className="text-4xl font-bold mb-2 text-secondary">Palmarès des Aigles de Bègles</h1>
        <p className="text-gray-600 mb-4">Nos performances depuis 2010, classées par saison et catégorie</p>
        
        <div className="mb-8 p-4 bg-white rounded shadow">
          <p className="mb-3 font-semibold">Le club propose des équipes pour tous les profils :</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
            <p><i className="fas fa-female text-primary mr-2"></i><strong>Féminin</strong> : 100% féminine</p>
            <p><i className="fas fa-male text-primary mr-2"></i><strong>Open</strong> : Principalement masculin</p>
            <p><i className="fas fa-venus-mars text-primary mr-2"></i><strong>Mixte</strong> : 4♂/3♀ (7v7) ou 3♂/2♀ (5v5)</p>
            <p><i className="fas fa-child text-primary mr-2"></i><strong>Junior</strong> : U13/U15/U17/U20</p>
            <p><i className="fas fa-user-clock text-primary mr-2"></i><strong>Master</strong> : 30+ ans</p>
          </div>
        </div>

        <div className="mb-8 p-4 bg-white rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="saison-filter" className="block font-semibold mb-1">Saison :</label>
              <select 
                id="saison-filter" 
                value={filterSaison} 
                onChange={e => setFilterSaison(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Toutes</option>
                {saisons.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="terrain-filter" className="block font-semibold mb-1">Terrain :</label>
              <select 
                id="terrain-filter" 
                value={filterTerrain} 
                onChange={e => setFilterTerrain(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Tous</option>
                <option value="outdoor">Outdoor</option>
                <option value="indoor">Indoor</option>
                <option value="beach">Beach</option>
              </select>
            </div>
            <div>
              <label htmlFor="categorie-filter" className="block font-semibold mb-1">Catégorie :</label>
              <select 
                id="categorie-filter" 
                value={filterCategorie} 
                onChange={e => setFilterCategorie(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Toutes</option>
                <option value="open">Open</option>
                <option value="mixte">Mixte</option>
                <option value="feminin">Féminin</option>
                <option value="junior">Junior</option>
                <option value="master">Master</option>
              </select>
            </div>
          </div>
        </div>

        {groupedBySaison.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Aucun résultat pour ces filtres.</p>
        ) : (
          <div className="grid gap-12">
            {groupedBySaison.map(g => (
              <div key={g.saison} className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2 text-secondary">Saison {g.saison}</h2>
                {g.tournaments.map(t => (
                  <div key={t.title + t.date} className="bg-white rounded shadow p-5 transition hover:shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{t.title} <span className="text-sm font-normal text-gray-500">{t.date}</span></h3>
                        <div className="text-sm flex items-center gap-3 mt-1">
                          <span className="text-primary"><i className={terrainIcons[t.terrain]}></i> {t.terrain.charAt(0).toUpperCase() + t.terrain.slice(1)}</span>
                          <span className="text-primary"><i className={categorieIcons[t.categorie]}></i> {t.categorie.charAt(0).toUpperCase() + t.categorie.slice(1)}</span>
                        </div>
                      </div>
                      {t.rank && <span className={`text-lg font-semibold ${t.rankClass ? rankColor[t.rankClass] : ''}`}>{t.rank}</span>}
                    </div>
                    {t.details && <p className="mt-3 text-sm text-gray-700">{t.details}</p>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Palmares;