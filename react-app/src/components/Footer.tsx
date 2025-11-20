import React from 'react';

const Footer: React.FC = () => (
  <footer>
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 footer-content">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/#accueil" className="cursor-pointer">
            <img src="/images/logo_aigles_2025.png" alt="Logo Les Aigles de Bègles" className="w-32 hover:opacity-80 transition" />
          </a>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-white mb-2">Navigation</h3>
          <div className="flex flex-wrap gap-4 footer-links text-sm">
            <a href="/#club">Le Club</a>
            <a href="/#ultimate">L'Ultimate</a>
            <a href="/#terrains">Terrains</a>
            <a href="/#entrainements">Entraînements</a>
            <a href="/#calendrier">Calendrier</a>
            {/*<a href="/palmares">Palmarès</a>*/}
            {/*<a href="/harpies">Harpies</a>*/}
            <a href="https://ultimatebegles.blogspot.com/" target="_blank" rel="noopener noreferrer">
              Blog <i className="fas fa-external-link-alt text-xs ml-1" />
            </a>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-white mb-2">Suivez-nous</h3>
          <div className="flex gap-4 text-2xl">
            <a href="https://www.facebook.com/aiglesdebegles" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/aigles_de_begles/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright et Partenaires */}
      <div className="mt-8 pt-8 border-t border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Les Aigles de Bègles - Club d'Ultimate Frisbee
          </p>
          
          {/* Partenaires */}
          <div className="flex flex-wrap items-center gap-6">
            <a href="https://www.zulip.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
              <img src="/images/partenaires/zulip.png" alt="Zulip" className="h-8 w-auto object-contain" />
            </a>
            <a href="https://www.gironde.fr/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
              <img src="/images/partenaires/logo-gironde.png" alt="Département de la Gironde" className="h-8 w-auto object-contain" />
            </a>
            <a href="https://www.begles.fr/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
              <img src="/images/partenaires/logo-ville-begles.jpg" alt="Ville de Bègles" className="h-8 w-auto object-contain" />
            </a>
            <a href="https://liguenouvelle-aquitaine.ffdisque.fr/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
              <img src="/images/partenaires/LFDNA.png" alt="Ligue Flying Disc de Nouvelle-Aquitaine" className="h-8 w-auto object-contain" />
            </a>
            <a href="https://www.ffdf.fr/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
              <img src="/images/partenaires/FFDF.png" alt="Fédération Flying Disc France" className="h-8 w-auto object-contain" />
            </a>
            <a href="https://www.creditmutuel.fr/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition">
              <img src="/images/partenaires/credit-mutuel-du-sud-ouest.jpg" alt="Crédit Mutuel du Sud-Ouest" className="h-8 w-auto object-contain" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
