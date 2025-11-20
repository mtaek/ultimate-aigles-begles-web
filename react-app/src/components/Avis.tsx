import React, { useState, useEffect } from 'react';

const reviews = [
  { 
    text: '"Super sport, ancienne basketteuse, j\'apprécie le côté cardio et mixte! Très bon accueil, club dynamique avec des organisations d\'évènements réguliers. Facilement accessible de Bordeaux ou de la CUB."', 
    author: 'Marine R.', 
    date: 'Septembre 2025' 
  },
  { 
    text: '"Pour faire de l\'Ultimate à Bordeaux et dans ses alentours, c\'est le club parfait ! Tous les niveaux peuvent jouer des juniors (10 ans) aux adultes en compétition ou en loisir. Ambiance trop cool !"', 
    author: 'Loïc F.', 
    date: 'Septembre 2025' 
  },
  { 
    text: '"Club fabuleux d\'un sport fabuleux qui conviendra aussi bien aux débutants qu\'aux plus confirmés, en mode loisir ou compétition, et pour toutes les tranches d\'âge !"', 
    author: 'Jérémie M.', 
    date: 'Octobre 2025' 
  },
  { 
    text: '"Super ambiance le lundi soir et les débutants sont toujours bien accueillis"', 
    author: 'Alice P.', 
    date: 'Octobre 2025' 
  },
  { 
    text: '"Une super ambiance dans ce club d\'ultimate frisbee de Bègles, idéal pour débuter dans ce sport ou se perfectionner ! On est très bien intégré, pour faire de la compétition comme pour une pratique plus récréative ! Les entrainements ont lieu toute l\'année sur terrain synthétique ou l\'été sur sable. C\'est un des rares sports où on peut jouer en catégorie mixte (hommes et femmes ensembles): moi j\'adore !"', 
    author: 'Lucille F.', 
    date: 'Novembre 2025' 
  },
];

const Avis: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Change d'avis toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="avis" className="section" data-reveal>
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center text-secondary">Pourquoi nous rejoindre ? Nos Aigles vous répondent !</h2>
        
        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Bouton Précédent */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
            aria-label="Avis précédent"
          >
            <i className="fas fa-chevron-left text-primary text-xl"></i>
          </button>

          {/* Avis */}
          <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 min-h-[300px] flex flex-col justify-center">
            <div className="review-stars text-yellow-500 mb-4 text-center text-2xl">★★★★★</div>
            <p className="italic text-lg md:text-xl mb-6 text-gray-700 text-center leading-relaxed">
              {reviews[currentIndex].text}
            </p>
            <p className="text-center font-semibold text-gray-800">
              – {reviews[currentIndex].author}, <span className="text-gray-500">{reviews[currentIndex].date}</span>
            </p>
          </div>

          {/* Bouton Suivant */}
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition"
            aria-label="Avis suivant"
          >
            <i className="fas fa-chevron-right text-primary text-xl"></i>
          </button>

          {/* Indicateurs */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-primary' : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller à l'avis ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Avis;
