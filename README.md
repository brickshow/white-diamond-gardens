# White Diamond Gardens

Build a premium multi-section marketing website for "White Diamond Nursery" based on this exact visual direction:

Overall visual language:
- Luxury botanical brand, premium and editorial, not a generic template.
- Color palette: deep forest green, warm ivory/cream, muted stone, subtle metallic-gold accents.
- Elegant high-contrast serif headings paired with a clean modern sans-serif body font.
- Cinematic full-bleed plant/nursery photography, dark overlays, large negative space, refined borders and soft shadows.
- Desktop-first but fully responsive on tablet/mobile.
- Make the site feel handcrafted and high-end.

Homepage structure:
1. Transparent/sticky header over hero with logo, nav: Home, Plants, Services, About, Gallery, Resources, Contact. CTA: Visit Our Nursery.
2. Hero: cinematic nursery/greenhouse image, tagline "Exceptional Plants • Extraordinary Spaces", headline "Plants for a More Beautiful Tomorrow", supporting copy, CTAs "Shop Plants" and "Visit Our Nursery", plus four small trust/value items.
3. Featured Plants section: 5 premium image cards: Ornamental Trees, Shrubs & Hedges, Flowering Plants, Succulents & Cacti, Indoor Plants.
4. Dark green "Why Choose White Diamond" section with headline "More Than a Nursery. A Higher Standard.", supporting copy, four features, and an image/story card.
5. Services section with 4 cards: Landscape Consultation, Plant Sourcing, Design Support, Delivery & Planting.
6. Testimonials section with elegant carousel controls and rating.
7. Gallery section with horizontal premium image strip.
8. Large "Visit Our Nursery" CTA band with scenic image, location/hours details and Get Directions button.
9. Rich dark footer with shop/company columns, newsletter field, social icons.

IMPORTANT animation/parallax requirements:
- Install and use GSAP + @gsap/react + ScrollTrigger for scroll-driven animation.
- Install Lenis (or equivalent smooth-scroll library) and integrate it correctly with GSAP ticker/ScrollTrigger.
- Use Framer Motion only where it adds value for micro-interactions; avoid animation bloat.
- Real parallax, not simple fade-ins:
  * Hero background moves slower than foreground.
  * Foreground leaves/plants drift at different scroll speeds.
  * Hero text has subtle vertical depth.
  * Section image cards use translateY/scale parallax while entering/leaving viewport.
  * Dark story section has layered image and copy movement.
  * Gallery strip gets gentle scroll-linked horizontal drift.
  * CTA scenic background gets background-position/transform parallax.
- Use pinning sparingly and tastefully, only if it improves premium feel.
- Smooth interpolation, no jitter, no layout shift.
- Respect prefers-reduced-motion and disable heavy parallax on small mobile screens where appropriate.
- Ensure ScrollTrigger refreshes correctly after images/fonts load and on resize.
- Avoid scroll-jacking. Lenis should remain natural and performant.
- Add subtle magnetic/hover effects on primary buttons and image-card hover depth.
- Keep animation durations and easing premium/soft, not flashy.

Implementation:
- Use TypeScript, Tailwind, semantic HTML, accessible controls.
- Componentize sections cleanly.
- Use lucide-react for icons.
- Use high-quality royalty-free plant/nursery placeholder images from reliable remote sources if needed.
- Add working nav anchors and responsive mobile menu.
- Add SEO title/description and basic OpenGraph metadata.
- Optimize images and lazy-load below-the-fold media.
- Keep Lighthouse/performance in mind.
- No backend/database is required.
- Install all required npm packages automatically.
- After implementation, run the app/build and fix any compile/runtime issues before considering the task complete.

The result should strongly resemble a luxury nursery homepage with cinematic parallax depth and custom-brand polish, suitable as the redesigned White Diamond Nursery website.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b043f60b-888d-41b3-a532-8a31b8ff6364).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
