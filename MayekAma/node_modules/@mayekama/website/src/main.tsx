import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, Bot, Cloud, Download, FileText, Keyboard, Lock, Menu, Search, ShieldCheck, Smartphone, Sparkles, Users } from 'lucide-react';
import { MayekAmaEngine, seedWords } from '../../../packages/language-engine/src';
import './styles.css';

const engine = new MayekAmaEngine();

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="MayekAma home">
          <span className="brand-mark">ꯃ</span>
          <span><strong>MAYEKAMA</strong><small>Roman Manipuri Standard</small></span>
        </a>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          <a href="#keyboard">Keyboard</a>
          <a href="#writer">Web App</a>
          <a href="#dictionary">Dictionary</a>
          <a href="#standard">Standard</a>
          <a href="#api">API</a>
          <a href="#about">About</a>
        </nav>
        <a className="btn primary desktop-only" href="#download"><Download size={16}/> Download App</a>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu /></button>
      </header>
      <main>
        <Hero />
        <FeatureGrid />
        <HowItWorks />
        <Writer />
        <Dictionary />
        <Standard />
        <Api />
        <About />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}

function Hero() {
  return <section id="home" className="hero section-pad">
    <div className="hero-copy">
      <p className="eyebrow">Introducing a digital Roman Manipuri standard</p>
      <h1>One Keyboard.<br/><span>One Standard.</span><br/>One Identity.</h1>
      <p className="lead">Type English and Roman Manipuri naturally without switching keyboards. MayekAma quietly protects Manipuri words from wrong English autocorrection and promotes one clean spelling standard.</p>
      <div className="actions">
        <a className="btn primary" href="#download"><Smartphone size={18}/> Download for Android</a>
        <a className="btn ghost" href="#writer"><Sparkles size={18}/> Try Web Writer</a>
      </div>
      <div className="trust-row"><ShieldCheck size={18}/> Offline-first keyboard. Private by design. Built for Manipur.</div>
    </div>
    <PhoneMock />
  </section>
}

function PhoneMock() {
  return <div className="phone-wrap" id="keyboard">
    <div className="phone">
      <div className="chat-head"><span className="avatar">E</span><div><strong>Eina Chat</strong><small>online</small></div></div>
      <div className="bubble right">Eina houjik leiriba kahoujik-e?</div>
      <div className="bubble left">Leire, eina nangbu thokchabani.</div>
      <div className="composer">Nangbu eina lafam ama oirakli</div>
      <div className="suggestions"><span>oirakli</span><span>oiraga</span><span>oirammu</span></div>
      <div className="keyboard-ui">
        {['qwertyuiop','asdfghjkl','zxcvbnm'].map((row, i) => <div className="key-row" key={row}>{i===2 && <button>⇧</button>}{row.split('').map(k => <button key={k}>{k}</button>)}{i===2 && <button>⌫</button>}</div>)}
        <div className="key-row bottom"><button>?123</button><button>😊</button><button className="space">Roman Manipuri</button><button>↵</button></div>
      </div>
    </div>
  </div>
}

function FeatureGrid() {
  const features = [
    [Keyboard, 'Smart bilingual keyboard', 'English and Roman Manipuri in one everyday keyboard.'],
    [BookOpen, 'Standard spelling', 'One promoted spelling system for modern digital Manipuri.'],
    [Bot, 'AI writing assistant', 'Draft letters, articles and long-form writing later.'],
    [FileText, 'Articles & books', 'Use the same standard for chat, writing and publishing.'],
    [Cloud, 'Language updates', 'Approved dictionary packs can update safely over time.'],
    [Lock, 'Private & secure', 'Daily typing stays on the device by default.']
  ] as const;
  return <section className="section section-pad"><h2>Everything You Need</h2><div className="feature-grid">{features.map(([Icon,title,desc]) => <article className="feature" key={title}><Icon/><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
}

function HowItWorks() {
  const steps = ['Download app', 'Enable keyboard', 'Select MayekAma', 'Type anywhere', 'Get smart predictions'];
  return <section className="section cream" id="download"><h2>How It Works</h2><div className="steps">{steps.map((s,i)=><div className="step" key={s}><div className="step-icon">{i+1}</div><strong>{s}</strong><p>{['Install the APK on Android.','Open settings from the app.','Make it your default keyboard.','Use WhatsApp, Facebook, YouTube or Gmail.','Write English and Roman Manipuri faster.'][i]}</p></div>)}</div><a className="btn ghost wide" href="#guide">View Installation Guide</a></section>
}

function Writer() {
  const [text, setText] = useState('Aigi ming MayekAma ni. Eina nangbu noongshi. Houjig lak o.');
  const normalized = useMemo(() => engine.normalizePlainText(text), [text]);
  const detection = useMemo(() => engine.detectLanguage(text), [text]);
  const currentWord = text.split(/\s+/).pop() || '';
  const context = text.replace(currentWord, '');
  const suggestions = useMemo(() => engine.suggest(context, currentWord), [context, currentWord]);
  return <section className="writer section-pad" id="writer"><div><p className="eyebrow">Web app preview</p><h2>Write once. Standardise instantly.</h2><p>The web writer helps people paste informal Roman Manipuri and convert recognised aliases into the MayekAma standard.</p><div className="mini-stats"><span>{detection.language}</span><span>RM {detection.romanScore}%</span><span>EN {detection.englishScore}%</span></div></div><div className="writer-panel"><textarea value={text} onChange={(e)=>setText(e.target.value)} /><div className="output"><h3>Standard Roman Manipuri</h3><p>{normalized}</p><div className="suggestion-chips">{suggestions.map(s=><button key={s.value}>{s.value}</button>)}</div></div></div></section>
}

function Dictionary() {
  const [query, setQuery] = useState('');
  const results = engine.dictionarySearch(query);
  return <section className="section section-pad" id="dictionary"><div className="section-heading"><div><p className="eyebrow">Public dictionary</p><h2>Search the standard</h2></div><label className="search"><Search size={18}/><input placeholder="Search words, aliases or meanings" value={query} onChange={e=>setQuery(e.target.value)} /></label></div><div className="dict-grid">{results.map(w => <article className="dict-card" key={w.canonical}><h3>{w.canonical}</h3><p>{w.meaning}</p><small>{w.partOfSpeech} · aliases: {w.aliases.join(', ')}</small></article>)}</div></section>
}

function Standard() {
  return <section className="standard section-pad" id="standard"><div><h2>Why This Matters</h2><ul className="checks"><li>For the first time, MayekAma proposes one everyday digital Roman Manipuri spelling system.</li><li>Alternative spellings are understood but the keyboard promotes one standard.</li><li>Writers, students, teachers and publishers can come back to the same reference.</li><li>The standard is versioned, reviewed and improved over time.</li></ul></div><div className="seal"><div className="brand-mark large">ꯃ</div><h3>By Manipuris,<br/>For Manipuris.</h3><p>Let’s build a digital future for our language together.</p></div><div><h2>Built for Everyone</h2><ul className="people"><li>Students</li><li>Writers</li><li>Teachers</li><li>Professionals</li><li>Schools & Colleges</li><li>Everyone in Manipur</li></ul></div></section>
}

function Api() {
  return <section className="api section-pad" id="api"><p className="eyebrow">MayekAma API</p><h2>Make the language engine useful everywhere.</h2><p>Later, publishers, schools and apps can pay to use dictionary lookup, normalisation, translation drafts and batch document checking through secure API keys.</p><div className="code-card">POST /api/normalize<br/>{'{ "text": "Aigi noongshi" }'}<br/>→ {'{ "standard": "Eigi nungshi" }'}</div></section>
}

function About() {
  return <section className="about section-pad" id="about"><h2>A project to be proud of</h2><p>MayekAma is designed as a cultural technology platform: a keyboard people can use every day, a website for writing, a standard people can learn, and a language engine that can support future schools, publishers and institutions.</p></section>
}

function Footer() {
  return <footer className="footer"><div className="footer-strip"><span>First standard Roman Manipuri platform</span><span>Free basic keyboard</span><span>Made in Manipur</span><span>For our language. For our people.</span></div><div className="footer-main"><div><a className="brand invert" href="#home"><span className="brand-mark">ꯃ</span><span><strong>MAYEKAMA</strong><small>Roman Manipuri Standard</small></span></a><p>A digital movement to standardise Roman Manipuri and empower generations to come.</p></div><div><h4>Product</h4><a href="#keyboard">Keyboard</a><a href="#writer">Web Writer</a><a href="#dictionary">Dictionary</a><a href="#api">API</a></div><div><h4>Resources</h4><a href="#download">Installation Guide</a><a href="#standard">Standard</a><a href="#about">About</a><a href="#privacy">Privacy</a></div><div><h4>Stay Connected</h4><input placeholder="Enter your email"/><button className="btn primary">Subscribe</button></div></div><small>© 2026 MayekAma. Built with love in Manipur.</small></footer>
}

function MobileBottomNav() {
  return <nav className="bottom-nav"><a href="#keyboard">Keyboard</a><a href="#writer">Writer</a><a href="#dictionary">Dictionary</a><a href="#download">Install</a></nav>
}

createRoot(document.getElementById('root')!).render(<App />);
