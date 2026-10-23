import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

export interface CookieConsentHandle {
  openSettings: () => void;
}

const CookieConsent = forwardRef<CookieConsentHandle>((_props, ref) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useImperativeHandle(ref, () => ({
    openSettings: () => {
      setShowSettings(false);
      setShowBanner(true);
    }
  }));

  useEffect(() => {
    // Charge GoatCounter par défaut (pas de consentement nécessaire)
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    // Charge GoatCounter uniquement si consentement donné
    if (!(window as any).goatcounter) {
      const script = document.createElement('script');
      script.setAttribute('data-goatcounter', 'https://goatcounter.akaria.fr/count');
      script.src = '//goatcounter.akaria.fr/count.js';
      script.async = true;
      document.head.appendChild(script);
    }
  };

  const dismissBanner = () => {
    localStorage.setItem('cookieConsent', 'acknowledged');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="cookie-consent-overlay" />
      <div className="cookie-consent-banner">
        {!showSettings ? (
          <>
            <div className="cookie-consent-content">
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                <i className="fas fa-cookie-bite mr-2 text-secondary"></i>
                Respect de votre vie privée
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Nous utilisons des cookies essentiels (cache du blog) pour améliorer votre expérience.
                Notre analyse de trafic via GoatCounter ne nécessite pas de consentement.
              </p>
              <div className="cookie-consent-actions">
                <button
                  onClick={dismissBanner}
                  className="btn-accept"
                >
                  <i className="fas fa-check mr-2"></i>
                  Compris
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="cookie-consent-content">
              <button
                onClick={() => setShowSettings(false)}
                className="cookie-back-btn"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Retour
              </button>
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Paramètres des cookies
              </h3>
              
              <div className="cookie-category">
                <div className="cookie-category-header">
                  <div>
                    <h4 className="font-semibold text-gray-800">Cookies essentiels</h4>
                    <p className="text-sm text-gray-600">Cache local des articles du blog</p>
                  </div>
                  <div className="cookie-toggle cookie-toggle-disabled">
                    <span className="text-sm text-gray-500">Toujours actif</span>
                  </div>
                </div>
              </div>

              <div className="cookie-consent-actions mt-6">
                <button
                  onClick={dismissBanner}
                  className="btn-accept"
                >
                  <i className="fas fa-check mr-2"></i>
                  Fermer
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
});

CookieConsent.displayName = 'CookieConsent';

export default CookieConsent;
