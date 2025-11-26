import React from 'react';

const Club: React.FC = () => (
  <section id="club" className="section" data-reveal>
    <div className="container grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-secondary">Le Club</h2>
        <p className="mb-4">Fondés en 2018, les Aigles de Bègles est un club d'Ultimate Frisbee basé à Bègles, près de Bordeaux. Nous accueillons des joueurs de tous niveaux, du débutant au confirmé, dans une ambiance conviviale et sportive.</p>
        <p>Notre objectif : promouvoir l'Ultimate Frisbee en Nouvelle-Aquitaine tout en développant l'esprit d'équipe et le fair-play.</p>
      </div>
      <div className="flex justify-center">
        <div className="relative w-80 h-80 bg-white rounded-full shadow-2xl flex items-center justify-center" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2), inset 0 0 30px rgba(0,0,0,0.05)' }}>
          {/* Effet de relief du frisbee */}
          <div className="absolute inset-0 rounded-full" style={{ 
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.1), transparent 50%)'
          }}></div>
          <img 
            src="/images/logo_aigles_2025.png" 
            alt="Logo Les Aigles de Bègles" 
            className="w-56 h-auto object-contain relative z-10"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Club;
