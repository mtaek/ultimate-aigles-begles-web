import React from 'react';
import { Link } from 'react-router-dom';

const QuizPreview: React.FC = () => {
  return (
    <section id="quiz" className="section bg-orange-50" data-reveal>
      <div className="container">
        <div className="section-header mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary relative inline-block">
            Testez vos connaissances
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-secondary"></span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
          {/* Partie gauche - Image avec effet disc */}
          <div className="flex justify-center items-center order-1 md:order-2">
            <div className="relative w-80 h-80 bg-white rounded-full shadow-2xl flex items-center justify-center" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2), inset 0 0 30px rgba(0,0,0,0.05)' }}>
              {/* Effet de relief du frisbee */}
              <div className="absolute inset-0 rounded-full" style={{ 
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.1), transparent 50%)'
              }}></div>
              <img 
                src="/images/quiz-section.png" 
                alt="Quiz Ultimate Frisbee" 
                className="w-56 h-auto object-contain relative z-10"
                loading="lazy"
              />
            </div>
          </div>

          {/* Partie droite - Contenu */}
          <div className="order-2 md:order-1">
            <p className="text-gray-700 mb-8">
              Pensez-vous bien connaître l'Ultimate Frisbee ? Testez vos connaissances avec notre quiz interactif de 10 questions et obtenez votre score avec des explications détaillées !
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
                <div className="text-3xl text-orange-500 flex-shrink-0">
                  <i className="fas fa-question-circle"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">10 Questions</h3>
                  <p className="text-gray-600 text-sm">Sélectionnées aléatoirement</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
                <div className="text-3xl text-blue-500 flex-shrink-0">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">~3 Minutes</h3>
                  <p className="text-gray-600 text-sm">Durée estimée</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
                <div className="text-3xl text-green-500 flex-shrink-0">
                  <i className="fas fa-trophy"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Score & Explications</h3>
                  <p className="text-gray-600 text-sm">Apprenez de vos erreurs</p>
                </div>
              </div>
            </div>

            <Link
              to="/quiz"
              className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-play-circle mr-2"></i>
              Commencer le Quiz 🥏
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizPreview;
