import React, { useEffect } from 'react';

/*
 * L'outil Ulti-Tactics est une page autonome (react-app/ulti-tactics/), servie sur /ulti-tactics/.
 * Cette route React couvre les navigations internes ou l'URL sans « / » final :
 * on recharge la vraie page de l'outil en conservant les paramètres (?play=...).
 */
const UltiTactics: React.FC = () => {
  useEffect(() => {
    window.location.replace(`/ulti-tactics/${window.location.search}${window.location.hash}`);
  }, []);

  return (
    <div className="flex items-center justify-center h-dvh bg-gray-50 text-gray-600">
      Chargement d’Ulti-Tactics…
    </div>
  );
};

export default UltiTactics;
