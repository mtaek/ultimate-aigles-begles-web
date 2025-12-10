import React from 'react';

const Tarifs: React.FC = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0 = Janvier, 8 = Septembre
  const startYear = currentMonth >= 8 ? currentYear : currentYear - 1;
  const seasonLabel = `${startYear}-${startYear + 1}`;
  const rows = [
    { categorie: 'Adulte', type: 'Compétition', fffd: 58, assurance: 4.5, association: 55 },
    { categorie: 'Adulte', type: 'Loisir', fffd: 38, assurance: 4.5, association: 55 },
    { categorie: 'U17/U20', type: 'Compétition', fffd: 48, assurance: 4.5, association: 55 },
    { categorie: 'U17/U20', type: 'Loisir', fffd: 38, assurance: 4.5, association: 55 },
    { categorie: 'U11/13/15', type: 'Compét/Loisir', fffd: 33, assurance: 4.5, association: 55 },
  ];

  return (
    <section id="tarifs" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white" data-reveal>
      <div className="container">
        <div className="max-w-5xl mx-auto">
        <div className="section-header mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary relative inline-block">
            Tarifs
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-secondary"></span>
          </h2>
          <p className="text-gray-600 mt-8">Saison {seasonLabel} — détails des cotisations</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Cards layout: one block per line (compact) */}
          <div className="grid grid-cols-1 gap-3">
            {rows.map((r) => {
              const total = r.fffd + r.assurance + r.association;
              return (
                <div key={`${r.categorie}-${r.type}`} className="border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                  <div className="flex items-center">
                    <span className="text-primary font-semibold flex-1 text-sm md:text-base">{r.categorie}</span>
                    <span className="text-black font-bold text-sm md:text-base text-center flex-1">{r.type}</span>
                    <span className="text-secondary font-bold text-base md:text-lg text-right flex-1">{total.toFixed(2).replace('.', ',')}€</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-bold mb-2">Paiement</h4>
              <p className="text-gray-700">Effectué via l'Espace Licenciés FFFD ou HelloAsso (pour licenciés extérieurs).</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-bold mb-2">Réductions</h4>
              <p className="text-gray-700">Un disque du club est offert aux nouveaux adhérents.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-bold mb-2">Tournois</h4>
              <p className="text-gray-700">Les frais de déplacement/hébergement ne sont pas inclus, mais l'association finance une partie de ces coûts.</p>
            </div>
          </div>
          <div className="mt-6">
            <a
              href="https://ultimatebegles.blogspot.com/p/sinscrire.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-secondary hover:bg-orange-600 text-white px-5 py-3 rounded-lg shadow-md"
            >
              <i className="fas fa-info-circle mr-2"></i>
              Plus d'infos sur l'inscription
              <i className="fas fa-external-link-alt external-icon ml-2" />
            </a>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Tarifs;
