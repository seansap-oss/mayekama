import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BookOpen, Bookmark, Bot, CheckCircle2, ChevronRight, CloudDownload, Copy, Download,
  FileText, Gauge, Globe2, Headphones, Home, Keyboard, Languages, LibraryBig, Lock,
  Menu, Moon, PencilLine, PlusCircle, Search, Settings, ShieldCheck, Sparkles, Sun,
  UploadCloud, UserRound, UsersRound, Wand2
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
  likes?: number;
  comments?: string[];
};

type Story = {
  id: string;
  title: string;
  category: string;
  readTime: string;
  progress: number;
  roman: string[];
  english: string[];
};

type StoryArtKey = 'quill' | 'child' | 'market' | 'village' | 'horse' | 'audio' | 'readerHero' | 'readerChild' | 'readerMother' | 'readerThief';

const navItems = [
  ['Keyboard', '#keyboard'], ['Writer', '#writer'], ['Stories', '#stories'], ['Database', '#database'],
  ['Dictionary', '#dictionary'], ['Install', '#install'], ['Standard', '#standard'], ['AI', '#ai'], ['API', '#api']
] as const;

const taptaStory: Story = {
  id: 'tapta',
  title: 'Tapta',
  category: 'Phunga Wari',
  readTime: '6 min read',
  progress: 14,
  roman: [
    'Aadi gi matamda leirammi nupa ama amadi nupi ama. Masi macha ama leirammi.',
    'Aduga makhoinse sakol phaba amadi sakol thiba oina hingba louduna leirammi.',
    'Nong anaba nonglakpa yumgi manungda macha adu kaplami.',
    'Macha adu khangna kaplami. Mama na yamna thiba kapkhandaba hotnami.',
    'Aduga nupi aduna hairami: “Nang kapkanu, phunga manungda tapta lakliba!” Aduga macha adu tokte.',
    'Matam aduda yum mayai thonglonda huranba ama chaklapu laklami. Aduga nungthila ma yum manungda lamlami.',
    'Huranba aduna khallami: “Tapta haina haiba masi kari oibagano? Ei shamu dagi yaamna yakhi.”'
  ],
  english: [
    'Long ago, there lived a man, a woman, and their small child.',
    'They earned their living by keeping and caring for horses.',
    'One rainy night, the child cried loudly inside the house.',
    'The mother tried hard to stop the child from crying.',
    'She warned the child that Tapta was coming into the hearth, but the child did not stop.',
    'At the same time, a thief came near the house in the dark and hid near the stable.',
    'Hearing the name Tapta, the thief became afraid and ran away, thinking Tapta was more frightening than a great beast.'
  ]
};

const latestStories = [
  { title: 'Tapta', author: 'MayekAma Folk Archive', meta: 'Phunga Wari · courage and wit', time: '6 min read', art: 'child' as StoryArtKey },
  { title: 'Ima Keithel', author: 'Leitrangthem Sanatombi', meta: 'Women, market and memory', time: '12 min read', art: 'market' as StoryArtKey },
  { title: 'Nongthang Leima', author: 'Thoiba Meitei', meta: 'Classic tale collection', time: '8 min read', art: 'village' as StoryArtKey },
  { title: 'Khamba Thoibi', author: 'Nongthombam Dhanajit', meta: 'Legend archive preview', time: '10 min read', art: 'horse' as StoryArtKey }
];

const storyArtMap: Record<StoryArtKey, string> = {
  quill: '/story-art/hero-quill.png',
  child: '/story-art/tapta-cover.png',
  market: '/story-art/ima-keithel-cover.png',
  village: '/story-art/nongthang-leima-cover.png',
  horse: '/story-art/khamba-thoibi-cover.png',
  audio: '/story-art/audio-cover.png',
  readerHero: '/story-art/reader-hero.png',
  readerChild: '/story-art/reader-panel-1.png',
  readerMother: '/story-art/reader-panel-2.png',
  readerThief: '/story-art/reader-panel-3.png'
};

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

function StoryInkThumb({kind='village', alt='MayekAma story image'}:{kind?:StoryArtKey; alt?:string}) {
  const src = storyArtMap[kind] || storyArtMap.village;
  return <img className="story-art" src={src} alt={alt} loading="lazy" />;
}

function PhoneMock() {
  return <div className="device-stage"><div className="temple" aria-hidden="true"/><div className="phone" aria-label="MayekAma keyboard preview">
    <div className="phone-camera"/><div className="chat-top"><div className="avatar">E</div><div><strong>Eina Chat</strong><br/><small>online</small></div></div>
    <div className="chat"><div className="bubble me">Eina houjik leiriba kahoujik-e?</div><div className="bubble other">Leire, eina nangbu thokchabani.</div><div className="bubble me">Nangbu eina lafam ama oirakli.</div></div>
    <div className="suggestions"><span>oirakli</span><span>oiraga</span><span>oirammu</span></div>
    <div className="keyboard-preview">{['qwertyuiop','asdfghjkl','zxcvbnm'].map((row, i)=><div className="keyrow" key={row}>{i===2 && <div className="key">⇧</div>}{row.split('').map(k=><div className="key" key={k}>{k}</div>)}{i===2 && <div className="key">⌫</div>}</div>)}<div className="keyrow"><div className="key">?123</div><div className="key">😊</div><div className="key wide">MayekAma</div><div className="key">↵</div></div></div>
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
  [LibraryBig, 'Story Reader', 'Read Phunga Wari and new writing in a warm MayekAma reading surface with controls.'],
  [Headphones, 'Audiobooks Later', 'Admin-uploaded MP3 narration will attach to each story when audio is ready.'],
  [Lock, 'Private and Offline', 'Keyboard prediction runs locally first. Sensitive text stays on the device.']
] as const;

function Features() { return <section className="section" id="keyboard"><div className="container"><SectionTitle eyebrow="Keyboard" title="Everything people need to keep it as default" text="The app must feel familiar enough for everyday English, while quietly improving Roman Manipuri speed and spelling."/><div className="features">{featureItems.map(([Icon,title,text])=><div className="card feature" key={title}><div className="iconbox"><Icon size={32}/></div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>; }

function SectionTitle({eyebrow,title,text}:{eyebrow?:string; title:string; text:string}) { return <div className="section-title">{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h2>{title}</h2><p>{text}</p></div>; }

function StoryHome() {
  return <section className="section app-experience" id="stories"><div className="container"><SectionTitle eyebrow="MayekAma App" title="Read, write, listen and preserve stories" text="The mobile app keeps the website identity, then adds a lightweight story library and reader experience around the keyboard." />
    <div className="app-grid"><div className="app-phone card"><div className="app-top"><Logo/><div className="app-icons"><Search/><UserRound/></div></div>
      <div className="story-hero-card"><div><h3>One Keyboard.<span>One Standard.</span><span>One Identity.</span></h3><p>Type Roman Manipuri naturally. Read beautiful stories. Preserve our language.</p><a className="btn primary" href="#reader"><Keyboard size={16}/> Try Keyboard</a></div><StoryInkThumb kind="quill" alt="Open book with quill illustration"/></div>
      <div className="row-title"><strong>Continue Reading</strong><a href="#reader">View all</a></div>
      <div className="continue-card"><StoryInkThumb kind="child" alt="Tapta cover art"/><div><strong>Tapta</strong><p>A classic Phunga Wari tale about courage and wisdom.</p><div className="progress"><span style={{width:`${taptaStory.progress}%`}}/></div><small>2 / 14 · {taptaStory.readTime}</small></div></div>
      <div className="row-title"><strong>Latest Stories</strong><a href="#reader">View all</a></div>
      <div className="story-scroll">{latestStories.map(s=><div className="mini-story" key={s.title}><StoryInkThumb kind={s.art} alt={`${s.title} cover art`}/><strong>{s.title}</strong><span>{s.author}</span><small>{s.time}</small></div>)}</div>
      <div className="row-title"><strong>Audio Books</strong><a href="#audio">Coming soon</a></div>
      <div className="audio-card"><StoryInkThumb kind="audio" alt="Tapta audiobook cover"/><div><strong>Tapta Audio</strong><p>Narration placeholder for admin MP3 upload.</p></div><button className="listen">Listen</button></div>
      <div className="quick-actions"><a href="#writer"><PencilLine/>Write Story</a><a href="#reader"><BookOpen/>My Stories</a><a href="#dictionary"><Languages/>Dictionary</a><a href="#contribute"><PlusCircle/>Contribute</a></div>
      <MobileFooter />
    </div>
    <ReaderPreview />
    </div>
  </div></section>;
}

function ReaderPreview() {
  const [mode, setMode] = useState<'roman'|'english'>('roman');
  const [size, setSize] = useState(22);
  const [brightness, setBrightness] = useState(74);
  const [auto, setAuto] = useState(false);
  const [page, setPage] = useState(2);
  const [volume, setVolume] = useState(60);
  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => window.scrollBy({top: 18, behavior: 'smooth'}), 1200);
    return () => window.clearInterval(id);
  }, [auto]);
  const text = mode === 'roman' ? taptaStory.roman : taptaStory.english;
  return <div className="reader-phone card" id="reader"><div className="reader-header"><a href="#stories" aria-label="Back">←</a><strong>{taptaStory.title}</strong><div><Bookmark size={19}/><Settings size={19}/></div></div>
    <div className="reader-controls"><Sun size={18}/><input type="range" min="45" max="100" step="5" value={brightness} onChange={e=>setBrightness(Number(e.target.value))}/><button onClick={()=>setSize(Math.max(18,size-1))}>A-</button><button onClick={()=>setSize(Math.min(28,size+1))}>A+</button></div>
    <div className="reader-paper" style={{filter:`brightness(${brightness}%)`, fontSize:size}}>
      <div className="reader-tabs"><button className={mode==='roman'?'active':''} onClick={()=>setMode('roman')}>Roman</button><button className={mode==='english'?'active':''} onClick={()=>setMode('english')}>English</button></div>
      <h3>{taptaStory.title}</h3><small>{taptaStory.category} · {taptaStory.readTime}</small><StoryInkThumb kind="readerHero" alt="Tapta opening scene"/>
      {text.slice(0,5).map((p, idx)=><p key={idx}>{p}</p>)}
      <div className="panel-row"><StoryInkThumb kind="readerChild" alt="Crying child"/><StoryInkThumb kind="readerMother" alt="Mother calming child"/><StoryInkThumb kind="readerThief" alt="Thief near horse stable"/></div>
      {text.slice(5).map((p, idx)=><p key={`b${idx}`}>{p}</p>)}
      <div className="moral"><BookOpen size={17}/><span>Tale note: stories are preserved first, then spelling and translation can be reviewed.</span></div>
    </div>
    <div className="reader-bottom"><button onClick={()=>setAuto(!auto)} className={auto?'active':''}><Gauge size={18}/>{auto?'Auto scrolling':'Auto scroll'}</button><input aria-label="Page step" type="range" min="1" max="14" step="1" value={page} onChange={e=>setPage(Number(e.target.value))}/><span className="page-count">{page} / 14</span><button disabled title="Audio coming soon"><Headphones size={18}/></button><div className="floating-volume"><Headphones size={15}/><input aria-label="Volume" type="range" min="0" max="100" step="10" value={volume} onChange={e=>setVolume(Number(e.target.value))}/></div></div>
  </div>;
}

const steps = [[Download,'Download the app','Install MayekAma on Android.'],[Settings,'Enable keyboard','Turn it on inside Android input settings.'],[Keyboard,'Select as default','Choose MayekAma as the daily keyboard.'],[Globe2,'Type anywhere','Use it in WhatsApp, Facebook, YouTube, Instagram and browsers.'],[Sparkles,'Write faster','Get standard Roman Manipuri predictions without keyboard switching.']] as const;
function InstallGuide() { return <section className="section paper" id="install"><div className="container"><SectionTitle eyebrow="Photo journal / flyer" title="How to install and use MayekAma" text="This section becomes the public installation guide, school flyer and app onboarding flow."/><div className="steps">{steps.map(([Icon, label, detail], idx)=><div className="step card" key={label}><div className="circle"><Icon size={36}/></div><div className="badge">{idx+1}</div><strong>{label}</strong><p>{detail}</p></div>)}</div><div className="center-actions"><a className="btn primary" href="#download"><Download size={17}/> Download Android APK</a><a className="btn" href="#writer">Try before installing</a></div></div></section>; }

function Writer() {
  const [text, setText] = useState('Eina nangbu noongshi. Meeting adu houjik leire. Thagatchare.');
  const parts = useMemo(() => normalizeText(text), [text]);
  const suggestions = suggest(text, 6);
  const context = detectLanguageContext(text);
  const standardText = normalizeToString(text);
  const changed = parts.filter(p => p.changed).length;
  return <section className="section" id="writer"><div className="container"><SectionTitle eyebrow="Writer" title="Write, paste and standardise Roman Manipuri" text="This is the foundation for chat, long letters, articles and story submissions."/>
    <div className="writer-grid"><div className="card"><div className="panel-title"><span>Input</span><small>{context}</small></div><textarea value={text} onChange={(e)=>setText(e.target.value)} /><div className="suggestion-pills">{suggestions.map(s=><span key={s.text}>{s.text}</span>)}</div></div>
    <div className="card"><div className="panel-title"><span>MayekAma Standard</span><small>{changed} changes</small></div><div className="output">{parts.map((p, i)=> p.changed ? <span className="changed" title={p.reason} key={i}>{p.output}</span> : <React.Fragment key={i}>{p.output}</React.Fragment>)}</div><div className="action-row"><button className="btn primary" onClick={()=>navigator.clipboard?.writeText(standardText)}><Copy size={16}/> Copy</button><button className="btn" onClick={()=>setText(standardText)}>Apply standard</button></div></div></div>
  </div></section>;
}

function StorySubmission() {
  return <section className="section tinted" id="submit-story"><div className="container"><SectionTitle eyebrow="Write and submit" title="A simple path for new stories" text="Readers can become contributors. Submissions stay pending until reviewed by the MayekAma team." />
    <div className="story-submit-grid"><div className="card form"><h3>Story submission fields</h3><input placeholder="Story title"/><select className="search"><option>Phunga Wari</option><option>Children</option><option>History</option><option>Poetry</option></select><textarea placeholder="Roman Manipuri story text"/><textarea placeholder="English meaning / translation (optional)"/><button className="btn primary"><UploadCloud size={16}/> Submit story for review</button></div>
    <div className="card"><h3>Admin-ready publishing flow</h3><ol className="flow-list"><li>Receive story by website/app/email.</li><li>AI checks spelling and extracts new words.</li><li>Editor reviews Roman standard and translation.</li><li>Story is published to the reader library.</li><li>MP3 narration can be attached later.</li></ol><div className="notice"><strong>No outside brand labels:</strong> the reading experience is named MayekAma Reader throughout the interface.</div></div></div>
  </div></section>;
}

function AiAssistant() { return <section className="section" id="ai"><div className="container"><SectionTitle eyebrow="AI workspace" title="AI proofreading for stories and standards" text="The assistant will help clean spelling, find missing words, prepare story pages and suggest translations — but admin review remains required."/><div className="card story-ai"><Bot/><div><strong>Story AI planned tasks</strong><p>Proofread Roman Manipuri, mark uncertain spelling, extract dictionary candidates, produce page breaks, and prepare narration scripts.</p></div></div></div></section>; }

function Dictionary() {
  const [q, setQ] = useState('');
  const results = lookup(q);
  const [selectedId, setSelectedId] = useState(starterDictionary[0].id);
  const current = results.find(w=>w.id===selectedId) ?? results[0] ?? starterDictionary[0];
  return <section className="section" id="dictionary"><div className="container"><SectionTitle eyebrow="Dictionary" title="The public word database" text="One canonical word appears to users. Aliases remain behind the scenes for recognition and migration."/>
    <div className="center-actions"><a className="btn" href="#database"><Search size={16}/> Check our database</a></div>
    <div className="dictionary"><div className="card"><input className="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search word, alias, or meaning"/><div className="word-list">{results.slice(0,80).map(word=><button className={`word-item ${word.id===current.id?'active':''}`} key={word.id} onClick={()=>setSelectedId(word.id)}><div className="word-head"><strong>{word.canonical}</strong><span className="tag">{word.partOfSpeech}</span></div><small>{word.meaning}</small></button>)}</div></div>
    <WordDetail word={current}/></div></div></section>;
}

function WordDetail({word}:{word: MayekWord}) { return <div className="card"><div className="word-head"><h2>{word.canonical}</h2><span className="tag">{word.level}</span></div><p><strong>Meaning:</strong> {word.meaning}</p><p><strong>Aliases recognised:</strong> {word.aliases.join(', ')}</p><p><strong>Example:</strong> {word.example}</p><p><strong>Frequency score:</strong> {word.frequency}</p><div className="notice"><strong>Standard rule:</strong> The keyboard should promote <em>{word.canonical}</em> while still understanding the aliases.</div></div>; }

function DatabaseBrowser() {
  const [q, setQ] = useState('');
  const words = lookup(q).slice(0, 180);
  return <section className="section paper" id="database"><div className="container"><SectionTitle eyebrow="Database" title="Check our database before adding" text="A-Z browser for existing words, meanings and review status. This helps people avoid duplicate submissions." />
    <div className="stats-row"><div className="stat"><strong>3,147</strong><span>keyboard entries</span></div><div className="stat"><strong>42</strong><span>Tapta candidates</span></div><div className="stat"><strong>{words.length}</strong><span>visible results</span></div></div>
    <input className="search big" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search the MayekAma database"/>
    <div className="az-list">{words.map(w=><div className="az-item" key={w.id}><strong>{w.canonical}</strong><span>{w.meaning}</span><small>{w.partOfSpeech} · needs review</small></div>)}</div>
  </div></section>;
}

function Contributions() {
  const { items, save } = useLocalContributions();
  const [form, setForm] = useState({ word:'', suggested:'', meaning:'', example:'' });
  function submit(e: React.FormEvent) { e.preventDefault(); if (!form.word.trim()) return; save([{ id: crypto.randomUUID(), status:'pending', createdAt: new Date().toISOString(), likes:0, comments:[], ...form }, ...items]); setForm({ word:'', suggested:'', meaning:'', example:'' }); }
  function like(id: string) { save(items.map(item => item.id === id ? { ...item, likes: (item.likes || 0)+1 } : item)); }
  return <section className="section paper" id="contribute"><div className="container"><SectionTitle eyebrow="Governance" title="Temporary words submitted by the community" text="Public suggestions remain temporary until admin review. They do not replace the official MayekAma standard."/>
    <div className="center-actions"><a className="btn" href="#database"><Search size={16}/> Check our database before adding</a></div>
    <div className="writer-grid"><form className="card form" onSubmit={submit}><h3>Submit missing word</h3><input value={form.word} onChange={e=>setForm({...form, word:e.target.value})} placeholder="Word people type"/><input value={form.suggested} onChange={e=>setForm({...form, suggested:e.target.value})} placeholder="Suggested standard spelling"/><input value={form.meaning} onChange={e=>setForm({...form, meaning:e.target.value})} placeholder="Meaning"/><textarea value={form.example} onChange={e=>setForm({...form, example:e.target.value})} placeholder="Example sentence"/><button className="btn primary"><PlusCircle size={16}/> Submit temporary word</button></form>
    <div className="card"><h3>Temporary review queue</h3><div className="queue">{items.length === 0 && <p>No local submissions yet.</p>}{items.map(item=><div className="queue-item" key={item.id}><div><strong>{item.suggested || item.word}</strong><small>{item.word} · {item.meaning || 'meaning needed'} · {item.status}</small></div><button className="btn small" onClick={()=>like(item.id)}>👍 {item.likes || 0}</button></div>)}</div></div></div>
  </div></section>;
}

function Standard() { return <section className="section" id="standard"><div className="container"><SectionTitle eyebrow="Standard" title="A living standard with careful review" text="MayekAma recognises variants but promotes one public spelling at a time. Stories and user submissions help discover missing words without automatically changing the standard."/><div className="card"><p>The Tapta sample is stored as a story corpus, not just a dictionary row. It can improve next-word prediction, phrase discovery and AI proofreading while still requiring review before official approval.</p></div></div></section>; }
function Api() { return <section className="section tinted" id="api"><div className="container"><SectionTitle eyebrow="API" title="Future developer and school access" text="The same dictionary, story corpus and approved language packs can later power external tools, schools and publishing workflows."/><div className="card"><code>GET /v1/words · POST /v1/normalise · GET /v1/stories · POST /v1/submissions</code></div></div></section>; }
function DownloadPanel() { return <section className="section paper" id="download"><div className="container"><SectionTitle eyebrow="Download" title="MayekAma Android + Story Reader alpha" text="The Android keyboard, companion app and story reader can be tested as one lightweight app package."/><div className="center-actions"><a className="btn primary" href="#install"><Download size={17}/> Android install guide</a><a className="btn" href="#stories"><BookOpen size={17}/> Preview reader</a></div></div></section>; }

function Footer() { return <footer className="footer"><div className="container"><Logo/><p>MayekAma is a Roman Manipuri keyboard, story reader, writer, dictionary and community standard project.</p><div className="footer-links"><a href="#stories">Latest story</a><a href="#reader">What to read</a><a href="#audio">Audio books</a><a href="#profile">Profile</a></div></div></footer>; }
function MobileFooter() { return <nav className="mobile-footer" id="mobile-menu"><a href="#home"><Home/>Home</a><a href="#stories"><BookOpen/>Stories</a><a href="#audio"><Headphones/>Audio</a><a href="#writer"><PencilLine/>Write</a><a href="#profile"><UserRound/>Profile</a></nav>; }

function App() { return <><Header/><main><Hero/><Features/><StoryHome/><Writer/><StorySubmission/><Dictionary/><DatabaseBrowser/><Contributions/><InstallGuide/><Standard/><AiAssistant/><Api/><DownloadPanel/></main><Footer/><MobileFooter/></>; }

createRoot(document.getElementById('root')!).render(<App />);
