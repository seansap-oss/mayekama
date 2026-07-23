import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BookOpen, Bot, CheckCircle2, ChevronRight, CloudDownload, Copy, Download, FileText,
  Globe2, GraduationCap, Keyboard, Languages, Lock, Menu, PencilLine, PlusCircle,
  Search, Settings, ShieldCheck, Sparkles, UploadCloud, UserRoundCheck, Wand2
} from 'lucide-react';
import {
  detectLanguageContext, lookup, normalizeText, normalizeToString, suggest, starterDictionary,
  type MayekWord
} from '../packages/language-engine';
import './styles.css';

type Contribution = {
  id: string;
  word: string;
  suggested: string;
  meaning: string;
  example: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
};

const navItems = [
  ['Keyboard', '#keyboard'], ['Writer', '#writer'], ['Dictionary', '#dictionary'],
  ['Install', '#install'], ['Standard', '#standard'], ['AI', '#ai'], ['API', '#api']
] as const;

function useLocalContributions() {
  const [items, setItems] = useState<Contribution[]>(() => {
    try { return JSON.parse(localStorage.getItem('mayekama.contributions') || '[]'); } catch { return []; }
  });
  function save(next: Contribution[]) {
    setItems(next);
    localStorage.setItem('mayekama.contributions', JSON.stringify(next));
  }
  return { items, save };
}

function Logo() {
  return <a className="brand" href="#home" aria-label="MayekAma home">
    <div className="logo-mark">ꯃ</div>
    <div><strong>MAYEKAMA</strong><small>Roman Manipuri Standard</small></div>
  </a>;
}

function Header() {
  return <header className="header"><div className="container nav"><Logo />
    <nav className="navlinks">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a className="btn primary small" href="#download"><Download size={15}/> Download App</a></nav>
    <a className="btn mobile-menu" href="#mobile-menu"><Menu size={20}/></a>
  </div></header>;
}

function PhoneMock() {
  return <div className="device-stage"><div className="temple" aria-hidden="true"/><div className="phone" aria-label="MayekAma keyboard preview">
    <div className="phone-camera"/><div className="chat-top"><div className="avatar">E</div><div><strong>Eina Chat</strong><br/><small>online</small></div></div>
    <div className="chat"><div className="bubble me">Eina houjik leiriba kahoujik-e?</div><div className="bubble other">Leire, eina nangbu thokchabani.</div><div className="bubble me">Nangbu eina lafam ama oirakli.</div></div>
    <div className="suggestions"><span>oirakli</span><span>oiraga</span><span>oirammu</span></div>
    <div className="keyboard-preview">{['qwertyuiop','asdfghjkl','zxcvbnm'].map((row, i)=><div className="keyrow" key={row}>{i===2 && <div className="key">⇧</div>}{row.split('').map(k=><div className="key" key={k}>{k}</div>)}{i===2 && <div className="key">⌫</div>}</div>)}<div className="keyrow"><div className="key">?123</div><div className="key">😊</div><div className="key wide">Roman Manipuri</div><div className="key">↵</div></div></div>
  </div></div>;
}

function Hero() {
  return <section className="hero" id="home"><div className="container hero-grid"><div className="hero-copy">
    <div className="kicker"><Sparkles size={14}/> Introducing a digital Roman Manipuri standard</div>
    <h1>One Keyboard.<span>One Standard.</span><span>One Identity.</span></h1>
    <p className="lede">Type English and Roman Manipuri naturally without switching keyboards. MayekAma protects Manipuri words from wrong English autocorrection and promotes one clean spelling standard.</p>
    <div className="hero-actions"><a className="btn primary" href="#download"><Download size={18}/> Download for Android</a><a className="btn" href="#writer"><PencilLine size={18}/> Try Web Writer</a></div>
    <div className="trust-row"><ShieldCheck size={18}/> Offline-first keyboard. Private by design. Built for Manipur.</div>
  </div><PhoneMock /></div></section>;
}

const featureItems = [
  [Keyboard, 'Everyday Bilingual Keyboard', 'English stays normal. Roman Manipuri predictions appear automatically behind the scenes.'],
  [BookOpen, 'One Standard Spelling', 'Each word has one visible spelling. Other spellings are recognised as aliases, not promoted.'],
  [Wand2, 'Web Normaliser', 'Paste informal Roman Manipuri and convert it into MayekAma standard form.'],
  [Bot, 'AI Writing Assistant', 'Draft letters, posts, articles and school material with human review before publication.'],
  [CloudDownload, 'Language Pack Updates', 'Approved dictionary releases can be downloaded without uploading private chats.'],
  [Lock, 'Private and Offline', 'Daily keyboard prediction runs locally first. Sensitive text stays on the device.']
] as const;

function Features() { return <section className="section" id="keyboard"><div className="container"><SectionTitle eyebrow="Keyboard" title="Everything people need to keep it as default" text="The app must feel familiar enough for everyday English, while quietly improving Roman Manipuri speed and spelling."/><div className="features">{featureItems.map(([Icon,title,text])=><div className="card feature" key={title}><div className="iconbox"><Icon size={32}/></div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>; }

function SectionTitle({eyebrow,title,text}:{eyebrow?:string; title:string; text:string}) { return <div className="section-title">{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2><p>{text}</p></div>; }

const steps = [[Download,'Download the app','Install MayekAma on Android.'],[Settings,'Enable keyboard','Turn it on inside Android input settings.'],[Keyboard,'Select as default','Choose MayekAma as the daily keyboard.'],[Globe2,'Type anywhere','Use it in WhatsApp, Facebook, YouTube, Instagram and browsers.'],[Sparkles,'Write faster','Get standard Roman Manipuri predictions without keyboard switching.']] as const;
function InstallGuide() { return <section className="section paper" id="install"><div className="container"><SectionTitle eyebrow="Photo journal / flyer" title="How to install and use MayekAma" text="This section becomes the public installation guide, school flyer and app onboarding flow."/><div className="steps">{steps.map(([Icon, label, detail], idx)=><div className="step card" key={label}><div className="circle"><Icon size={36}/></div><div className="badge">{idx+1}</div><strong>{label}</strong><p>{detail}</p></div>)}</div><div className="center-actions"><a className="btn primary" href="#download"><Download size={17}/> Download Android APK</a><a className="btn" href="#writer">Try before installing</a></div></div></section>; }

function Writer() {
  const [text, setText] = useState('Eina nangbu noongshi. Meeting adu houjik leire. Thagatchare.');
  const parts = useMemo(() => normalizeText(text), [text]);
  const suggestions = suggest(text, 6);
  const context = detectLanguageContext(text);
  const standardText = normalizeToString(text);
  const changed = parts.filter(p => p.changed).length;
  return <section className="section" id="writer"><div className="container"><SectionTitle eyebrow="Writer" title="Write, paste and standardise Roman Manipuri" text="This is the foundation for chat, long letters, articles and eventually book writing."/>
    <div className="writer-grid"><div className="card"><div className="panel-title"><span>Input</span><small>{context}</small></div><textarea value={text} onChange={(e)=>setText(e.target.value)} /><div className="suggestion-pills">{suggestions.map(s=><span key={s.text}>{s.text}</span>)}</div></div>
    <div className="card"><div className="panel-title"><span>MayekAma Standard</span><small>{changed} changes</small></div><div className="output">{parts.map((p, i)=> p.changed ? <span className="changed" title={p.reason} key={i}>{p.output}</span> : <React.Fragment key={i}>{p.output}</React.Fragment>)}</div><div className="action-row"><button className="btn primary" onClick={()=>navigator.clipboard?.writeText(standardText)}><Copy size={16}/> Copy</button><button className="btn" onClick={()=>setText(standardText)}>Apply standard</button></div></div></div>
  </div></section>;
}

function AiAssistant() {
  const [mode, setMode] = useState('formal-letter');
  const [input, setInput] = useState('Please write a short respectful notice asking students to use the MayekAma keyboard for Roman Manipuri writing.');
  const draft = useMemo(() => makeDraft(input, mode), [input, mode]);
  return <section className="section tinted" id="ai"><div className="container"><SectionTitle eyebrow="AI workspace" title="AI writing assistant for schools, articles and long writing" text="Build 2 includes a safe local draft workflow. Later this connects to a reviewed AI service and paid API plans."/>
    <div className="writer-grid"><div className="card"><div className="panel-title"><span>Writing request</span><small>{mode}</small></div><select className="search" value={mode} onChange={e=>setMode(e.target.value)}><option value="formal-letter">Formal letter</option><option value="article">Article intro</option><option value="school">School notice</option><option value="social">Social post</option></select><textarea value={input} onChange={e=>setInput(e.target.value)} /></div>
    <div className="card"><div className="panel-title"><span>Draft output</span><small>review required</small></div><div className="output draft">{draft}</div><div className="notice"><strong>Accuracy note:</strong> Early AI output must remain a draft until the language standard and translation memory become mature.</div></div></div>
  </div></section>;
}

function makeDraft(input: string, mode: string) {
  const base = normalizeToString(input);
  if (mode === 'article') return `Article draft:\n\nMayekAma asi Roman Manipuri standard ama semgatpa digital platform ni. ${base}\n\nMasi keyboard, writer, dictionary amasung standard guide pumnamak ama oina puthoknaba thourang ni.`;
  if (mode === 'school') return `School notice draft:\n\nMayekAma keyboard amasung web writer asi students-na Roman Manipuri standard spelling pumnamak thamminnaba sijinnaba yare. ${base}\n\nThagatchari.`;
  if (mode === 'social') return `Social post draft:\n\nOne keyboard. One standard. One identity.\n\n${base}\n\nMayekAma-na Roman Manipuri typing asi henna chap chaba, henna phajaba amasung henna mathang chana oihangani.`;
  return `Formal draft:\n\nRespected Sir/Madam,\n\n${base}\n\nMayekAma asi Roman Manipuri standard spelling amasung everyday keyboard support touba digital platform ni. Masi students, writers, teachers amasung community pumnamakki oina semgatpa project ni.\n\nThagatchari.`;
}

function Dictionary() {
  const [q, setQ] = useState('');
  const results = lookup(q);
  const [selectedId, setSelectedId] = useState(starterDictionary[0].id);
  const current = results.find(w=>w.id===selectedId) ?? results[0] ?? starterDictionary[0];
  return <section className="section" id="dictionary"><div className="container"><SectionTitle eyebrow="Dictionary" title="The public word database" text="One canonical word appears to users. Aliases remain behind the scenes for recognition and migration."/>
    <div className="dictionary"><div className="card"><input className="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search word, alias, or meaning"/><div className="word-list">{results.map(word=><button className={`word-item ${word.id===current.id?'active':''}`} key={word.id} onClick={()=>setSelectedId(word.id)}><div className="word-head"><strong>{word.canonical}</strong><span className="tag">{word.partOfSpeech}</span></div><small>{word.meaning}</small></button>)}</div></div>
    <WordDetail word={current}/></div></div></section>;
}

function WordDetail({word}:{word: MayekWord}) { return <div className="card"><div className="word-head"><h2>{word.canonical}</h2><span className="tag">{word.level}</span></div><p><strong>Meaning:</strong> {word.meaning}</p><p><strong>Aliases recognised:</strong> {word.aliases.join(', ')}</p><p><strong>Example:</strong> {word.example}</p><p><strong>Frequency score:</strong> {word.frequency}</p><div className="notice"><strong>Standard rule:</strong> The keyboard should promote <em>{word.canonical}</em> while still understanding the aliases.</div></div>; }

function Contributions() {
  const { items, save } = useLocalContributions();
  const [form, setForm] = useState({ word:'', suggested:'', meaning:'', example:'' });
  function submit(e: React.FormEvent) { e.preventDefault(); if (!form.word.trim()) return; save([{ id: crypto.randomUUID(), status:'pending', createdAt: new Date().toISOString(), ...form }, ...items]); setForm({ word:'', suggested:'', meaning:'', example:'' }); }
  function setStatus(id: string, status: Contribution['status']) { save(items.map(item => item.id === id ? { ...item, status } : item)); }
  return <section className="section paper" id="contribute"><div className="container"><SectionTitle eyebrow="Governance" title="Contribute words and review the standard" text="Build 2 adds the first local workflow for word submissions and admin-style review. Supabase will make this multi-user in the next build."/>
    <div className="writer-grid"><form className="card form" onSubmit={submit}><h3>Submit missing word</h3><input value={form.word} onChange={e=>setForm({...form, word:e.target.value})} placeholder="Word people type"/><input value={form.suggested} onChange={e=>setForm({...form, suggested:e.target.value})} placeholder="Suggested standard spelling"/><input value={form.meaning} onChange={e=>setForm({...form, meaning:e.target.value})} placeholder="Meaning"/><textarea value={form.example} onChange={e=>setForm({...form, example:e.target.value})} placeholder="Example sentence"/><button className="btn primary"><PlusCircle size={16}/> Submit for review</button></form>
    <div className="card"><h3>Review queue</h3><div className="queue">{items.length === 0 && <p>No local submissions yet.</p>}{items.map(item=><div className="queue-item" key={item.id}><div><strong>{item.suggested || item.word}</strong><small>{item.word} · {item.meaning || 'meaning pending'}</small></div><span className={`status ${item.status}`}>{item.status}</span><div className="mini-actions"><button onClick={()=>setStatus(item.id,'approved')}>Approve</button><button onClick={()=>setStatus(item.id,'rejected')}>Reject</button></div></div>)}</div></div></div>
  </div></section>;
}

function Standard() { return <section className="section" id="standard"><div className="container"><SectionTitle eyebrow="Standard" title="MayekAma Standard 0.1" text="The standard must be public, careful and versioned so people can trust it for daily chat, schools, articles and books."/><div className="standard-grid"><div className="card"><h3>Core rules</h3><ul className="check-list"><li>One canonical Roman spelling per word.</li><li>Aliases are recognised but not promoted.</li><li>No forced changes inside chat unless the user chooses.</li><li>Formal writing mode can be stricter than chat mode.</li><li>Every change must be versioned and reviewable.</li></ul></div><div className="card"><h3>Public message</h3><p>“Introduced as a digital Roman Manipuri standard for the first time for everyday keyboard use, web writing and education.”</p><p>This is the correct kind of wording until an external authority formally recognises it.</p></div><div className="card"><h3>Built for adoption</h3><ul className="check-list"><li>Daily chat</li><li>Facebook and WhatsApp posts</li><li>YouTube comments</li><li>School notices</li><li>Articles and books</li></ul></div></div></div></section>; }

function Api() { const plans = [['Free','Dictionary lookup, basic normaliser, public docs'],['Developer','API keys, normalisation endpoint, dictionary search'],['Publisher','Batch article normalisation, editorial tools, priority support'],['Institution','School and government terminology packs, private deployment']]; return <section className="section" id="api"><div className="container"><SectionTitle eyebrow="Revenue" title="API and business model" text="The keyboard can be free while publishers, schools, institutions and developers pay for higher-value language tools."/><div className="pricing">{plans.map(([name, detail])=><div className="card price" key={name}><h3>{name}</h3><p>{detail}</p><a href="#contact">Plan details <ChevronRight size={14}/></a></div>)}</div><div className="api-box"><code>POST /api/v1/normalize</code><code>POST /api/v1/predict</code><code>GET /api/v1/dictionary?q=eigi</code><code>POST /api/v1/translate/draft</code></div></div></section>; }

function DownloadPanel() { return <section className="section download-panel" id="download"><div className="container"><div className="download-card"><div><div className="eyebrow">Android first</div><h2>Install once. Type everywhere.</h2><p>Android APK packaging begins after the web engine and keyboard scaffold are stable. iPhone users can use the web writer and PWA first; the native iOS keyboard requires Xcode signing later.</p></div><div className="download-actions"><a className="btn primary" href="#install"><Download size={17}/> Installation guide</a><a className="btn" href="#writer"><PencilLine size={17}/> Use web writer</a></div></div></div></section>; }

function Footer() { return <><div className="footer-band"><div className="container band-grid"><div><CheckCircle2/> First digital platform</div><div><ShieldCheck/> Private keyboard</div><div><Languages/> Made for Manipur</div><div><Sparkles/> For our people</div></div></div><footer className="footer" id="about"><div className="container footer-grid"><div><Logo/><p>A digital movement to standardize Roman Manipuri and empower generations to come.</p></div><div><h4>Product</h4><a href="#keyboard">Keyboard App</a><a href="#writer">Web Writer</a><a href="#dictionary">Dictionary</a><a href="#ai">AI Assistant</a></div><div><h4>Resources</h4><a href="#install">Installation Guide</a><a href="#standard">Standard 0.1</a><a href="#contribute">Contribute</a><a href="#api">API</a></div><div><h4>Company</h4><a href="#about">About Us</a><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Use</a><a href="#contact">Contact</a></div><div><h4>Stay connected</h4><p>Subscribe for updates and language-pack releases.</p><input className="search" placeholder="Enter your email"/><button className="btn primary" style={{marginTop:10}}>Subscribe</button></div></div></footer><nav className="bottom-nav"><a href="#keyboard"><Keyboard/>Keyboard</a><a href="#writer"><PencilLine/>Writer</a><a href="#dictionary"><BookOpen/>Words</a><a href="#install"><UploadCloud/>Install</a></nav></>; }

function App() { return <><Header/><main><Hero/><Features/><InstallGuide/><Writer/><AiAssistant/><Dictionary/><Contributions/><Standard/><Api/><DownloadPanel/></main><Footer/></>; }

createRoot(document.getElementById('root')!).render(<App />);
