import { useEffect } from 'react';

export const useReveal = () => {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll('[data-reveal]')) as HTMLElement[];
    items.forEach(el => el.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.classList.remove('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};