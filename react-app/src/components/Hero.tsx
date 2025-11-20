import React from 'react';

const Hero: React.FC = () => (
  <section id="accueil" className="hero" data-reveal>
    <div className="container text-center w-full">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">Les Aigles de Bègles</h1>
      <p className="slogan text-xl md:text-2xl mb-8 max-w-3xl mx-auto">L'Ultimate, bien plus qu'un sport : une famille, une passion, un esprit.</p>
      <a href="#contact" className="btn-primary text-lg px-8 py-4">Nous rejoindre</a>
    </div>
  </section>
);

export default Hero;
