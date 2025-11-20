import React from 'react';

const Club: React.FC = () => (
  <section id="club" className="section" data-reveal>
    <div className="container grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-secondary">Le Club</h2>
        <p className="mb-4">Fondé en 2018, les Aigles de Bègles est un club d'Ultimate Frisbee basé à Bègles, près de Bordeaux. Nous accueillons des joueurs de tous niveaux, du débutant au confirmé, dans une ambiance conviviale et sportive.</p>
        <p>Notre objectif : promouvoir l'Ultimate Frisbee en Nouvelle-Aquitaine tout en développant l'esprit d'équipe et le fair-play.</p>
      </div>
      <div>
        <img src="/images/banniere.jpg" alt="Équipe des Aigles de Bègles" className="rounded-lg shadow" />
      </div>
    </div>
  </section>
);

export default Club;
