import { type FormEvent, useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, Check, Menu, Phone, X } from 'lucide-react';
import './index.css';

const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;

type Property = {
  id: string;
  type: string;
  title: string;
  location: string;
  size: string;
  image: string;
  description: string;
};

const properties: Property[] = [
  { id: '01', type: 'AGRICULTURAL LAND / KRISHNA', title: 'Vijayawada Fields', location: 'Vijayawada, Andhra Pradesh', size: '2,400 sq ft onwards', image: asset('nela-vijayawada.jpg'), description: 'Open agricultural plots near Vijayawada, with clear access, fertile soil and the quiet confidence of a well-documented holding.' },
  { id: '02', type: 'PADDY LAND / EAST GODAVARI', title: 'Godavari Grove', location: 'Rajahmundry, Andhra Pradesh', size: '1,200 sq ft onwards', image: asset('nela-rajahmundry.jpg'), description: 'A green, well-watered stretch near the Godavari, shaped for buyers who value productive land and a slower horizon.' },
  { id: '03', type: 'RESIDENTIAL PLOTS / GUNTUR', title: 'Amaravati Edge', location: 'Guntur, Andhra Pradesh', size: '1,500 sq ft onwards', image: asset('nela-hero.jpg'), description: 'Build-ready plots close to Amaravati, with defined boundaries, practical road access and room for a considered future.' },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Brand() {
  return <a className="brand" href="#top" data-testid="link-brand"><span className="brand-mark" aria-hidden="true" />NELA</a>;
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  const navItems = [['The land', 'the-land'], ['Available', 'available'], ['Our standard', 'standard'], ['Process', 'process']];
  return (
    <header className="container nav">
      <Brand />
      <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} data-testid={`link-nav-${id}`}>{label}</a>)}
      </nav>
      <button className="nav-cta" onClick={() => scrollToId('enquire')} data-testid="button-nav-enquire">Start a conversation <ArrowRight size={13} /></button>
      <button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-menu">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
    </header>
  );
}

function TrustStrip() {
  const items = [['48+', 'verified plots'], ['100%', 'title checked'], ['30 days', 'average handover'], ['1 state', 'Andhra Pradesh']];
  return <div className="container trust-strip reveal" data-testid="status-trust-strip"><div className="trust-inner">{items.map(([value, label]) => <div className="trust-item" key={label}><span className="trust-label">{label}</span><strong className="trust-value">{value}</strong></div>)}</div></div>;
}

function Intro() {
  return (
    <section className="intro" id="the-land" data-testid="section-intro">
      <div className="container intro-grid">
        <div className="reveal"><div className="eyebrow">01 / A different starting point</div><h2 className="section-heading">Land is a <em>long</em> conversation.</h2></div>
        <div className="intro-aside reveal"><p>Not a rushed transaction. Not a brochure full of promises. We walk the site, read every record, and make the details easy to understand before you ever visit.</p><a className="line-link" href="#standard" data-testid="link-intro-standard">See how we work <span>→</span></a></div>
      </div>
    </section>
  );
}

function PropertyCard({ property, compact, onDossier, expanded }: { property: Property; compact?: boolean; onDossier: (id: string) => void; expanded: boolean }) {
  return (
    <article className={`property-card ${compact ? 'small' : ''}`} data-testid={`card-property-${property.id}`}>
      <img className="property-image" src={property.image} alt={`${property.title} in ${property.location}`} />
      <div className="property-body"><div className="property-kicker">{property.type}</div><h3 className="property-title">{property.title}</h3><div className="property-meta"><span>{property.location}</span><span>{property.size}</span></div><button className="property-more" onClick={() => onDossier(property.id)} data-testid={`button-dossier-${property.id}`}>{expanded ? 'Close note' : 'Read the land note'} <ArrowRight size={13} /></button>{expanded && <p className="dossier">{property.description}</p>}</div>
    </article>
  );
}

function Available() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);
  const filterOptions = ['All', 'Krishna', 'East Godavari', 'Guntur'];
  const shown = properties.filter((property) => filter === 'All' || property.location.includes(filter));
  return (
    <section className="properties" id="available" data-testid="section-available"><div className="container">
      <div className="property-top"><div><div className="eyebrow">02 / Find your place</div><h2 className="section-heading">A few places<br />worth <em>keeping.</em></h2></div><div className="filters" role="group" aria-label="Filter properties">{filterOptions.map((option) => <button className={`filter ${filter === option ? 'active' : ''}`} key={option} onClick={() => { setFilter(option); setExpanded(null); }} data-testid={`button-filter-${option.toLowerCase().replace(' ', '-')}`}>{option}</button>)}</div></div>
      {shown.length === 0 ? <p data-testid="empty-properties">New land in this region is being reviewed. Ask us what is coming next.</p> : <div className="property-grid"><PropertyCard property={shown[0]} onDossier={(id) => setExpanded(expanded === id ? null : id)} expanded={expanded === shown[0].id} /><div className="property-side">{shown.slice(1).map((property) => <PropertyCard key={property.id} property={property} compact onDossier={(id) => setExpanded(expanded === id ? null : id)} expanded={expanded === property.id} />)}</div></div>}
    </div></section>
  );
}

function Evidence() {
  const points = ['Encumbrance certificate and parent deeds reviewed', 'Survey boundaries checked on ground, not just on paper', 'Plain-language documentation shared before a token'];
  return (
    <section className="evidence" id="standard" data-testid="section-standard"><div className="container evidence-grid">
      <div className="evidence-art reveal" aria-label="Illustration of a verified land record"><div className="document-card"><span className="eyebrow">Site record / SL-042</span><h3>Clarity is part of the view.</h3><div className="rule" /><div className="document-row"><span>BOUNDARIES</span><strong>CONFIRMED</strong></div><div className="rule" /><div className="document-row"><span>TITLE REVIEW</span><strong>COMPLETE</strong></div><div className="stamp">FIELD<br />CHECKED</div></div></div>
      <div className="evidence-copy reveal"><div className="eyebrow">03 / Our standard</div><h2 className="section-heading">Beautiful land.<br /><em>Clear ground.</em></h2><p>Every NELA site earns its place through a quiet, thorough process. We bring the same care to an Andhra Pradesh farm plot as we do to a family home site.</p><ul className="evidence-list">{points.map((point, index) => <li key={point} data-testid={`text-standard-point-${index}`}><span className="check"><Check size={11} /></span>{point}</li>)}</ul></div>
    </div></section>
  );
}

function Journey() {
  const steps = [['01', 'Tell us what matters', 'A first conversation about how you want to use the land, and where you want life to happen.'], ['02', 'Walk the site', 'We arrange a considered visit, with the records and the right questions ready.'], ['03', 'Read everything', 'You receive the site file in plain language. No hidden footnotes, no pressure.'], ['04', 'Make it yours', 'A clean handover, a clear next step, and time to begin well.']];
  return <section className="journey" id="process" data-testid="section-process"><div className="container"><div className="journey-head"><div><div className="eyebrow">04 / The ownership journey</div><h2 className="section-heading">Slow is a<br /><em>strategy.</em></h2></div><p>Good decisions need room. Ours is a four-step path, built to make the important parts feel simple.</p></div><div className="journey-steps">{steps.map(([number, title, text]) => <div className="step reveal" key={number}><div className="step-number">{number}</div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>;
}

function Quote() {
  return <section className="quote" data-testid="section-quote"><div className="container quote-inner reveal"><div className="quote-mark">“</div><blockquote>We came looking for an investment. We left with a place our children already call ours.</blockquote><cite>Meera &amp; Arjun / Sahaja Grove owners</cite></div></section>;
}

function Enquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get('name') || !data.get('email') || !data.get('interest')) { setError('Please share your name, email and what you are looking for.'); return; }
    setError('');
    setSubmitted(true);
  }
  return <section className="enquiry" id="enquire" data-testid="section-enquire"><div className="container enquiry-grid">
    <div className="reveal"><div className="eyebrow">05 / Begin here</div><h2 className="section-heading">The right place<br />starts with a <em>question.</em></h2><p className="enquiry-intro">Tell us a little about the land you have in mind. A real person from our team will come back with a thoughtful first answer.</p><div className="contact-detail"><Phone size={15} /> +91 80 4682 1088</div></div>
    <div className="reveal">{submitted ? <div className="form-success" data-testid="status-form-success"><strong>We have your note.</strong><p>Thank you. Our land team will be in touch within one working day. Until then, imagine the morning you want to wake up to.</p><button className="button button-quiet" style={{ marginTop: 24 }} onClick={() => setSubmitted(false)} data-testid="button-form-reset">Send another note</button></div> : <form className="enquiry-form" onSubmit={submit} noValidate data-testid="form-enquiry">
      <div className="form-row"><div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" placeholder="Asha Menon" data-testid="input-name" /></div><div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" placeholder="asha@example.com" data-testid="input-email" /></div></div>
      <div className="field"><label htmlFor="interest">I am looking for</label><input id="interest" name="interest" placeholder="A weekend grove near Bengaluru" data-testid="input-interest" /></div><div className="field"><label htmlFor="message">Anything else</label><textarea id="message" name="message" placeholder="Tell us what a good piece of land feels like to you." data-testid="input-message" /></div>{error && <p className="form-error" role="alert" data-testid="status-form-error">{error}</p>}<div><button className="button button-primary" type="submit" data-testid="button-submit-enquiry">Send enquiry <ArrowRight size={15} /></button></div>
    </form>}</div>
  </div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-row"><Brand /><div className="footer-links"><a href="#available" data-testid="link-footer-available">Available land</a><a href="#standard" data-testid="link-footer-standard">Our standard</a><a href="#enquire" data-testid="link-footer-contact">Contact</a></div></div><div className="footer-bottom"><span>© 2025 NELA Land Studio</span><span>For considered ownership in Andhra Pradesh.</span></div></div></footer>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.title = 'NELA — Grounded in what lasts';
    const description = 'Verified, transparent land in Andhra Pradesh for families, builders and patient investors.';
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute('name', 'description'); document.head.appendChild(tag); }
    tag.setAttribute('content', description);
    let og = document.querySelector('meta[property="og:title"]');
    if (!og) { og = document.createElement('meta'); og.setAttribute('property', 'og:title'); document.head.appendChild(og); }
    og.setAttribute('content', 'NELA — Grounded in what lasts');
    const socialDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    socialDescription.setAttribute('property', 'og:description');
    socialDescription.setAttribute('content', description);
    if (!socialDescription.parentNode) document.head.appendChild(socialDescription);
    const twitterCard = document.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
    twitterCard.setAttribute('name', 'twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');
    if (!twitterCard.parentNode) document.head.appendChild(twitterCard);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div className="site-shell"><div className="hero"><Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} /><div className="container hero-content"><div className="hero-copy reveal visible"><div className="eyebrow">Andhra Pradesh / Verified land, honestly offered</div><h1 className="hero-title">Room to live.<br /><em>Grounded</em> in what lasts.</h1><p className="hero-description">NELA finds and prepares beautiful, legally clear pieces of Andhra Pradesh for people who want to build with patience.</p><div className="hero-actions"><button className="button button-primary" onClick={() => scrollToId('available')} data-testid="button-hero-explore">Explore available land <ArrowDownRight size={15} /></button><button className="button button-quiet" onClick={() => scrollToId('standard')} data-testid="button-hero-standard">Our standard</button></div></div></div><div className="scroll-note">Take your time</div></div><TrustStrip /><Intro /><Available /><Evidence /><Journey /><Quote /><Enquiry /><Footer /></div>;
}

export default App;