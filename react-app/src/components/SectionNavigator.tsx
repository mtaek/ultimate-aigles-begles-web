import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SectionNavigator: React.FC = () => {
  const [activeSection, setActiveSection] = useState('accueil');
  const location = useLocation();

  const sections = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'club', label: 'Le Club' },
    { id: 'ultimate', label: "L'Ultimate" },
    { id: 'terrains', label: 'Terrains' },
    { id: 'entrainements', label: 'Entraînements' },
    { id: 'tarifs', label: 'Tarifs' },
    { id: 'calendrier', label: 'Calendrier' },
    { id: 'harpies', label: 'Les Harpies' },
    { id: 'contact', label: 'Contact' },
    { id: 'avis', label: 'Avis' },
    { id: 'actualites', label: 'Actualités' },
    { id: 'faq', label: 'FAQ' }
  ];

  useEffect(() => {
    // Ne montrer le navigateur que sur la page d'accueil
    if (location.pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Trouve l'entrée la plus visible
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Prend celle avec le plus grand ratio d'intersection
          const mostVisible = visibleEntries.reduce((prev, current) => 
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: '-100px 0px -30% 0px'
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Ne pas afficher sur les autres pages
  if (location.pathname !== '/') return null;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="section-navigator">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`section-nav-dot ${activeSection === section.id ? 'active' : ''}`}
          aria-label={`Aller à ${section.label}`}
          title={section.label}
        >
          <span className="section-nav-label">{section.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default SectionNavigator;
