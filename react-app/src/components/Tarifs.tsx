import React, { useState } from 'react';

const Tarifs: React.FC = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0 = Janvier, 8 = Septembre
  const startYear = currentMonth >= 8 ? currentYear : currentYear - 1;
  const seasonLabel = `${startYear}-${startYear + 1}`;
  const rows = [
    { categorie: 'Adulte', type: 'Compétition', total: 121.5 },
    { categorie: 'Adulte', type: 'Loisir', total: 97.5 },
    { categorie: 'U17/U20', type: 'Compétition', total: 111.5 },
    { categorie: 'U17/U20', type: 'Loisir', total: 97.5 },
    { categorie: 'U10/U13/U15', type: 'Compét/Loisir', total: 96.5 },
    { categorie: 'Discgolf', type: 'Compétition', total: 60 },
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
            {rows.map((r) => (
                <div key={`${r.categorie}-${r.type}`} className="border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                  <div className="flex items-center">
                    <span className="text-primary font-semibold flex-1 text-sm md:text-base">{r.categorie}</span>
                    <span className="text-black font-bold text-sm md:text-base text-center flex-1">{r.type}</span>
                    <span className="text-secondary font-bold text-base md:text-lg text-right flex-1">{r.total.toFixed(2).replace('.', ',')}€</span>
                  </div>
                </div>
            ))}
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
              <h4 className="font-bold mb-2">Championnats</h4>
              <p className="text-gray-700">Les frais de déplacement/hébergement ne sont pas inclus, mais l'association finance une partie de ces coûts.</p>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsRegistrationOpen((prev) => !prev)}
              aria-expanded={isRegistrationOpen}
              className="w-full flex items-center justify-between bg-secondary hover:bg-orange-600 text-white px-5 py-3 rounded-lg text-left"
            >
              <span className="inline-flex items-center font-semibold">
                <i className="fas fa-info-circle mr-2"></i>
                Étapes d'inscription
              </span>
              <i className={`fas fa-chevron-down transition-transform ${isRegistrationOpen ? 'rotate-180' : ''}`} />
            </button>

            {isRegistrationOpen && (
              <div className="pt-5 md:pt-6 space-y-6 bg-white">
                <div>
                  <h4 className="font-bold mb-2">1. Adhésion à Ultimate Bègles</h4>
                  <p className="text-gray-700 mb-2 text-justify">
                    Le formulaire d'inscription et le paiement de la cotisation se font directement sur l'Espace Licenciés de la Fédération Française de Flying Disc (pour les adhésions loisir et compétition) :{' '}
                    <a href="https://monespace.ff-flyingdisc.fr/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:text-secondary">
                      monespace.ff-flyingdisc.fr <i className="fas fa-external-link-alt external-icon" />
                    </a>
                  </p>
                  <p className="text-gray-700 mb-2 text-justify">
                    L'adhésion couvre la cotisation de la Fédération Française de Flying Disc, l'assurance et la cotisation de l'association Ultimate Bègles (voir le détail des tarifs ci-dessus). Un disque du club est offert à tout nouvel adhérent !
                  </p>
                  <p className="text-gray-700 mb-2 text-justify">
                    Les frais de transport et d'hébergement pour la participation aux championnats pendant la saison ne sont pas inclus dans l'adhésion, mais l'association finance une partie de ces coûts.
                  </p>
                  <p className="text-gray-700 text-justify">
                    Pour ceux qui souhaitent participer aux entraînements à Bègles mais prennent une licence dans un autre club, il est possible d'adhérer à l'association via HelloAsso :{' '}
                    <a href="https://www.helloasso.com/associations/ultimate-begles/adhesions/adhesion-2025-2026-pour-les-licencies-exterieurs" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:text-secondary">
                      Adhésion pour les licenciés extérieurs <i className="fas fa-external-link-alt external-icon" />
                    </a>
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">2. Documents médicaux à fournir</h4>
                  <p className="text-gray-700 mb-2 text-justify">
                    Un certificat médical de moins de 3 mois est à fournir à l'inscription pour :
                  </p>
                  <ul className="list-disc list-outside pl-5 text-gray-700 mb-2 space-y-1 text-justify">
                    <li>Toute première prise de licence d'un·e joueur·se majeur·e ;</li>
                    <li>Toute prise de licence après une interruption dans la continuité des renouvellements de licence ;</li>
                    <li>Toute prise de licence lors d'un changement de catégorie d'âge (Senior, Master, GM, GGM).</li>
                  </ul>
                  <p className="text-gray-700 mb-2 text-justify">
                    Nous conseillons de fournir à votre médecin le{' '}
                    <a href="https://drive.google.com/file/d/1s8_nRJz8NvvUgB2Y4BqpK-zWA7KuaJ_U/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:text-secondary">
                      modèle de certificat médical <i className="fas fa-external-link-alt external-icon" />
                    </a>.
                  </p>
                  <p className="text-gray-700 text-justify">
                    Le certificat doit comporter les mentions suivantes : « <strong>aucune contre-indication à la pratique du Flying Disc Ultimate</strong> », la case « <strong>en compétition</strong> » cochée, et pour les mineurs concernés, la mention « <strong>surclassement</strong> » ou « <strong>double surclassement</strong> ».
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">3. Autorisation parentale pour les mineurs</h4>
                  <p className="text-gray-700 text-justify">
                    Pour les mineurs, le formulaire d'autorisation parentale suivant est à compléter :{' '}
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeNKZIO3FSX-x4PyZlVUcvedqqqMn2t8K1UNrdCf7wypUK42w/viewform?usp=preview" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:text-secondary">
                      Autorisation parentale <i className="fas fa-external-link-alt external-icon" />
                    </a>
                  </p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">4. Rejoindre le club sur Zulip</h4>
                  <p className="text-gray-700 text-justify">
                    Zulip est notre outil de communication interne pour échanger avec les membres du club. Inscrivez-vous via le lien suivant :{' '}
                    <a href="https://ultimatebegles.zulipchat.com/register/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:text-secondary">
                      S'enregistrer sur Zulip <i className="fas fa-external-link-alt external-icon" />
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Tarifs;
