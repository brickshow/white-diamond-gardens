import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function useBotanicalMotion(scope: RefObject<HTMLDivElement | null>) {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    const media = gsap.matchMedia();
    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false, anchors: { offset: -76 } });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const heroTrigger = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 };
      gsap.to('.hero-background', { yPercent: 18, ease: 'none', scrollTrigger: heroTrigger });
      gsap.to('.hero-content', { y: 75, ease: 'none', scrollTrigger: heroTrigger });
      gsap.to('.hero-leaf-primary', { y: -130, rotation: 5, ease: 'none', scrollTrigger: heroTrigger });
      gsap.to('.hero-leaf-secondary', { y: -220, rotation: -8, ease: 'none', scrollTrigger: heroTrigger });
      scope.current?.querySelectorAll<HTMLElement>('.parallax-image').forEach(image => {
        gsap.fromTo(image, { yPercent: -4, scale: 1.04 }, { yPercent: 5, scale: 1, ease: 'none', scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });
      gsap.fromTo('.story-copy', { y: 25 }, { y: -25, ease: 'none', scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.fromTo('.story-note', { y: 30 }, { y: -20, ease: 'none', scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: 1.4 } });
      gsap.fromTo('.gallery-track', { x: 55 }, { x: -55, ease: 'none', scrollTrigger: { trigger: '.gallery', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
      gsap.fromTo('.visit-bg', { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.visit', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      const buttons = Array.from(scope.current?.querySelectorAll<HTMLElement>('[data-magnetic]') ?? []);
      const listeners = buttons.map(button => {
        const xTo = gsap.quickTo(button, 'x', { duration: .5, ease: 'power3.out' });
        const yTo = gsap.quickTo(button, 'y', { duration: .5, ease: 'power3.out' });
        const move = (event: PointerEvent) => { const rect = button.getBoundingClientRect(); xTo((event.clientX - rect.left - rect.width / 2) * .08); yTo((event.clientY - rect.top - rect.height / 2) * .12); };
        const leave = () => { xTo(0); yTo(0); };
        button.addEventListener('pointermove', move); button.addEventListener('pointerleave', leave);
        return () => { button.removeEventListener('pointermove', move); button.removeEventListener('pointerleave', leave); };
      });
      return () => { listeners.forEach(cleanup => cleanup()); gsap.ticker.remove(tick); lenis.off('scroll', ScrollTrigger.update); lenis.destroy(); };
    });
    const refresh = () => ScrollTrigger.refresh();
    const images = Array.from(scope.current?.querySelectorAll('img') ?? []);
    images.forEach(image => image.addEventListener('load', refresh));
    let disposed = false;
    document.fonts.ready.then(() => { if (!disposed) refresh(); });
    const frame = requestAnimationFrame(refresh);
    return () => { disposed = true; cancelAnimationFrame(frame); images.forEach(image => image.removeEventListener('load', refresh)); media.revert(); };
  }, { scope });

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.style.scrollBehavior = 'auto';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);
}
