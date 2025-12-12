import React from 'react';
import { useSEO } from '../hooks/useSEO';

const Hero: React.FC = () => {
  useSEO({
    title: 'Accueil',
    description: 'Club d\'Ultimate Frisbee à Bègles près de Bordeaux. Entraînements tous niveaux : débutants, loisir, compétition. Sport mixte et convivial. Rejoignez-nous !',
  });

  React.useEffect(() => {
    const img = new Image();
    img.src = '/images/banniere-lundi.jpg';
  }, []);

  return (
    <section id="accueil" className="hero" data-reveal>
      {/* Video background */}
      <video
        className="hero-video"
        src="/videos/LiveUltimate.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/banniere-lundi.jpg"
      />
      <div className="container text-center w-full">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Les Aigles de Bègles</h1>
        <p className="slogan text-xl md:text-2xl mb-8 max-w-3xl mx-auto">L'Ultimate, bien plus qu'un sport : Intensité, Fair-Play, Convivialité, Inclusion et Mixité.</p>
        <a href="#contact" className="btn-primary text-lg px-8 py-4">Nous rejoindre</a>
      </div>
    </section>
  );
};

export default Hero;
