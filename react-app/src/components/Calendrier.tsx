import React from 'react';

const Calendrier: React.FC = () => (
  <section id="calendrier" className="section" data-reveal>
    <div className="container">
      <div className="section-header mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary relative inline-block">
          Notre Calendrier
          <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-secondary"></span>
        </h2>
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
