import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "Qu'est-ce que l'Ultimate Frisbee ?",
      answer: "L'Ultimate est un sport collectif qui se joue avec un frisbee. Deux équipes de 7 joueurs s'affrontent sur un terrain rectangulaire avec des zones d'en-but. L'objectif est de marquer des points en réceptionnant le disque dans la zone adverse."
    },
    {
      question: "Faut-il avoir de l'expérience pour rejoindre le club ?",
      answer: "Absolument pas ! Nous accueillons tous les niveaux, du débutant complet au joueur confirmé. Nos entraîneurs adaptent les séances pour permettre à chacun de progresser à son rythme."
    },
    {
      question: "Quels sont les horaires d'entraînement ?",
      answer: "Les entraînements ont lieu plusieurs fois par semaine sur différents créneaux. Consultez la section 'Entraînements' pour connaître les horaires détaillés selon les catégories (junior, senior open, mixte, féminin)."
    },
    {
      question: "Quel équipement faut-il pour commencer ?",
      answer: "Pour débuter, il vous suffit d'une tenue de sport confortable et de chaussures adaptées (crampons pour l'outdoor, chaussures indoor pour la salle). Le club fournit les frisbees pour les entraînements."
    },
    {
      question: "Combien coûte la licence ?",
      answer: "Le montant de la cotisation varie selon la catégorie d'âge et le type de licence. Contactez-nous via le formulaire pour obtenir les tarifs détaillés et les modalités d'inscription."
    },
    {
      question: "Participez-vous à des compétitions ?",
      answer: "Oui ! Le club participe à des compétitions régionales et nationales tout au long de la saison. Nous avons des équipes en championnat outdoor, indoor et beach. Consultez notre palmarès pour voir nos résultats."
    },
    {
      question: "Qu'est-ce que le tournoi des Harpies ?",
      answer: "Les Harpies est notre tournoi annuel 100% féminin en salle. C'est un événement convivial qui rassemble les meilleures équipes féminines de la région. Plus d'infos dans la section dédiée."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section" data-reveal>
      <div className="container">
        <div className="section-header mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary relative inline-block">
            Questions Fréquentes
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-secondary"></span>
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
                <i className={`fas fa-chevron-${openIndex === index ? 'up' : 'down'} text-primary flex-shrink-0`}></i>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="p-6 pt-0 text-gray-700 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
