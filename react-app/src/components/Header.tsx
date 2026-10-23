import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Logo : retour en haut de l'accueil, adresse « / » sans #accueil
  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash || window.location.search) {
        window.history.replaceState(window.history.state, '', '/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <a href="/" onClick={goHome} className="cursor-pointer">
            <img src="/images/logo_aigles_2025.png" alt="Logo Les Aigles de Bègles" className="w-12" loading="eager" />
          </a>
        </div>
        <nav className="flex items-center gap-4">
          <ul className={`font-semibold items-center ${open ? 'flex flex-col fixed inset-0 top-16 bg-white/80 backdrop-blur-sm w-screen h-screen p-8 shadow z-50 gap-6 text-xl sm:text-2xl justify-start' : 'hidden min-[1000px]:flex gap-3 xl:gap-6 text-xs min-[1000px]:text-sm xl:text-base'}`}>
            <li><Link to="/bab-hat" onClick={() => setOpen(false)} className="text-secondary hover:text-primary whitespace-nowrap">Bab'Hat</Link></li>
            <li><a href="https://www.helloasso.com/associations/ultimate-begles/boutiques/boutique-des-aigles-de-begles" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary whitespace-nowrap">Boutique <i className="fas fa-external-link-alt external-icon" /></a></li>
            <li><a href="https://ultimatebegles.blogspot.com/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary whitespace-nowrap">Blog <i className="fas fa-external-link-alt external-icon" /></a></li>
          </ul>
          <div className="burger min-[1000px]:hidden" onClick={() => setOpen(o => !o)}>
            <i className="fas fa-bars"></i>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
