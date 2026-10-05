import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

/** One shared ticker, with native touch scrolling and no independent RAF loop. */
export function createLenisScroll() {
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false, autoRaf: false, anchors: { offset: -76 } });
  const tick = (time: number) => lenis.raf(time * 1000);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => { gsap.ticker.remove(tick); lenis.off('scroll', ScrollTrigger.update); lenis.destroy(); };
}
