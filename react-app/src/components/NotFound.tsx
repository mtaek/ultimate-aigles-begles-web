import React from 'react';
import { useSEO } from '../hooks/useSEO';

const NotFound: React.FC = () => {
  useSEO({
    title: 'Page introuvable - 404',
    description: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
  });

  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-primary to-secondary py-16 px-4 -mb-16">
      <div className="container max-w-2xl text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          {/* Logo */}
          <div>
            <img 
              src="/images/logo_aigles_2025.png" 
              alt="Logo Les Aigles de Bègles" 
              className="w-24 mx-auto opacity-50"
            />
          </div>

          {/* 404 */}
          <h1 className="text-9xl font-bold text-primary">404</h1>
          
          {/* Message */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Oups ! Page introuvable
          </h2>
          
          <p className="text-gray-600 mb-8 text-lg">
            Le disque est sorti des limites du terrain !<br />
            Cette page n'existe pas ou a été déplacée.
          </p>

          {/* Icône Frisbee */}
          <div className="text-6xl mb-8 animate-bounce">
            🥏
          </div>

        </div>
      </div>
    </section>
  );
};

export default NotFound;
