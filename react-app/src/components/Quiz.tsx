import React, { useState, useEffect } from 'react';
import { quizQuestions, type Question } from '../data/quizQuestions';

const Quiz: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const startQuiz = () => {
    // Sélectionner 10 questions aléatoires
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setCurrentQuestions(shuffled.slice(0, 10));
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredQuestions(new Array(10).fill(false));
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };

  const validateAnswer = () => {
    if (selectedAnswer === null) return;

    setShowExplanation(true);
    if (selectedAnswer === currentQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestion] = true;
    setAnsweredQuestions(newAnswered);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const isQuizComplete = () => {
    return currentQuestion === currentQuestions.length - 1 && showExplanation;
  };

  const openReportModal = () => {
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportMessage('');
  };

  const handleReportSubmit = async () => {
    if (!reportMessage.trim()) return;
    
    const question = currentQuestions[currentQuestion];
    const correctAnswerLetter = String.fromCharCode(65 + question.correctAnswer);
    
    // Construction du message pour Zulip
    let message = `---\n`;
    message += `**Signalement d'erreur - Quiz Question ${currentQuestion + 1}/${currentQuestions.length}**\n`;
    message += `**ID de la question :** ${question.id}\n\n`;
    message += `**Question :**\n${question.question}\n\n`;
    message += `**Réponses proposées :**\n`;
    message += `A. ${question.options[0]}\n`;
    message += `B. ${question.options[1]}\n`;
    message += `C. ${question.options[2]}\n`;
    message += `D. ${question.options[3]}\n\n`;
    message += `**Réponse correcte indiquée :**\n${correctAnswerLetter}. ${question.options[question.correctAnswer]}\n\n`;
    message += `**Explication :**\n${question.explanation}\n\n`;
    message += `**--- Aidez-nous à corriger cette question ---**\n${reportMessage}\n`;
    message += `---`;
    
    try {
      const response = await fetch('https://ultimatebegles.zulipchat.com/api/v1/messages', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa('website-contact-bot@ultimatebegles.zulipchat.com:sUcfv8gYdGbi9Uiv9uUg3sTKatwFwadk'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          type: 'stream',
          to: 'Boite de réception',
          topic: 'Signalement quiz',
          content: message
        })
      });

      if (response.ok) {
        closeReportModal();
        setShowSuccessNotification(true);
        setTimeout(() => setShowSuccessNotification(false), 3000);
      } else {
        alert('Erreur lors de l\'envoi du signalement. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Erreur lors de l\'envoi du signalement. Veuillez réessayer.');
    }
  };

  // Update document title and meta description based on quiz state
  useEffect(() => {
    if (!quizStarted) {
      document.title = 'Quiz Ultimate Frisbee - Testez vos connaissances | Les Aigles de Bègles';
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Quiz interactif sur l\'Ultimate Frisbee ! Testez vos connaissances avec 10 questions sur les règles, techniques et culture de ce sport. Idéal pour débutants et joueurs confirmés.');
      }
    } else if (isQuizComplete()) {
      document.title = 'Résultats du Quiz - Les Aigles de Bègles';
    } else {
      document.title = `Quiz Question ${currentQuestion + 1}/10 - Les Aigles de Bègles`;
    }
  }, [quizStarted, currentQuestion, showExplanation]);

  if (!quizStarted) {
    return (
      <section id="quiz" className="py-16 bg-gradient-to-br from-primary to-blue-600 relative overflow-hidden">
        {/* Disque en arrière-plan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 md:w-[500px] md:h-[500px] opacity-15">
          <div 
            className="w-full h-full bg-white rounded-full flex items-center justify-center"
            style={{
              boxShadow: '0 20px 60px rgba(0,0,0,0.2), inset 0 0 30px rgba(0,0,0,0.05)',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.1), transparent 50%), white'
            }}
          >
            <img 
              src="/images/logo_aigles_2025.png" 
              alt="Logo Aigles de Bègles" 
              className="w-2/3 h-auto object-contain relative z-10"
            />
          </div>
        </div>

        {/* Schema.org structured data for Quiz */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": "Quiz Ultimate Frisbee - Les Aigles de Bègles",
            "description": "Testez vos connaissances sur l'Ultimate Frisbee avec ce quiz interactif de 10 questions. Apprenez les règles, techniques et culture de ce sport.",
            "educationalLevel": "Débutant à Confirmé",
            "inLanguage": "fr",
            "about": {
              "@type": "Thing",
              "name": "Ultimate Frisbee"
            },
            "publisher": {
              "@type": "SportsOrganization",
              "name": "Les Aigles de Bègles",
              "url": "https://ultimatebegles.fr"
            },
            "hasPart": quizQuestions.slice(0, 10).map((q, index) => ({
              "@type": "Question",
              "position": index + 1,
              "text": q.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": q.options[q.correctAnswer]
              }
            }))
          })}
        </script>
        
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white relative z-10">
            <div className="mb-8">
              <i className="fas fa-question-circle text-6xl mb-4 opacity-90"></i>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Quiz Ultimate Frisbee 🥏
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Testez vos connaissances sur l'Ultimate !
            </p>
            <div className="backdrop-blur-sm rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Comment ça marche ?</h2>
              <ul className="text-left space-y-3 text-lg">
                <li className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-3 text-green-300"></i>
                  <span>10 questions aléatoires sur l'Ultimate</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-3 text-green-300"></i>
                  <span>Choix multiples avec explications détaillées</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-3 text-green-300"></i>
                  <span>Découvrez votre score à la fin</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-3 text-green-300"></i>
                  <span>Rejouez autant de fois que vous voulez !</span>
                </li>
              </ul>
            </div>
            <button
              onClick={startQuiz}
              className="bg-secondary hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-lg text-xl shadow-lg transform transition hover:scale-105"
            >
              <i className="fas fa-play mr-3"></i>
              Démarrer le Quiz
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (isQuizComplete()) {
    const percentage = (score / currentQuestions.length) * 100;
    let message = "";
    let emoji = "";
    
    if (percentage === 100) {
      message = "Parfait ! Vous êtes un expert de l'Ultimate ! 🏆";
      emoji = "🌟";
    } else if (percentage >= 80) {
      message = "Excellent ! Vous maîtrisez bien l'Ultimate !";
      emoji = "🎉";
    } else if (percentage >= 60) {
      message = "Bien joué ! Vous avez de bonnes bases.";
      emoji = "👍";
    } else if (percentage >= 40) {
      message = "Pas mal ! Continuez à apprendre.";
      emoji = "💪";
    } else {
      message = "Venez nous voir à l'entraînement pour progresser !";
      emoji = "🥏";
    }

    return (
      <section id="quiz-results" className="py-16 bg-gradient-to-br from-primary to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <div className="mb-8">
              <div className="text-8xl mb-4">{emoji}</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Quiz Terminé !
            </h1>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 mb-8">
              <div className="text-6xl font-bold mb-4">
                {score}/{currentQuestions.length}
              </div>
              <div className="text-2xl mb-4">{percentage.toFixed(0)}%</div>
              <p className="text-xl">{message}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startQuiz}
                className="bg-secondary hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform transition hover:scale-105"
              >
                <i className="fas fa-redo mr-3"></i>
                Rejouer
              </button>
              <a
                href="/#entrainements"
                className="bg-white hover:bg-gray-100 text-primary font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform transition hover:scale-105"
              >
                <i className="fas fa-running mr-3"></i>
                Voir les entraînements
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const question = currentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

  return (
    <section id="quiz-question" className="py-8 md:py-12 bg-gradient-to-br from-primary to-blue-600 min-h-screen flex items-start pt-20">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold text-sm md:text-base">Question {currentQuestion + 1}/{currentQuestions.length}</span>
              <span className="text-white font-semibold text-sm md:text-base">Score: {score}/{currentQuestions.length}</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div
                className="bg-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 relative">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
              {question.question}
            </h2>

            {/* Options - Grid Layout 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showResult = showExplanation;

                let buttonClass = "w-full p-3 md:p-4 text-left rounded-lg border-2 transition-all min-h-[60px] flex items-center ";
                
                if (!showResult) {
                  buttonClass += isSelected
                    ? "border-secondary bg-orange-50 text-primary font-semibold"
                    : "border-gray-300 hover:border-secondary hover:bg-orange-50";
                } else {
                  if (isCorrect) {
                    buttonClass += "border-green-500 bg-green-50 text-green-800 font-semibold";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "border-red-500 bg-red-50 text-red-800 font-semibold";
                  } else {
                    buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={buttonClass}
                  >
                    <div className="flex items-center w-full">
                      <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center mr-3">
                        {showResult && isCorrect && <i className="fas fa-check text-green-600 text-sm"></i>}
                        {showResult && isSelected && !isCorrect && <i className="fas fa-times text-red-600 text-sm"></i>}
                        {!showResult && <span className="font-bold text-sm">{String.fromCharCode(65 + index)}</span>}
                      </span>
                      <span className="text-sm md:text-base flex-1">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation - Compact */}
            {showExplanation && (
              <div className={`p-4 md:p-5 rounded-lg mb-4 ${
                selectedAnswer === question.correctAnswer
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-blue-50 border-2 border-blue-500'
              }`}>
                <div className="flex items-start">
                  <i className={`fas ${
                    selectedAnswer === question.correctAnswer ? 'fa-check-circle text-green-600' : 'fa-info-circle text-blue-600'
                  } text-xl mr-3 mt-0.5 flex-shrink-0`}></i>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">
                      {selectedAnswer === question.correctAnswer ? 'Bonne réponse !' : 'Explication'}
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between">
              {!showExplanation ? (
                <button
                  onClick={validateAnswer}
                  disabled={selectedAnswer === null}
                  className={`flex-1 py-3 md:py-4 px-6 md:px-8 rounded-lg font-bold text-base md:text-lg transition ${
                    selectedAnswer !== null
                      ? 'bg-secondary hover:bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <i className="fas fa-check mr-2"></i>
                  Valider
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-lg shadow-lg transition"
                >
                  Question suivante
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              )}
            </div>

            {/* Bouton Signaler une erreur */}
            {quizStarted && !isQuizComplete() && (
              <button
                onClick={openReportModal}
                className="absolute -bottom-12 left-0 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg text-sm font-semibold transition z-10 flex items-center gap-2"
              >
                <i className="fas fa-flag"></i>
                Signaler une erreur
              </button>
            )}
          </div>
        </div>

        {/* Notification de succès */}
        {showSuccessNotification && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-slide-in flex items-center gap-3">
            <i className="fas fa-check-circle text-2xl"></i>
            <div>
              <p className="font-semibold">Signalement envoyé !</p>
              <p className="text-sm">Merci pour votre contribution.</p>
            </div>
          </div>
        )}

        {/* Modal de signalement */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-primary">
                    <i className="fas fa-flag mr-2"></i>
                    Signaler une erreur
                  </h3>
                  <button
                    onClick={closeReportModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold mb-2">Question concernée :</h4>
                  <p className="text-gray-700 mb-3">{currentQuestions[currentQuestion].question}</p>
                  
                  <h4 className="font-bold mb-2">Réponses proposées :</h4>
                  <ul className="space-y-1 mb-3">
                    {currentQuestions[currentQuestion].options.map((opt, idx) => (
                      <li key={idx} className="text-gray-700">
                        <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span> {opt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <label className="block font-bold mb-2 text-gray-700">
                    Aidez-nous à corriger cette question :
                  </label>
                  <textarea
                    value={reportMessage}
                    onChange={(e) => setReportMessage(e.target.value)}
                    placeholder="Décrivez l'erreur que vous avez trouvée (réponse incorrecte, formulation ambiguë, etc.)"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none min-h-[120px]"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleReportSubmit}
                    disabled={!reportMessage.trim()}
                    className={`flex-1 py-3 px-6 rounded-lg font-bold transition ${
                      reportMessage.trim()
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    Envoyer le signalement
                  </button>
                  <button
                    onClick={closeReportModal}
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg font-bold hover:bg-gray-100 transition"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Quiz;
