import React from 'react';

const Calendrier: React.FC = () => (
  <section id="calendrier" className="section" data-reveal>
    <div className="container">
      <div className="section-header mb-8 text-center">
        <h2 className="text-secondary">Notre Calendrier</h2>
        <p className="section-subtitle text-gray-600">Retrouvez tous nos entraînements, tournois et événements.</p>
      </div>
      <div className="calendar-container">
        <div className="w-full h-[600px] bg-white rounded shadow overflow-hidden">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=ultimate.begles%40gmail.com&ctz=Europe%2FParis&wkst=2"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  </section>
);

export default Calendrier;
