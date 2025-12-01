import React, { useState } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setOpen(false);
    
    // Si on est déjà sur la page d'accueil
    if (location.pathname === '/') {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Si on est sur une autre page, naviguer vers l'accueil avec le hash
      navigate('/' + targetId);
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <a href="/#accueil" onClick={(e) => smoothScroll(e, '#accueil')} className="cursor-pointer">
            <img src="/images/logo_aigles_2025.png" alt="Logo Les Aigles de Bègles" className="w-12" loading="eager" />
          </a>
        </div>
        <nav className="flex items-center gap-4">
          <ul className={`font-semibold items-center ${open ? 'flex flex-col fixed inset-0 top-16 bg-white/80 backdrop-blur-sm w-screen h-screen p-8 shadow z-50 gap-6 text-xl sm:text-2xl justify-start' : 'hidden min-[1000px]:flex gap-3 xl:gap-6 text-xs min-[1000px]:text-sm xl:text-base'}`}>
            <li><a href="/#club" onClick={(e) => smoothScroll(e, '#club')} className="hover:text-primary whitespace-nowrap">Le Club</a></li>
            <li><a href="/#ultimate" onClick={(e) => smoothScroll(e, '#ultimate')} className="hover:text-primary whitespace-nowrap">L'Ultimate</a></li>
            <li><a href="/#entrainements" onClick={(e) => smoothScroll(e, '#entrainements')} className="hover:text-primary whitespace-nowrap">Entraînements</a></li>
            <li>
              <NavLink to="/palmares" onClick={() => setOpen(false)} className={({isActive}) => `hover:text-primary whitespace-nowrap ${isActive ? 'text-primary' : ''}`}>Palmarès</NavLink>
            </li>
            <li>
              <NavLink to="/quiz" onClick={() => setOpen(false)} className={({isActive}) => `px-3 py-1.5 rounded-md transition whitespace-nowrap ${isActive ? 'bg-secondary text-white' : 'bg-orange-100 text-secondary hover:bg-secondary hover:text-white'}`}>Quiz 🥏</NavLink>
            </li>
            <li><a href="/#harpies" onClick={(e) => smoothScroll(e, '#harpies')} className="text-purple-600 hover:text-purple-700 whitespace-nowrap">Les Harpies</a></li>
            <li><a href="/#contact" onClick={(e) => smoothScroll(e, '#contact')} className="hover:text-primary whitespace-nowrap">Contact</a></li>
            <li><a href="/#actualites" onClick={(e) => smoothScroll(e, '#actualites')} className="hover:text-primary whitespace-nowrap">Actualités</a></li>
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
