import React, { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Club from './components/Club';
import Ultimate from './components/Ultimate';
import Terrains from './components/Terrains';
import Entrainements from './components/Entrainements';
import Tarifs from './components/Tarifs';
import Calendrier from './components/Calendrier';
import HarpiesPreview from './components/HarpiesPreview';
import Avis from './components/Avis';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Actualites from './components/Actualites';
import Footer from './components/Footer';
import Quiz from './components/Quiz';
import NotFound from './components/NotFound';
import CookieConsent from './components/CookieConsent';
import type { CookieConsentHandle } from './components/CookieConsent';
import SectionNavigator from './components/SectionNavigator';
import UltiTimer from './components/UltiTimer';
import UltiTactics from './components/UltiTactics';
import BabHat from './components/BabHat';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useReveal } from './hooks/useReveal';

const ScrollToHashElement = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
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
  }, [pathname, hash]);

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

      // En haut de page (section « accueil ») : adresse propre, sans #accueil.
      // Plus bas : #club, #tarifs… pour pouvoir partager le lien d'une section.
      const targetHash = currentSection && currentSection !== 'accueil' ? `#${currentSection}` : '';
      if (window.location.hash !== targetHash) {
        const url = `${window.location.pathname}${window.location.search}${targetHash}`;
        window.history.replaceState(window.history.state, '', url);
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

const AppLayout: React.FC<{
  onOpenCookieSettings: () => void;
  cookieConsentRef: React.RefObject<CookieConsentHandle | null>;
}> = ({ onOpenCookieSettings, cookieConsentRef }) => {
  return (
    <>
      <ScrollToHashElement />
      <UpdateHashOnScroll />
      <Header />
      <SectionNavigator />
      <Routes>
        <Route path="/" element={<>
          <Hero />
          <Club />
          <Ultimate />
          <Terrains />
          <Entrainements />
          <Tarifs />
          <Calendrier />
          <HarpiesPreview />
          <Avis />
          <Contact />
          <Actualites />
          <FAQ />
        </>} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/bab-hat" element={<BabHat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer onOpenCookieSettings={onOpenCookieSettings} />
      <CookieConsent ref={cookieConsentRef} />
    </>
  );
};

const App: React.FC = () => {
  useReveal();
  const cookieConsentRef = useRef<CookieConsentHandle>(null);

  const handleOpenCookieSettings = () => {
    cookieConsentRef.current?.openSettings();
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ultitimer/*" element={<UltiTimer />} />
        <Route path="/ulti-tactics/*" element={<UltiTactics />} />
        <Route
          path="/*"
          element={
            <AppLayout
              onOpenCookieSettings={handleOpenCookieSettings}
              cookieConsentRef={cookieConsentRef}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
