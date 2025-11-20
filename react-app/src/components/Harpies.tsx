import React from 'react';
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';

const Harpies: React.FC = () => {
  const reveal = useReveal();

  useSEO({
    title: 'Les Harpies - Tournoi 100% Féminin Indoor | Les Aigles de Bègles',
    description: 'Le tournoi Les Harpies est un tournoi indoor 100% féminin organisé chaque année par Les Aigles de Bègles. Ambiance rock and roll, esprit sportif et compétition de haut niveau.',
  });

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
        <div className="container relative z-10">
          <div className="text-center" ref={reveal}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Les Harpies
            </h1>
            <p className="text-xl md:text-2xl mb-4">
              Tournoi Indoor 100% Féminin
            </p>
            <p className="text-lg opacity-90">
              Chaque année à Bègles 🎸
            </p>
          </div>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto" ref={reveal}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
              Le Tournoi
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Le tournoi <strong>Les Harpies</strong> est un événement annuel organisé par Les Aigles de Bègles, 
                célébrant l'ultimate féminin dans une ambiance unique et festive. Chaque année, nous accueillons 
                des équipes féminines venues de toute la France pour un week-end de compétition indoor de haut niveau.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Au-delà de la compétition sportive, Les Harpies c'est aussi une véritable fête du sport féminin, 
                avec une ambiance qui fait l'identité du tournoi : soirée d'accueil 
                au Carnaval Café, hamburgers préparés avec l'Atelier la Grande Bouche, concours d'air guitar, 
                quiz, et moments de convivialité à la Maison RêVée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" ref={reveal}>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">8</div>
              <div className="text-gray-600 font-semibold">Équipes</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">100%</div>
              <div className="text-gray-600 font-semibold">Féminin</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">2</div>
              <div className="text-gray-600 font-semibold">Jours</div>
            </div>
            <div className="p-6">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">1</div>
              <div className="text-gray-600 font-semibold">Ambiance 🎸</div>
            </div>
          </div>
        </div>
      </section>

      {/* Prochaine édition */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center" ref={reveal}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              Rendez-vous en 2026 !
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Marine et toute l'équipe des Aigles de Bègles vous donnent rendez-vous 
              l'année prochaine pour la prochaine édition des Harpies.
            </p>
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg shadow-xl">
              <p className="text-2xl font-bold mb-4">À l'année prochaine, chères Harpies !! 🦅</p>
              <p className="text-lg">
                Pour plus d'informations et pour vous inscrire à la prochaine édition, 
                contactez-nous via notre page de contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lien Blog */}
      <section className="py-12 bg-gray-50">
        <div className="container text-center">
          <p className="text-gray-600 mb-4">
            Pour plus de photos et détails sur l'édition 2025, consultez notre blog
          </p>
          <a 
            href="https://ultimatebegles.blogspot.com/2025/03/resultats-et-quelques-photos-du-tournoi.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition"
          >
            Voir l'article complet sur le blog
            <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Harpies;
