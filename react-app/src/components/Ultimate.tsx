import React from 'react';

const features = [
  { icon: 'fas fa-handshake', title: 'Auto-arbitrage', text: "Pas d'arbitre : les joueurs gèrent eux-mêmes les règles avec fair-play." },
  { icon: 'fas fa-venus-mars', title: 'Mixité', text: 'Sport 100% mixte où hommes et femmes jouent ensemble à égalité.' },
  { icon: 'fas fa-shield-alt', title: 'Sans contact', text: 'Sport sans contact physique, privilégiant agilité et stratégie.' },
  { icon: 'fas fa-users', title: "Esprit d'équipe", text: 'Stratégie collective et communication sont essentielles pour gagner.' },
  { icon: 'fas fa-universal-access', title: 'Accessible à tous', text: "Pas besoin d'expérience : débutants et confirmés jouent ensemble." },
  { icon: 'fas fa-heart', title: 'Valeurs fortes', text: 'Respect, inclusion et plaisir sont au cœur de ce sport.' },
];

const Ultimate: React.FC = () => (
  <section id="ultimate" className="section bg-gray-100" data-reveal>
    <div className="container">
      <div className="section-header mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary relative inline-block">
          L'Ultimate Frisbee
          <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-secondary"></span>
        </h2>
      </div>
      <div className="max-w-5xl mx-auto space-y-4 mb-10">
        <p>L'Ultimate (ou Ultimate Frisbee) est un sport collectif <strong>sans contact</strong> qui se joue avec un disque. Deux équipes de 7 joueurs s'affrontent sur un terrain rectangulaire avec des zones d'en-but, avec pour objectif de marquer des points en attrapant le disque dans la zone adverse.</p>
        <p>Ce qui rend ce sport unique est son <strong>esprit sportif</strong> (Spirit of the Game) où les joueurs arbitrent eux-mêmes les matchs, même en compétition, favorisant le <strong>fair-play</strong> et le <strong>respect</strong>.</p>
        <p>Accessible à tous, l'Ultimate développe <strong>endurance, coordination et esprit d'équipe</strong>, tout en prônant la <strong>mixité</strong> et l'<strong>inclusion</strong>.</p>
      </div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {features.map(f => (
          <div key={f.title} className="feature-card">
            <div className="text-3xl text-primary"><i className={f.icon} /></div>
            <h3 className="font-bold text-lg">{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Ultimate;
