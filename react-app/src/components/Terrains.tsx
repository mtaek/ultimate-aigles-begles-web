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
    title: 'Terrain Indoor',
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
      <div className="grid md:grid-cols-3 gap-6">
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
    </div>
  </section>
);

export default Terrains;
