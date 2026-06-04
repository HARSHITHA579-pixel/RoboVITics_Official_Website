/**
 * About sections — GSAP scroll animations for metal plates and about-us cards
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function init() {
  // About VIT — metal plates slide in
  const plates = document.querySelectorAll('.metal-plate');
  plates.forEach((plate) => {
    gsap.to(plate, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: plate,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // About Us — cards animate in with stagger
  const aboutCards = document.querySelectorAll('.about-card');
  if (aboutCards.length) {
    gsap.to(aboutCards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-us-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }
}
