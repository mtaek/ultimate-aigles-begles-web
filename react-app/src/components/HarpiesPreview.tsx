import React from 'react';

const HarpiesPreview: React.FC = () => {
  return (
    <section id="harpies" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Logo à gauche */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80 bg-white rounded-full shadow-2xl flex items-center justify-center" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2), inset 0 0 30px rgba(0,0,0,0.05)' }}>
                {/* Effet de relief du frisbee */}
                <div className="absolute inset-0 rounded-full" style={{ 
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.1), transparent 50%)'
                }}></div>
                <img 
                  src="/images/harpies.png" 
                  alt="Logo Les Harpies" 
                  className="w-56 h-auto object-contain relative z-10"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Présentation à droite */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4 text-purple-600">
                Les Harpies
              </h2>
              
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Tournoi annuel d'ultimate <strong>100% féminin</strong> en salle organisé par les Aigles de Bègles. 
                Un événement convivial et compétitif qui rassemble les meilleures équipes féminines.
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-white px-6 py-3 rounded-lg shadow-md">
                  <span className="text-purple-600 font-semibold">Indoor/Intérieur</span>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg shadow-md">
                  <span className="text-purple-600 font-semibold">100% Féminin</span>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg shadow-md">
                  <span className="text-purple-600 font-semibold">8 Équipes</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Boutons en dessous */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a 
              href="https://www.helloasso.com/associations/ultimate-begles/evenements/tournoi-des-harpies-2026-1" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Inscrivez-vous
            </a>
            <a 
              href="https://ultimatebegles.blogspot.com/2025/03/resultats-et-quelques-photos-du-tournoi.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Voir l'article sur notre Blog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HarpiesPreview;
