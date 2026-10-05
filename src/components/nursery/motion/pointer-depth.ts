import gsap from 'gsap';

export function setupPointerDepth(root: HTMLElement) {
  const cleanup: (() => void)[] = [];
  const bind = (element: HTMLElement, move: (event: PointerEvent) => void, leave: () => void) => {
    element.addEventListener('pointermove', move); element.addEventListener('pointerleave', leave);
    element.addEventListener('focusout', leave);
    cleanup.push(() => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', leave); element.removeEventListener('focusout', leave); });
  };
  root.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(button => {
    const x = gsap.quickTo(button, 'x', { duration: .65, ease: 'power3.out' });
    const y = gsap.quickTo(button, 'y', { duration: .65, ease: 'power3.out' });
    bind(button, event => { const r = button.getBoundingClientRect(); x((event.clientX-r.left-r.width/2)*.08); y((event.clientY-r.top-r.height/2)*.1); }, () => { x(0); y(0); });
  });
  root.querySelectorAll<HTMLElement>('.plant-image, .service-card').forEach(card => {
    const image = card.querySelector<HTMLElement>('.hover-layer');
    const target = image ?? card;
    const x = gsap.quickTo(target, image ? 'x' : 'rotationY', { duration: .7, ease: 'power3.out' });
    const y = gsap.quickTo(target, image ? 'y' : 'rotationX', { duration: .7, ease: 'power3.out' });
    const overlay = card.querySelector<HTMLElement>('.plant-shade');
    const shadeX = overlay ? gsap.quickTo(overlay, 'x', { duration: .8 }) : undefined;
    bind(card, event => { const r = card.getBoundingClientRect(); const dx=(event.clientX-r.left)/r.width-.5; const dy=(event.clientY-r.top)/r.height-.5; x(dx*(image ? 12 : 3)); y(dy*(image ? 10 : -3)); shadeX?.(dx*18); }, () => { x(0); y(0); shadeX?.(0); });
  });
  const hero = root.querySelector<HTMLElement>('.hero');
  const targets = Array.from(root.querySelectorAll<HTMLElement>('.decor-hero .decor-pointer')).map((element, index) => ({ x: gsap.quickTo(element, 'x', { duration: 1.3 }), y: gsap.quickTo(element, 'y', { duration: 1.3 }), factor: index === 0 ? 18 : -10 }));
  if (hero) bind(hero, event => { const r=hero.getBoundingClientRect(); targets.forEach(t => { t.x(((event.clientX-r.left)/r.width-.5)*t.factor); t.y(((event.clientY-r.top)/r.height-.5)*t.factor); }); }, () => targets.forEach(t => { t.x(0); t.y(0); }));
  return () => cleanup.forEach(fn => fn());
}
