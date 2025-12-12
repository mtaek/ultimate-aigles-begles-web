import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

export interface CookieConsentHandle {
  openSettings: () => void;
}

const CookieConsent = forwardRef<CookieConsentHandle>((props, ref) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useImperativeHandle(ref, () => ({
    openSettings: () => {
      setShowSettings(false);
      setShowBanner(true);
    }
  }));

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else if (consent === 'accepted') {
      loadAnalytics();
    }
  }, []);

  const loadAnalytics = () => {
    // Charge Google Analytics uniquement si consentement donné
    if (!(window as any).gtag) {
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZF937FTEQ1';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) {
          (window as any).dataLayer.push(args);
        }
        (window as any).gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-ZF937FTEQ1', {
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure'
        });
      };
    }
  };

  const acceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    loadAnalytics();
    setShowBanner(false);
  };

  const rejectAll = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowBanner(false);
  };

  const savePreferences = (analytics: boolean) => {
    if (analytics) {
      localStorage.setItem('cookieConsent', 'accepted');
      loadAnalytics();
    } else {
      localStorage.setItem('cookieConsent', 'rejected');
    }
    setShowSettings(false);
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
                Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic via Google Analytics. 
                Les cookies essentiels (cache du blog) sont toujours actifs et ne nécessitent pas de consentement.
              </p>
              <div className="cookie-consent-actions">
                <button
                  onClick={acceptAll}
                  className="btn-accept"
                >
                  <i className="fas fa-check mr-2"></i>
                  Accepter
                </button>
                <button
                  onClick={rejectAll}
                  className="btn-reject"
                >
                  <i className="fas fa-times mr-2"></i>
                  Refuser
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

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <div>
                    <h4 className="font-semibold text-gray-800">Cookies d'analyse</h4>
                    <p className="text-sm text-gray-600">Google Analytics - Statistiques anonymes de visite</p>
                  </div>
                  <label className="cookie-toggle">
                    <input
                      type="checkbox"
                      id="analytics-toggle"
                      defaultChecked={true}
                    />
                    <span className="cookie-toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="cookie-consent-actions mt-6">
                <button
                  onClick={() => {
                    const analyticsToggle = document.getElementById('analytics-toggle') as HTMLInputElement;
                    savePreferences(analyticsToggle.checked);
                  }}
                  className="btn-accept"
                >
                  <i className="fas fa-save mr-2"></i>
                  Enregistrer mes choix
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
