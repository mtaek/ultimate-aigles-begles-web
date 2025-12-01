import React from 'react';

const terrains = [
  {
    icon: 'fas fa-tree',
    title: 'Terrain Herbe (Outdoor)',
    details: [
      ['Surface', 'Pelouse naturelle ou synthétique'],
      ['Taille', '100m x 37m (règlement officiel)'],
      ['Saison', 'Printemps/Été'],
      ['Équipement', 'Crampons recommandés'],
    ],
  },
  {
    icon: 'fas fa-umbrella-beach',
    title: 'Terrain Sable (Beach)',
    details: [
      ['Surface', 'Sable'],
      ['Taille', '70m x 25m (adaptable)'],
      ['Saison', 'Septembre/Octobre'],
      ['Équipement', 'Pieds nus ou chaussettes'],
    ],
  },
  {
    icon: 'fas fa-home',
    title: 'Terrain gymnase (Indoor)',
    details: [
      ['Surface', 'Parquet (gymnase)'],
      ['Taille', '40m x 20m (adaptable)'],
      ['Saison', 'Novembre à Avril'],
      ['Équipement', "Baskets d'intérieur"],
    ],
  },
];

const Terrains: React.FC = () => (
  <section id="terrains" className="section" data-reveal>
    <div className="container">
      <div className="section-header mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary relative inline-block">
          Les Différents Terrains De Jeu
          <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-secondary"></span>
        </h2>
        <p className="section-subtitle text-gray-600">L'Ultimate se pratique sur différents types de surfaces, adaptées à chaque saison et style de jeu.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {terrains.map(t => (
          <div key={t.title} className="feature-card text-left">
            <div className="text-3xl text-primary mb-2"><i className={t.icon} /></div>
            <h3 className="font-bold text-lg mb-2">{t.title}</h3>
            <ul className="text-sm space-y-1">
              {t.details.map(d => (
                <li key={d[0]}><strong>{d[0]} :</strong> {d[1]}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Schéma du terrain d'Ultimate */}
      <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-center text-secondary mb-6">Schéma du Terrain d'Ultimate (Outdoor)</h3>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Les terrains Beach et Indoor suivent la même structure (zones d'en-but, ligne de goal, brick) mais avec des dimensions adaptées.
        </p>
        
        <div className="max-w-4xl mx-auto">
          {/* Terrain SVG */}
          <svg viewBox="0 0 800 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Fond vert */}
            <rect x="50" y="30" width="700" height="260" fill="#4ade80" stroke="#22c55e" strokeWidth="2"/>
            
            {/* Zone d'en-but gauche */}
            <rect x="50" y="30" width="140" height="260" fill="#86efac" stroke="#fff" strokeWidth="2" strokeDasharray="5,5"/>
            
            {/* Zone d'en-but droite */}
            <rect x="610" y="30" width="140" height="260" fill="#86efac" stroke="#fff" strokeWidth="2" strokeDasharray="5,5"/>
            
            {/* Lignes de goal */}
            <line x1="190" y1="30" x2="190" y2="290" stroke="#fff" strokeWidth="3"/>
            <line x1="610" y1="30" x2="610" y2="290" stroke="#fff" strokeWidth="3"/>
            
            {/* Marques de brick (18m des lignes de goal) */}
            {/* Croix brick gauche */}
            <line x1="302" y1="145" x2="312" y2="155" stroke="#dc2626" strokeWidth="3"/>
            <line x1="312" y1="145" x2="302" y2="155" stroke="#dc2626" strokeWidth="3"/>
            
            {/* Croix brick droit */}
            <line x1="488" y1="145" x2="498" y2="155" stroke="#dc2626" strokeWidth="3"/>
            <line x1="498" y1="145" x2="488" y2="155" stroke="#dc2626" strokeWidth="3"/>
            
            {/* Cônes de end-zones (coins des zones d'en-but) */}
            {/* Cône haut-gauche de la end-zone gauche */}
            <polygon points="190,24 186,32 194,32" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5"/>
            {/* Cône bas-gauche de la end-zone gauche */}
            <polygon points="190,284 186,292 194,292" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5"/>
            {/* Cône haut-droit de la end-zone droite */}
            <polygon points="610,24 606,32 614,32" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5"/>
            {/* Cône bas-droit de la end-zone droite */}
            <polygon points="610,284 606,292 614,292" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5"/>
            
            {/* Cônes au fond des end-zones (aux extrémités) */}
            {/* Cône haut-gauche au fond */}
            <polygon points="50,24 46,32 54,32" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5"/>
            {/* Cône bas-gauche au fond */}
            <polygon points="50,284 46,292 54,292" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5"/>
            {/* Cône haut-droit au fond */}
            <polygon points="750,24 746,32 754,32" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5"/>
            {/* Cône bas-droit au fond */}
            <polygon points="750,284 746,292 754,292" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5"/>
            
            {/* Lignes de cotation pour les longueurs */}
            {/* Zone d'en-but gauche - 18m */}
            <line x1="50" y1="15" x2="190" y2="15" stroke="#1e3a8a" strokeWidth="2" markerStart="url(#arrowStart)" markerEnd="url(#arrowEnd)"/>
            <text x="120" y="12" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">18m</text>
            
            {/* Zone de jeu - 64m */}
            <line x1="190" y1="15" x2="610" y2="15" stroke="#1e3a8a" strokeWidth="2" markerStart="url(#arrowStart)" markerEnd="url(#arrowEnd)"/>
            <text x="400" y="12" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">64m</text>
            
            {/* Zone d'en-but droite - 18m */}
            <line x1="610" y1="15" x2="750" y2="15" stroke="#1e3a8a" strokeWidth="2" markerStart="url(#arrowStart)" markerEnd="url(#arrowEnd)"/>
            <text x="680" y="12" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">18m</text>
            
            {/* Ligne totale - 100m */}
            <line x1="50" y1="305" x2="750" y2="305" stroke="#1e3a8a" strokeWidth="2" markerStart="url(#arrowStart)" markerEnd="url(#arrowEnd)"/>
            <text x="400" y="318" textAnchor="middle" fill="#1e3a8a" fontSize="14" fontWeight="bold">100m (total)</text>
            
            {/* Dimensions texte dans les zones (maintenant supprimées car remplacées par les cotations) */}
            
            {/* Largeur */}
            <line x1="35" y1="30" x2="35" y2="290" stroke="#1e3a8a" strokeWidth="2" markerStart="url(#arrowStart)" markerEnd="url(#arrowEnd)"/>
            <text x="20" y="160" textAnchor="middle" fill="#1e3a8a" fontSize="14" fontWeight="bold" transform="rotate(-90, 20, 160)">37m</text>
            
            {/* Marqueurs de flèches */}
            <defs>
              <marker id="arrowStart" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <path d="M 5 0 L 5 10 L 0 5 Z" fill="#1e3a8a"/>
              </marker>
              <marker id="arrowEnd" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                <path d="M 5 0 L 5 10 L 10 5 Z" fill="#1e3a8a"/>
              </marker>
            </defs>
          </svg>
          
          {/* Légende */}
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 bg-[#86efac] border-2 border-white rounded flex-shrink-0 mt-1"></div>
              <p><strong>Zones d'en-but (18m) :</strong> Zones où marquer des points en réceptionnant le disque</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 bg-[#4ade80] border-2 border-white rounded flex-shrink-0 mt-1"></div>
              <p><strong>Zone de jeu (64m) :</strong> Zone centrale où se déroule le jeu</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="relative w-4 h-4 flex-shrink-0 mt-1">
                <div className="absolute inset-0 flex items-center justify-center text-red-600 font-bold text-lg">×</div>
              </div>
              <p><strong>Point de brick :</strong> À 18m de la ligne de goal au centre du terrain. Lorsque l'engagement atterrit hors-jeu près de la ligne de but (moins de 18m) ou derrière celle-ci, le receveur peut appeler "brick" et commencer à jouer depuis ce point.</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 flex items-end justify-center flex-shrink-0 mt-1">
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#ef4444]"></div>
              </div>
              <p><strong>Cônes de end-zones :</strong> Marquent les huit coins du terrain (4 coins des lignes de goal et 4 coins des extrémités)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Terrains;
