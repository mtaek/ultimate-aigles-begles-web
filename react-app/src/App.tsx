import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Club from './components/Club';
import Ultimate from './components/Ultimate';
import Terrains from './components/Terrains';
import Entrainements from './components/Entrainements';
import Calendrier from './components/Calendrier';
import Avis from './components/Avis';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Palmares from './components/Palmares';
import Harpies from './components/Harpies';
import NotFound from './components/NotFound';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useReveal } from './hooks/useReveal';

const ScrollToHashElement = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
};

const UpdateHashOnScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Ne mettre à jour le hash que sur la page d'accueil
    if (location.pathname !== '/') return;

    const sections = document.querySelectorAll('section[id]');
    let isScrolling: number;
    
    const updateHash = () => {
      // Trouver la section la plus proche du haut de la fenêtre
      let currentSection = '';
      const scrollPosition = window.scrollY + 100; // Offset pour le header

      sections.forEach((section) => {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = htmlSection.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = htmlSection.getAttribute('id') || '';
        }
      });

      // Mettre à jour le hash si nécessaire
      if (currentSection && window.location.hash !== `#${currentSection}`) {
        window.history.replaceState(null, '', `#${currentSection}`);
      }
    };

    const handleScroll = () => {
      // Debounce pour éviter trop d'appels
      window.clearTimeout(isScrolling);
      isScrolling = window.setTimeout(updateHash, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Mise à jour initiale
    updateHash();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(isScrolling);
    };
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  useReveal();
  return (
    <BrowserRouter>
      <ScrollToHashElement />
      <UpdateHashOnScroll />
      <Header />
      <Routes>
        <Route path="/" element={<>
          <Hero />
          <Club />
          <Ultimate />
          <Terrains />
          <Entrainements />
          <Calendrier />
          <Contact />
          <Avis />
        </>} />
        <Route path="/palmares" element={<Palmares />} />
        <Route path="/harpies" element={<Harpies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
