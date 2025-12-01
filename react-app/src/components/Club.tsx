import React from 'react';

const Club: React.FC = () => (
  <section id="club" className="section" data-reveal>
    <div className="container">
      <div className="section-header mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary relative inline-block">
          Le Club
          <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-secondary"></span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="mb-4">Les Aigles de Bègles jouent ensemble depuis 2018 et ont créé en 2024 l'association <b>Ultimate Bègles</b>, un club d'ultimate frisbee basé à Bègles dans la métropole de Bordeaux. Nous accueillons des joueurs de tous niveaux, du débutant au confirmé, dans une ambiance conviviale et sportive.</p>
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
    </div>
  </section>
);

export default Club;
