import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

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
            <img src="/images/logo_aigles_2025.png" alt="Logo Les Aigles de Bègles" className="w-12" />
          </a>
        </div>
        <nav className="flex items-center gap-4">
          <ul className={`md:flex gap-6 font-semibold items-center ${open ? 'flex flex-col absolute left-0 top-16 bg-white w-full p-6 shadow' : 'hidden'}`}>
            <li><a href="/#club" onClick={(e) => smoothScroll(e, '#club')} className="hover:text-primary">Le Club</a></li>
            <li><a href="/#ultimate" onClick={(e) => smoothScroll(e, '#ultimate')} className="hover:text-primary">L'Ultimate</a></li>
            <li><a href="/#terrains" onClick={(e) => smoothScroll(e, '#terrains')} className="hover:text-primary">Terrains</a></li>
            <li><a href="/#entrainements" onClick={(e) => smoothScroll(e, '#entrainements')} className="hover:text-primary">Entraînements</a></li>
            <li><a href="/#calendrier" onClick={(e) => smoothScroll(e, '#calendrier')} className="hover:text-primary">Calendrier</a></li>
            {/*<li>
              <NavLink to="/palmares" className={({isActive}) => `hover:text-primary ${isActive ? 'text-primary underline' : ''}`}>Palmarès</NavLink>
            </li>
            <li>
              <NavLink to="/harpies" className={({isActive}) => `text-secondary hover:text-primary ${isActive ? 'underline' : ''}`}>Harpies</NavLink>
            </li>*/}
            <li><a href="/#contact" onClick={(e) => smoothScroll(e, '#contact')} className="hover:text-primary">Contact</a></li>
            <li><a href="https://ultimatebegles.blogspot.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Blog <i className="fas fa-external-link-alt external-icon" /></a></li>
          </ul>
          <div className="burger md:hidden" onClick={() => setOpen(o => !o)}>
            <i className="fas fa-bars"></i>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
