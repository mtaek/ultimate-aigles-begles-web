import React, { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {

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
      answer: "Pour débuter, il vous suffit d'une tenue de sport confortable et de chaussures adaptées (crampons pour l'outdoor/extérieur, chaussures indoor/intérieur pour la salle). Le club fournit les frisbees pour les entraînements."
    },
    {
      question: "Combien coûte la licence ?",
      answer: "Le montant de la cotisation varie selon la catégorie d'âge et le type de licence. Contactez-nous via le formulaire pour obtenir les tarifs détaillés et les modalités d'inscription."
    },
    {
      question: "Participez-vous à des compétitions ?",
      answer: "Oui ! Le club participe à des compétitions régionales et nationales tout au long de la saison. Nous avons des équipes en championnat outdoor/extérieur, indoor/intérieur et beach/sable."
    },
    {
      question: "Qu'est-ce que le tournoi des Harpies ?",
      answer: "Les Harpies est notre tournoi annuel 100% féminin en salle. C'est un événement convivial qui rassemble les meilleures équipes féminines de la région. Plus d'infos dans la section dédiée."
    },
    {
      question: "Proposez-vous du Discgolf ?",
      answer: "Oui ! Le club propose également une section Discgolf en compétition. Le Discgolf est un sport de précision où l'on lance des disques vers des cibles (corbeilles) sur un parcours. Une licence compétition Discgolf est disponible."
    }
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getLinkForQuestion = (q: string): { href: string; label: string } | null => {
    const lower = q.toLowerCase();
    if (lower.includes('tarif') || lower.includes('licence')) {
      return { href: '/#tarifs', label: 'Voir les tarifs' };
    }
    if (lower.includes('horaire') || lower.includes("entraînement")) {
      return { href: '/#entrainements', label: 'Voir les entraînements' };
    }
    if (lower.includes('compétition')) {
      return { href: '/#calendrier', label: 'Voir le calendrier' };
    }
    if (lower.includes('harpies')) {
      return { href: '/#harpies', label: 'Découvrir les Harpies' };
    }
    return null;
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
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqItems.map((item, index) => {
            const more = getLinkForQuestion(item.question);
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-5 flex items-start gap-4 border-l-2 border-gray-200">
                <div className="text-primary mt-1">
                  {/* Mini frisbee disc icon (clearer shape) */}
                  <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <ellipse cx="12" cy="12" rx="9" ry="4.2" fill="currentColor" opacity="0.12" />
                    <ellipse cx="12" cy="12" rx="9" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <ellipse cx="12" cy="12" rx="6.5" ry="3" fill="white" />
                    <ellipse cx="12" cy="12" rx="6.5" ry="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5.8 11.2c1.8-1.4 4.3-2.2 6.2-2.2s4.4 0.8 6.2 2.2" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
                    <path d="M3.5 12h2.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
                    <path d="M18.3 12h2.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-700 mb-3">{item.answer}</p>
                  {more && (
                    <a href={more.href} className="text-primary font-semibold hover:text-secondary">
                      {more.label}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
