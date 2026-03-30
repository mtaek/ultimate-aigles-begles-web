import React from 'react';
import { ultiTimerAppUrl } from '../config/ultitimer';

const UltiTimerEmbed: React.FC = () => {
  return (
    <main style={{ height: '100vh', width: '100%', background: '#0b1220' }}>
      <iframe
        title="UltiTimer"
        src={ultiTimerAppUrl}
        allow="fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ border: 0, display: 'block', width: '100%', height: '100%' }}
      />
    </main>
  );
};

export default UltiTimerEmbed;