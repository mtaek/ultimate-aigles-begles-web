import React from 'react';

const configuredIframeUrl = import.meta.env.VITE_ULTITIMER_IFRAME_URL?.trim();
const iframeUrl = configuredIframeUrl || '/ultitimer-app/';

const UltiTimerEmbed: React.FC = () => {
  return (
    <main style={{ height: '100vh', width: '100%', background: '#0b1220' }}>
      <iframe
        title="UltiTimer"
        src={iframeUrl}
        allow="fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ border: 0, display: 'block', width: '100%', height: '100%' }}
      />
    </main>
  );
};

export default UltiTimerEmbed;