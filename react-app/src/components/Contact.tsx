import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'ultimate.begles@gmail.com';

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Afficher l'email de manière obfusquée pour les robots
  const displayEmail = () => {
    const parts = email.split('@');
    return (
      <>
        {parts[0]}
        <span style={{ display: 'none' }}>null</span>
        @
        <span style={{ display: 'none' }}>null</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section id="contact" className="section bg-gray-50" data-reveal>
      <div className="container">
        <h2 className="text-3xl font-bold mb-6 text-center text-secondary">Restons en contact</h2>
        
        <div className="max-w-5xl mx-auto">
          <p className="text-gray-600 mb-8 text-lg leading-relaxed text-center">
            Vous avez une question, une demande d'information ou envie de nous rejoindre ?<br />
            Voici comment nous contacter :
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                <i className="fas fa-envelope text-white text-2xl"></i>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800 text-lg mb-2">Email</div>
                <a href="#" onClick={copyEmail} className="text-blue-500 text-sm hover:underline cursor-pointer">
                  {copied ? 'Email copié !' : displayEmail()}
                </a>
              </div>
            </div>

            {/* Facebook */}
            <a 
              href="https://www.facebook.com/aiglesdebegles" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition hover:shadow-xl hover:-translate-y-1 text-inherit no-underline"
            >
              <div className="w-16 h-16 rounded-full bg-[#4267B2] flex items-center justify-center mb-4">
                <i className="fab fa-facebook-f text-white text-2xl"></i>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800 text-lg mb-2">Facebook</div>
                <div className="text-gray-600 text-sm">/aiglesdebegles</div>
              </div>
            </a>

            {/* Instagram */}
            <a 
              href="https://www.instagram.com/aigles_de_begles/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transition hover:shadow-xl hover:-translate-y-1 text-inherit no-underline"
            >
              <div className="w-16 h-16 rounded-full bg-[#E4405F] flex items-center justify-center mb-4">
                <i className="fab fa-instagram text-white text-2xl"></i>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800 text-lg mb-2">Instagram</div>
                <div className="text-gray-600 text-sm">@aigles_de_begles</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
