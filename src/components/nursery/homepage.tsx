import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Award, Clock3, Diamond, Flower2, HeartHandshake, Leaf, MapPin, Menu, PenTool, ShieldCheck, Shovel, Sprout, Star, Truck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hero from '@/assets/nursery-hero.jpg';
import story from '@/assets/nursery-story.jpg';
import leaves from '@/assets/foreground-leaves.png';
import treeImage from '@/assets/ornamental-tree.jpg';
import hedgeImage from '@/assets/hedge-plants.jpg';
import flowers from '@/assets/flowers.jpg.asset.json';
import succulents from '@/assets/succulents.jpg.asset.json';
import indoorImage from '@/assets/indoor-monstera.jpg';
import { useBotanicalMotion } from './use-botanical-motion';

const navigation = [['Home', '#home'], ['Plants', '#plants'], ['Services', '#services'], ['About', '#about'], ['Gallery', '#gallery'], ['Resources', '#resources'], ['Contact', '#contact']];
const trees = { url: treeImage };
const hedges = { url: hedgeImage };
const indoor = { url: indoorImage };
const plants = [
  { name: 'Ornamental Trees', subtitle: 'Timeless beauty. Lasting presence.', image: trees.url, description: 'Discover statement trees that bring structure, shade, and enduring character to your landscape. Speak with our team about the right variety for your space.' },
  { name: 'Shrubs & Hedges', subtitle: 'Shape your own sanctuary.', image: hedges.url, description: 'Create living boundaries, layered greenery, and beautifully structured gardens. Our team can help you choose plants suited to your light, soil, and vision.' },
  { name: 'Flowering Plants', subtitle: 'A little colour. A lot of joy.', image: flowers.url, description: 'Bring your garden to life with seasonal colour, delicate textures, and beautiful blooms. Visit the nursery to explore our current flowering collection.' },
  { name: 'Succulents & Cacti', subtitle: 'Sculptural by nature.', image: succulents.url, description: 'Explore distinctive silhouettes and low-maintenance beauty. Find a sculptural plant for a sunny corner, a thoughtful gift, or a considered collection.' },
  { name: 'Indoor Plants', subtitle: 'Bring the outside in.', image: indoor.url, description: 'Transform everyday rooms into greener, more restful spaces. Our team can help match your home’s light and your lifestyle with the right indoor plants.' },
];
type Plant = typeof plants[number];

function Brand() {
  return <a href="#home" className="brand" aria-label="White Diamond Nursery home"><svg className="brand-symbol" viewBox="0 0 44 55" fill="none" aria-hidden="true"><path d="M22 2 40 26 22 50 4 26 22 2Z" stroke="currentColor" strokeWidth="1"/><path d="M22 13v28m0-14c-8 0-11-5-11-10 7 0 11 4 11 10Zm0 8c8 0 11-5 11-10-7 0-11 4-11 10Z" stroke="currentColor" strokeWidth="1.2"/></svg><span><span className="brand-name">White Diamond</span><span className="brand-subtitle">NURSERY</span></span></a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update(); window.addEventListener('scroll', update, { passive: true });
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', escape);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('keydown', escape); };
  }, []);
  return <header className={`site-header ${scrolled || open ? 'scrolled' : ''}`}><div className="site-container header-inner"><Brand/><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav><Button asChild variant="glass" className="header-cta"><a href="#visit">Visit Our Nursery <ArrowUpRight/></a></Button><Button variant="ghost" size="icon" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<Button asChild variant="glass"><a href="#visit" onClick={() => setOpen(false)}>Visit Our Nursery <ArrowUpRight/></a></Button></nav>}</header>;
}

function Hero() {
  const values = [[Sprout, 'Expertly Grown'], [ShieldCheck, 'Exceptional Quality'], [HeartHandshake, 'Personal Guidance'], [Leaf, 'Rooted in Nature']] as const;
  return <section id="home" className="hero" aria-labelledby="hero-title"><img className="hero-background" src={hero} width={1920} height={1024} fetchPriority="high" alt="Sunlit glasshouse filled with mature olive trees, palms, and lush nursery plants"/><div className="site-container hero-content"><p className="hero-brand-line">White Diamond Nursery</p><p className="eyebrow">Exceptional Plants • Extraordinary Spaces</p><h1 id="hero-title">Plants for a<br/>More Beautiful<br/><em>Tomorrow.</em></h1><p className="hero-description">Thoughtfully grown. Beautifully selected. Discover exceptional plants and expert care for spaces that flourish.</p><div className="hero-actions"><Button asChild variant="botanical" data-magnetic><a href="#plants">Shop Plants <ArrowUpRight/></a></Button><Button asChild variant="glass" data-magnetic><a href="#visit">Visit Our Nursery <ArrowUpRight/></a></Button></div></div><img className="hero-leaf hero-leaf-primary" src={leaves} width={1024} height={1024} alt="" aria-hidden="true"/><img className="hero-leaf hero-leaf-secondary" src={leaves} width={1024} height={1024} alt="" aria-hidden="true"/><div className="hero-values"><div className="site-container hero-values-inner">{values.map(([Icon, label]) => <div className="hero-value" key={label}><Icon/>{label}</div>)}</div></div><a href="#plants" className="scroll-cue">Explore below <ArrowDown size={17}/></a></section>;
}

function FeaturedPlants({ onSelect }: { onSelect: (plant: Plant) => void }) {
  return <section id="plants" className="section-space" aria-labelledby="plants-title"><div className="site-container"><div className="section-heading-row"><div><p className="eyebrow">The collection</p><h2 id="plants-title" className="section-title">Find Your Kind of Green.</h2></div><Button asChild variant="editorial"><a href="#visit">Explore Our Nursery <ArrowUpRight/></a></Button></div><div className="plant-grid">{plants.map(plant => <a href="#plant-details" className="plant-card" key={plant.name} onClick={event => { event.preventDefault(); onSelect(plant); }} aria-label={`Explore ${plant.name}`}><div className="plant-image"><div className="hover-layer"><img className="parallax-image" src={plant.image} width={700} height={960} loading="lazy" alt={plant.name}/></div></div><div className="plant-card-label"><h3>{plant.name}</h3><ArrowUpRight/></div><p>{plant.subtitle}</p></a>)}</div></div></section>;
}

function Story() {
 const features = [ [Sprout, 'Grown with Care', 'Healthy roots. Strong beginnings. Plants nurtured to thrive.'], [Award, 'Quality, Without Compromise', 'Every plant thoughtfully selected, with an eye for the exceptional.'], [HeartHandshake, 'Expertise That’s Personal', 'Honest advice from people who know and love plants.'], [Leaf, 'A Greener Perspective', 'A lasting connection to nature, in every space we help create.'] ] as const;
 return <section id="about" className="story" aria-labelledby="story-title"><div className="site-container story-grid"><div className="story-copy"><p className="eyebrow">Why White Diamond</p><h2 id="story-title">More Than a Nursery.<br/><em>A Higher Standard.</em></h2><p className="body-copy">We believe beautiful spaces begin with exceptional plants. From the first new leaf to a flourishing landscape, we bring care, knowledge, and a discerning eye to every detail.</p><div className="feature-grid">{features.map(([Icon,title,copy]) => <div className="feature-item" key={title}><Icon/><h3>{title}</h3><p>{copy}</p></div>)}</div><Button asChild variant="editorial" className="story-link"><a href="#visit">Come Grow With Us <ArrowUpRight/></a></Button></div><div className="story-image-frame"><div className="story-image"><img className="parallax-image" src={story} loading="lazy" width={1024} height={1280} alt="A nursery grower tending a mature olive tree with care"/></div><div className="story-note"><Sprout/><div><strong>Rooted in passion.</strong><span>Growing beauty, one plant at a time.</span></div></div></div></div></section>;
}

function Services() {
 const services = [[PenTool, 'Landscape Consultation', 'Thoughtful guidance to help your garden reach its full potential.'], [Sprout, 'Plant Sourcing', 'The right plant, in the right place. Let us find something exceptional.'], [Flower2, 'Design Support', 'From a single corner to an entire landscape, bring your vision to life.'], [Truck, 'Delivery & Planting', 'Carefully delivered. Expertly planted. Beautifully established.']] as const;
 return <section id="services" className="section-space" aria-labelledby="services-title"><div className="site-container"><div className="section-heading-row"><div><p className="eyebrow">Beyond the plants</p><h2 id="services-title" className="section-title">Your Vision. Our Expertise.</h2></div><p className="body-copy services-intro">Considered services for gardens, homes, and spaces that deserve something special.</p></div><div className="service-grid">{services.map(([Icon,title,copy]) => <article className="service-card" key={title}><Icon/><h3>{title}</h3><p>{copy}</p><Button asChild variant="editorial"><a href="#contact">Let’s Talk <ArrowUpRight/></a></Button></article>)}</div></div></section>;
}

const testimonials = [ { quote: '“An extraordinary selection of plants, and people who truly care. Our garden has never felt more alive.”', name: 'A garden transformed', role: 'Residential garden' }, { quote: '“Every detail felt considered, from choosing the perfect trees to finding their place in our landscape.”', name: 'A vision brought to life', role: 'Landscape project' }, { quote: '“A beautiful place to slow down, explore, and find a little inspiration to take home.”', name: 'A greener home', role: 'Indoor plant collection' } ];
function Testimonials() {
 const [index,setIndex] = useState(0);
 const testimonial = testimonials[index] ?? { quote: '', name: '', role: '' };
 return <section className="testimonials" aria-label="Customer stories"><div className="site-container"><p className="eyebrow">Beautiful spaces. Happy people.</p><div className="stars" aria-label="Five star rating">{Array.from({length:5},(_,i) => <Star key={i}/>)}</div><div aria-live="polite" aria-atomic="true"><blockquote className="testimonial-quote">{testimonial.quote}</blockquote><p className="testimonial-person">{testimonial.name}<span>{testimonial.role}</span></p></div><div className="testimonial-controls"><Button variant="circle" aria-label="Previous testimonial" onClick={() => setIndex((index + 2) % 3)}><ArrowLeft/></Button><span className="slide-counter">0{index+1} / 03</span><Button variant="circle" aria-label="Next testimonial" onClick={() => setIndex((index + 1) % 3)}><ArrowRight/></Button></div><p className="sample-note">Illustrative stories · Customer reviews coming soon</p></div></section>;
}

function Gallery() {
 const images = [[hero,'A light-filled greenhouse sanctuary'],[flowers.url,'Soft seasonal blooms'],[story,'Expert hands caring for an olive tree'],[succulents.url,'Sculptural succulent collection'],[indoor.url,'Greenery for beautiful interiors']];
 return <section id="gallery" className="gallery section-space" aria-labelledby="gallery-title"><div className="site-container section-heading-row"><div><p className="eyebrow">A glimpse into our world</p><h2 id="gallery-title" className="section-title">Beauty, Naturally.</h2></div><p className="body-copy">Little moments. Lasting inspiration.</p></div><div className="gallery-track">{images.map(([src,alt]) => <div className="gallery-frame" key={alt}><img src={src} alt={alt} width={700} height={500} loading="lazy"/></div>)}</div></section>;
}

function Visit() {
 return <section id="visit" className="visit" aria-labelledby="visit-title"><img className="visit-bg" src={hero} loading="lazy" width={1920} height={1024} alt="A scenic pathway through the nursery greenhouse"/><div className="site-container visit-inner"><div><p className="eyebrow">Your next green chapter</p><h2 id="visit-title">Visit Our Nursery.</h2><p>Wander. Discover. Be inspired.<br/>There’s something special waiting to take root.</p></div><div className="visit-details"><div className="visit-detail"><MapPin/><div><strong>Find White Diamond Nursery</strong><span>Location details coming soon</span></div></div><div className="visit-detail"><Clock3/><div><strong>Plan your visit</strong><span>Opening hours to be confirmed</span></div></div><Button asChild variant="glass" data-magnetic><a href="https://www.google.com/maps/search/?api=1&query=White+Diamond+Nursery" target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight/></a></Button></div></div></section>;
}

function Footer() {
 const [message,setMessage] = useState('');
 const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setMessage('Thank you for your interest. Our newsletter is coming soon.'); };
 return <footer id="contact" className="site-footer"><div className="site-container"><div className="footer-grid"><div className="footer-brand"><Brand/><p className="footer-description">Exceptional plants. Thoughtful expertise.<br/>Helping beautiful spaces flourish, naturally.</p><div className="social-links"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Explore plant inspiration on Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg></a><a href="https://www.pinterest.com/search/pins/?q=luxury%20garden" target="_blank" rel="noopener noreferrer" aria-label="Explore garden inspiration on Pinterest"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9"/><path d="m9 21 3-13m-1 7c7 3 9-9 2-9-5 0-7 6-4 8"/></svg></a><a href="#visit" aria-label="Find our nursery"><MapPin/></a></div></div><div><h3 className="footer-title">Our Collection</h3><div className="footer-links">{plants.map(plant => <a key={plant.name} href="#plants">{plant.name}</a>)}</div></div><div><h3 className="footer-title">White Diamond</h3><div className="footer-links"><a href="#about">Our Story</a><a href="#services">Our Services</a><a href="#gallery">Gallery</a><a href="#visit">Visit the Nursery</a><a href="#resources">Plant Inspiration</a></div></div><div id="resources" className="footer-newsletter"><h3 className="footer-title">A Little Inspiration, Delivered.</h3><p className="newsletter-copy">Seasonal notes, plant care, and beautiful things.<br/>Stay connected to our growing world.</p><form onSubmit={submit}><label className="sr-only" htmlFor="newsletter-email">Email address</label><div className="newsletter-field"><input id="newsletter-email" type="email" placeholder="Your email address" required autoComplete="email"/><Button variant="ghost" size="icon" type="submit" aria-label="Join newsletter"><ArrowRight/></Button></div></form>{message && <p className="newsletter-message" role="status">{message}</p>}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} White Diamond Nursery. All rights reserved.</span><span>Rooted in nature. Grown with care.</span></div></div></footer>;
}

export function NurseryHomepage() {
 const scope = useRef<HTMLDivElement>(null);
 const dialog = useRef<HTMLDialogElement>(null);
 const [selected,setSelected] = useState<Plant | null>(null);
 useBotanicalMotion(scope);
 useEffect(() => { if (selected) dialog.current?.showModal(); },[selected]);
 return <div ref={scope}><Header/><main><Hero/><FeaturedPlants onSelect={setSelected}/><Story/><Services/><Testimonials/><Gallery/><Visit/></main><Footer/><dialog ref={dialog} className="category-dialog" aria-labelledby="category-title" onClose={() => setSelected(null)} data-lenis-prevent><Button variant="circle" className="dialog-close" aria-label="Close plant details" onClick={() => dialog.current?.close()}><X/></Button>{selected && <><img className="dialog-image" src={selected.image} alt={selected.name}/><div className="dialog-content"><p className="eyebrow">The White Diamond collection</p><h2 id="category-title">{selected.name}</h2><p className="body-copy">{selected.description}</p><Button asChild variant="botanical"><a href="#visit" onClick={() => dialog.current?.close()}>Explore at the Nursery <ArrowUpRight/></a></Button></div></>}</dialog></div>;
}
