import React from 'react';
import { useSEO } from '../hooks/useSEO';

const Hero: React.FC = () => {
  const [showVideo, setShowVideo] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useSEO({
    title: 'Accueil',
    description: 'Club d\'Ultimate Frisbee à Bègles près de Bordeaux. Entraînements tous niveaux : débutants, loisir, compétition. Sport mixte, féminin et convivial. Rejoignez-nous !',
  });

  React.useEffect(() => {
    const img = new Image();
    img.src = '/images/banniere-lundi.jpg';
  }, []);

  const toggleBackground = (useVideo: boolean) => {
    setShowVideo(useVideo);
    if (useVideo && videoRef.current) {
      videoRef.current.play().catch(() => {/* ignore */});
    }
  };

  return (
    <section id="accueil" className={`hero ${!showVideo ? 'show-image' : ''}`} data-reveal>
      {/* Video background */}
      <video
        ref={videoRef}
        className="hero-video"
        src="/videos/LiveUltimate.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/banniere-lundi.jpg"
        style={{ display: showVideo ? 'block' : 'none' }}
      />
      <div className="container text-center w-full">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Les Aigles de Bègles</h1>
        <p className="slogan text-xl md:text-2xl mb-8 max-w-3xl mx-auto">L'Ultimate, bien plus qu'un sport : Intensité, Fair-Play, Convivialité, Inclusion et Mixité.</p>
        <a href="#contact" className="btn-primary text-lg px-8 py-4">Nous rejoindre</a>
      </div>
      
      {/* Toggle buttons */}
      <div className="hero-toggle-buttons">
        <button
          onClick={() => toggleBackground(true)}
          className={`hero-toggle-btn ${showVideo ? 'active' : ''}`}
          aria-label="Afficher la vidéo"
          title="Vidéo"
        >
          <i className="fas fa-play"></i>
        </button>
        <button
          onClick={() => toggleBackground(false)}
          className={`hero-toggle-btn ${!showVideo ? 'active' : ''}`}
          aria-label="Afficher l'image"
          title="Image"
        >
          <i className="fas fa-image"></i>
        </button>
      </div>
    </section>
  );
};

export default Hero;
