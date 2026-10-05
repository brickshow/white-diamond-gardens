import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Browser-measured line splitting; textContent avoids HTML injection. */
export function splitLines(element: HTMLElement) {
  const text = element.textContent ?? '';
  const words = text.split(/\s+/).filter(Boolean);
  element.replaceChildren(...words.map((word, index) => {
    const span = document.createElement('span');
    span.textContent = word + (index < words.length - 1 ? ' ' : '');
    span.className = 'measure-word';
    return span;
  }));
  const groups: HTMLElement[][] = [];
  let lastTop = -Infinity;
  Array.from(element.children).forEach(child => {
    const word = child as HTMLElement;
    const top = word.offsetTop;
    if (Math.abs(top - lastTop) > 2) { groups.push([]); lastTop = top; }
    groups.at(-1)?.push(word);
  });
  element.replaceChildren(...groups.map(group => {
    const mask = document.createElement('span');
    mask.className = 'text-line-mask';
    const line = document.createElement('span');
    line.className = 'text-line-unit';
    group.forEach(word => line.append(word));
    mask.append(line);
    return mask;
  }));
  return () => { element.textContent = text; };
}

export function TextReveal({ children, className = '', intro = false }: { children: string; className?: string; intro?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = ref.current?.querySelector<HTMLElement>('[data-line-copy]');
    if (!element) return;
    const media = gsap.matchMedia();
    let disposed = false;
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let context: gsap.Context | undefined;
      let restore: (() => void) | undefined;
      let timer: ReturnType<typeof setTimeout> | undefined;
      const rebuild = () => {
        if (disposed) return;
        context?.revert(); restore?.();
        restore = splitLines(element);
        context = gsap.context(() => {
          gsap.from(element.querySelectorAll('.text-line-unit'), {
            yPercent: 105, opacity: 0, duration: .85, stagger: .09, ease: 'power4.out',
            ...(intro ? { delay: 1 } : { scrollTrigger: { trigger: element, start: 'top 92%', once: true } }),
          });
        }, element);
        ScrollTrigger.refresh();
      };
      const ready = () => { if (!disposed) rebuild(); };
      document.fonts.ready.then(ready);
      let width = element.clientWidth;
      const observer = new ResizeObserver(() => {
        if (Math.abs(element.clientWidth - width) < 1) return;
        width = element.clientWidth;
        clearTimeout(timer); timer = setTimeout(rebuild, 180);
      });
      observer.observe(element);
      return () => { clearTimeout(timer); observer.disconnect(); context?.revert(); restore?.(); };
    });
    return () => { disposed = true; media.revert(); };
  }, { scope: ref });
  return <p ref={ref} className={className}><span className="sr-only">{children}</span><span aria-hidden="true" data-line-copy>{children}</span></p>;
}

export function SplitWords({ text, characters = false }: { text: string; characters?: boolean }) {
  return <>{text.split(/(\s+)/).map((word, index) => /^\s+$/.test(word) ? word : <span className="word-mask" key={index}><span className="word-unit">{characters ? Array.from(word).map((char, i) => <span className="char-unit" key={i}>{char}</span>) : word}</span></span>)}</>;
}

export function AnimatedHeading({ children, className = '' }: { children: string; className?: string }) {
  return <h2 className={className} data-animated-heading aria-label={children}><span aria-hidden="true"><SplitWords text={children}/></span></h2>;
}

export function HeroLine({ children, accent = false }: { children: string; accent?: boolean }) {
  const content: ReactNode = accent ? <em data-gold-accent><SplitWords text={children} characters/></em> : children;
  return <span className="headline-mask"><span className="headline-line">{content}</span></span>;
}

export function MotionLabel({ children }: { children: string }) {
  return <span className="cta-label"><span className="cta-label-original">{children}</span><span className="cta-label-copy" aria-hidden="true">{children}</span></span>;
}
