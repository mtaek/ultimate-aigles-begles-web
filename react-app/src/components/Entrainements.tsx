import React from 'react';

interface Training {
  title: string; day: string; time: string; place: string; audience: string; description: string; mapSrc: string; reverse?: boolean;
}

const trainings: Training[] = [
  { title: 'Entraînement Débutants', day: 'Lundi', time: '19h30 - 22h00', place: 'Plaine de jeux du Haut Verduc, Bègles', audience: 'Tous niveaux', description: 'Nos entraînements du lundi sont ouverts à tous, des débutants aux joueurs confirmés. Nous travaillons les fondamentaux et organisons des matchs amicaux.', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d905.2279411288449!2d-0.5364532970710829!3d44.80095664016078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd552700625c78e1%3A0xb7e786157a61d015!2sUltimate%20B%C3%A8gles%2033130%20-%20Les%20Aigles%20-%20Frisbee%20-%20Bordeaux%20-%20Gironde!5e1!3m2!1sfr!2sfr!4v1757434094645!5m2!1sfr!2sfr' },
  { title: 'Entraînement U17 - U20', day: 'Mardi', time: '18h00 - 20h00', place: 'Plaine de jeux du Haut Verduc, Bègles', audience: 'U17-U20 uniquement', description: 'Session spécialement conçue pour les juniors.', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d905.2279411288449!2d-0.5364532970710829!3d44.80095664016078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd552700625c78e1%3A0xb7e786157a61d015!2sUltimate%20B%C3%A8gles%2033130%20-%20Les%20Aigles%20-%20Frisbee%20-%20Bordeaux%20-%20Gironde!5e1!3m2!1sfr!2sfr!4v1757434094645!5m2!1sfr!2sfr', reverse: true },
  { title: 'Entraînement Compétitif', day: 'Jeudi', time: '19h30 - 22h00', place: 'Stade Serge Duhourquet, Bègles', audience: 'Adultes Compétitif', description: 'Nos entraînements du jeudi sont ouverts uniquement aux joueurs confirmés.', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d621.7298428838459!2d-0.5481854555236048!3d44.814016014935824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd55265e076cf3f5%3A0xcd6c3c4b79c2d316!2sStade%20Serge%20Duhourquet!5e1!3m2!1sfr!2sfr!4v1757434535570!5m2!1sfr!2sfr' },
  { title: 'Entraînement U10 - U13 - U15', day: 'Samedi', time: '10h00 - 12h00', place: 'Stade Serge Duhourquet, Bègles', audience: 'U10-U13-U15 uniquement', description: 'Session spécialement conçue pour les juniors.', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d621.7298428838459!2d-0.5481854555236048!3d44.814016014935824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd55265e076cf3f5%3A0xcd6c3c4b79c2d316!2sStade%20Serge%20Duhourquet!5e1!3m2!1sfr!2sfr!4v1757434535570!5m2!1sfr!2sfr', reverse: true },
];

const Entrainements: React.FC = () => (
  <section id="entrainements" className="section bg-gray-100" data-reveal>
    <div className="container">
      <div className="section-header mb-8"><h2 className="text-secondary">Nos Entraînements</h2></div>
      {trainings.map(t => (
        <div key={t.title} className={`training-card ${t.reverse ? 'md:flex-row-reverse' : ''}`}>
          <div className="training-map aspect-video">
            <iframe src={t.mapSrc} className="w-full h-full rounded" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="training-info">
            <h3 className="text-xl font-bold mb-3">{t.title}</h3>
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div><i className="fas fa-calendar-alt mr-1" /> {t.day}</div>
              <div><i className="fas fa-clock mr-1" /> {t.time}</div>
              <div className="col-span-2"><i className="fas fa-map-marker-alt mr-1" /> {t.place}</div>
              <div className="col-span-2"><i className="fas fa-users mr-1" /> {t.audience}</div>
            </div>
            <p className="text-sm">{t.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Entrainements;
