import React from 'react';

const UltiTimer: React.FC = () => {
  return (
    <div className="flex flex-col h-dvh bg-gray-950">
      {/* Barre de navigation */}
      <div className="flex items-center px-4 py-1.5 bg-blue-500 shadow-md shrink-0">
        <a
          href="https://ultimatebegles.fr/"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-colors duration-200"
          aria-label="Retour sur ultimatebegles.fr"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <img src="/images/logo_aigles_2025.png" alt="Aigles de Bègles" className="h-5 w-auto" />
          ultimatebegles.fr
        </a>
      </div>

      {/* Iframe UltiTimer */}
      <div className="flex-1 min-h-0 w-full">
        <iframe
          src="https://ultitimer.akaria.fr/"
          title="UltiTimer"
          className="w-full h-full border-0"
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default UltiTimer;
