import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlignJustify, BookOpen, Bookmark, Bot, ChevronLeft, Copy, Download, Gauge, Globe2, Headphones, Home,
  Keyboard, Languages, LibraryBig, List, Lock, Menu, Pause, PencilLine, Play, PlusCircle,
  Search, Settings, ShieldCheck, SlidersHorizontal, Sparkles, Sun, Type, UploadCloud,
  UserRound, Volume2, Wand2, X
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
  { id: 'tapta', title: 'Tapta', meta: 'Phunga Wari', time: '6 min read', art: 'child' as StoryArtKey, available: true },
  { id: 'ima-keithel', title: 'Ima Keithel', meta: 'Community story', time: '12 min read', art: 'market' as StoryArtKey, available: false },
  { id: 'nongthang-leima', title: 'Nongthang Leima', meta: 'Classic tale', time: '8 min read', art: 'village' as StoryArtKey, available: false },
  { id: 'khamba-thoibi', title: 'Khamba Thoibi', meta: 'Legend', time: '10 min read', art: 'horse' as StoryArtKey, available: false }
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

function StoryHome({onOpenStory}:{onOpenStory:(storyId:string)=>void}) {
  return <section className="section app-experience" id="stories"><div className="container"><SectionTitle eyebrow="MayekAma Stories" title="Read, write, listen and preserve stories" text="A lightweight story library with MayekAma artwork, adjustable reading surfaces and simple community tools." />
    <div className="app-shell card">
      <div className="app-top"><Logo/><div className="app-icons"><Search/><UserRound/></div></div>
      <div className="story-hero-card"><div><h3>One Keyboard.<span>One Standard.</span><span>One Identity.</span></h3><p>Type Roman Manipuri naturally. Read beautiful stories. Preserve our language.</p><button className="btn primary" onClick={()=>onOpenStory('tapta')}><BookOpen size={16}/> Read Tapta</button></div><StoryInkThumb kind="quill" alt="Open book with quill illustration"/></div>
      <div className="row-title"><strong>Continue Reading</strong><button className="text-link" onClick={()=>onOpenStory('tapta')}>Open story</button></div>
      <button className="continue-card story-button" onClick={()=>onOpenStory('tapta')}><StoryInkThumb kind="child" alt="Tapta cover art"/><div><strong>Tapta</strong><p>A classic Phunga Wari tale about courage and wisdom.</p><div className="progress"><span style={{width:`${taptaStory.progress}%`}}/></div><small>2 / 7 · {taptaStory.readTime}</small></div></button>
      <div className="row-title"><strong>Latest Stories</strong><span>Story catalogue</span></div>
      <div className="story-scroll">{latestStories.map(story=><button className="mini-story story-button" key={story.id} onClick={()=>onOpenStory(story.id)}><StoryInkThumb kind={story.art} alt={`${story.title} cover art`}/><strong>{story.title}</strong><span>{story.meta}</span><small>{story.available ? story.time : 'Coming soon'}</small></button>)}</div>
      <div className="row-title" id="audio"><strong>Audio Books</strong><span>Coming soon</span></div>
      <button className="audio-card story-button" onClick={()=>onOpenStory('tapta-audio')}><StoryInkThumb kind="audio" alt="Tapta audio cover"/><div><strong>Tapta Audio</strong><p>Audio narration will be available here.</p></div><span className="listen">Open</span></button>
      <div className="quick-actions"><a href="#submit-story"><PencilLine/>Write Story</a><a href="#stories"><BookOpen/>My Stories</a><a href="#dictionary"><Languages/>Dictionary</a><a href="#contribute"><PlusCircle/>Contribute</a></div>
    </div>
  </div></section>;
}

const chapters = [
  {title:'Long Ago', paragraph:0},
  {title:'The Family and Horses', paragraph:1},
  {title:'The Rainy Night', paragraph:2},
  {title:'The Mother’s Warning', paragraph:4},
  {title:'The Thief', paragraph:5},
  {title:'The Fear of Tapta', paragraph:6}
];

function ReaderOverlay({storyId,onClose}:{storyId:string;onClose:()=>void}) {
  const readerRef = useRef<HTMLDivElement>(null);
  const [mode,setMode] = useState<'roman'|'english'>('roman');
  const [brightness,setBrightness] = useState(180);
  const [fontSize,setFontSize] = useState(22);
  const [lineHeight,setLineHeight] = useState(1.65);
  const [page,setPage] = useState(1);
  const [autoSpeed,setAutoSpeed] = useState(0);
  const [chaptersOpen,setChaptersOpen] = useState(false);
  const [settingsOpen,setSettingsOpen] = useState(false);
  const story = latestStories.find(item=>item.id===storyId);
  const isTapta = storyId === 'tapta';
  const isAudio = storyId === 'tapta-audio';

  useEffect(()=>{
    document.body.classList.add('reader-open');
    return ()=>document.body.classList.remove('reader-open');
  },[]);

  useEffect(()=>{
    if (!autoSpeed || !readerRef.current || !isTapta) return;
    const speeds=[0,0.45,0.9,1.6];
    const id=window.setInterval(()=>readerRef.current?.scrollBy({top:speeds[autoSpeed],behavior:'auto'}),20);
    return ()=>window.clearInterval(id);
  },[autoSpeed,isTapta]);

  function goToPage(next:number){
    const safe=Math.max(1,Math.min(chapters.length,next));
    setPage(safe);
    const target=readerRef.current?.querySelector(`[data-chapter="${safe}"]`) as HTMLElement | null;
    if(target && readerRef.current){readerRef.current.scrollTo({top:Math.max(0,target.offsetTop-20),behavior:'smooth'});}
  }

  const paperLightness=Math.max(0,Math.min(1,(brightness-80)/120));
  const paperDarkness=1-paperLightness;
  const paperR=Math.round(218+(37*paperLightness));
  const paperG=Math.round(198+(54*paperLightness));
  const paperB=Math.round(166+(78*paperLightness));
  const paperStyle = {
    '--reader-paper': `rgb(${paperR}, ${paperG}, ${paperB})`,
    '--reader-grain': `${0.08 + paperDarkness*0.28}`,
    '--reader-edge': `${0.05 + paperDarkness*0.25}`,
    '--reader-font': `${fontSize}px`,
    '--reader-line': `${lineHeight}`
  } as React.CSSProperties;

  if(!isTapta){
    const title=isAudio ? 'Tapta Audio' : (story?.title || 'Story');
    const art=isAudio ? 'audio' : (story?.art || 'village');
    return <div className="reader-overlay"><div className="coming-soon-page paper-surface"><button className="reader-close" onClick={onClose}><X/>Close</button><StoryInkThumb kind={art as StoryArtKey} alt={`${title} cover`}/><h2>{title}</h2><p>Coming soon.</p><button className="btn primary" onClick={onClose}>Back to Stories</button></div></div>;
  }

  const text=mode==='roman'?taptaStory.roman:taptaStory.english;
  return <div className="reader-overlay" style={paperStyle}>
    <header className="fullscreen-reader-header"><button onClick={onClose}><ChevronLeft/>Back</button><strong>Tapta</strong><div><button onClick={()=>setChaptersOpen(v=>!v)} aria-label="Chapters"><List/></button><button onClick={()=>setSettingsOpen(v=>!v)} aria-label="Reader settings"><SlidersHorizontal/></button></div></header>
    <aside className={`reader-side-panel chapter-panel ${chaptersOpen?'open':''}`}><div className="panel-heading"><strong>Chapters</strong><button onClick={()=>setChaptersOpen(false)}><X/></button></div>{chapters.map((chapter,index)=><button key={chapter.title} className={page===index+1?'active':''} onClick={()=>{goToPage(index+1);setChaptersOpen(false)}}><span>{index+1}</span><div><strong>{chapter.title}</strong><small>Page {index+1}</small></div></button>)}</aside>
    <aside className={`reader-side-panel settings-panel ${settingsOpen?'open':''}`}><div className="panel-heading"><strong>Reading controls</strong><button onClick={()=>setSettingsOpen(false)}><X/></button></div>
      <label>Paper brightness <strong>{brightness}</strong></label><input type="range" min="80" max="200" step="10" value={brightness} onChange={e=>setBrightness(Number(e.target.value))}/>
      <div className="control-row"><span>Text size</span><button onClick={()=>setFontSize(v=>Math.max(17,v-1))}>A−</button><button onClick={()=>setFontSize(v=>Math.min(34,v+1))}>A+</button></div>
      <div className="control-row"><span>Line spacing</span><button onClick={()=>setLineHeight(v=>Math.max(1.35,Number((v-.1).toFixed(2))))}>−</button><button onClick={()=>setLineHeight(v=>Math.min(2.1,Number((v+.1).toFixed(2))))}>+</button></div>
      <div className="segmented"><button className={mode==='roman'?'active':''} onClick={()=>setMode('roman')}>Roman</button><button className={mode==='english'?'active':''} onClick={()=>setMode('english')}>English</button></div>
      <label>Auto-scroll</label><div className="speed-grid">{['Off','Slow','Normal','Fast'].map((label,index)=><button key={label} className={autoSpeed===index?'active':''} onClick={()=>setAutoSpeed(index)}>{label}</button>)}</div>
    </aside>
    <button className="floating-reader-button chapters-trigger" onClick={()=>setChaptersOpen(v=>!v)}><List/><span>Chapters</span></button>
    <button className="floating-reader-button settings-trigger" onClick={()=>setSettingsOpen(v=>!v)}><SlidersHorizontal/><span>Settings</span></button>
    <div className="story-scroll-area paper-surface" ref={readerRef} onScroll={()=>{if(readerRef.current){const ratio=readerRef.current.scrollTop/Math.max(1,readerRef.current.scrollHeight-readerRef.current.clientHeight);setPage(Math.max(1,Math.min(chapters.length,Math.round(ratio*(chapters.length-1))+1)))}}}>
      <article className="fullscreen-story">
        <div className="reader-language"><button className={mode==='roman'?'active':''} onClick={()=>setMode('roman')}>Roman</button><button className={mode==='english'?'active':''} onClick={()=>setMode('english')}>English</button></div>
        <h1>Tapta</h1><p className="story-meta">Phunga Wari · {taptaStory.readTime}</p>
        <section data-chapter="1"><StoryInkThumb kind="readerHero" alt="Tapta opening scene"/><p>{text[0]}</p></section>
        <section data-chapter="2"><p>{text[1]}</p></section>
        <section data-chapter="3"><StoryInkThumb kind="readerChild" alt="Crying child"/><p>{text[2]}</p><p>{text[3]}</p></section>
        <section data-chapter="4"><StoryInkThumb kind="readerMother" alt="Mother speaking to the child"/><p>{text[4]}</p></section>
        <section data-chapter="5"><StoryInkThumb kind="readerThief" alt="Thief near the horse stable"/><p>{text[5]}</p></section>
        <section data-chapter="6"><p>{text[6]}</p><div className="moral"><BookOpen/><span>The story is preserved in Roman Manipuri with an English reading option.</span></div></section>
      </article>
    </div>
    <div className="reader-progress-bar"><button onClick={()=>setAutoSpeed(autoSpeed?0:2)}>{autoSpeed?<><Pause/>Pause</>:<><Play/>Auto-scroll</>}</button><input type="range" min="1" max={chapters.length} step="1" value={page} onChange={e=>goToPage(Number(e.target.value))}/><span>{page} / {chapters.length}</span><Volume2/></div>
    <ReaderFooter onClose={onClose}/>
  </div>;
}

function ReaderFooter({onClose}:{onClose:()=>void}) {
  function leaveTo(hash:string){onClose();window.setTimeout(()=>{window.location.hash=hash},60)}
  return <nav className="reader-footer"><button onClick={()=>leaveTo('home')}><Home/>Home</button><button onClick={()=>leaveTo('stories')}><BookOpen/>Stories</button><button onClick={()=>leaveTo('audio')}><Headphones/>Audio Books</button><button onClick={()=>leaveTo('writer')}><PencilLine/>Write</button><button onClick={()=>leaveTo('profile')}><UserRound/>Profile</button></nav>;
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
  const [submitted,setSubmitted]=useState(false);
  return <section className="section tinted" id="submit-story"><div className="container"><SectionTitle eyebrow="Write and submit" title="A simple path for new stories" text="Readers can become contributors. Submissions remain pending until reviewed." />
    <div className="story-submit-grid"><form className="card form" onSubmit={e=>{e.preventDefault();setSubmitted(true)}}><h3>Story submission</h3><input required placeholder="Story title"/><select className="search"><option>Phunga Wari</option><option>Children</option><option>History</option><option>Poetry</option></select><textarea required placeholder="Roman Manipuri story text"/><textarea placeholder="English meaning or translation (optional)"/><button className="btn primary" type="submit"><UploadCloud size={16}/> Submit story for review</button>{submitted && <div className="notice">Story received for review.</div>}</form>
    <div className="card"><h3>Publishing flow</h3><ol className="flow-list"><li>Receive the story through MayekAma.</li><li>Check spelling and extract new words.</li><li>Review the Roman standard and translation.</li><li>Publish the story to the reader library.</li><li>Add narration when audio is available.</li></ol><div className="notice"><strong>MayekAma Reader:</strong> stories, illustrations and language tools remain inside one consistent reading system.</div></div></div>
  </div></section>;
}

function AiAssistant() { return <section className="section" id="ai"><div className="container"><SectionTitle eyebrow="AI workspace" title="AI proofreading for stories and standards" text="The assistant will help clean spelling, find missing words, prepare story pages and suggest translations — but admin review remains required."/><div className="card story-ai"><Bot/><div><strong>Story language tools</strong><p>Proofread Roman Manipuri, mark uncertain spelling, extract dictionary candidates, produce page breaks, and prepare narration scripts.</p></div></div></div></section>; }

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
function DownloadPanel() { return <section className="section paper" id="download"><div className="container"><SectionTitle eyebrow="Download" title="MayekAma Android and Story Reader" text="The Android keyboard, companion app and story reader are prepared as one lightweight MayekAma package."/><div className="center-actions"><a className="btn primary" href="#install"><Download size={17}/> Android install guide</a><a className="btn" href="#stories"><BookOpen size={17}/> Open stories</a></div></div></section>; }

function ComingSoonSection({id,title,icon}:{id:string;title:string;icon:React.ReactNode}) { return <section className="section compact-coming" id={id}><div className="container"><div className="card coming-card">{icon}<div><h2>{title}</h2><p>Coming soon.</p></div></div></div></section>; }

function Footer() { return <footer className="footer"><div className="container"><Logo/><p>MayekAma is a Roman Manipuri keyboard, story reader, writer, dictionary and community standard project.</p>
    <nav className="desktop-footer-nav" aria-label="MayekAma navigation">
      <a href="#home"><Home/><span><strong>Home</strong><small>Explore and continue</small></span></a>
      <a href="#stories"><BookOpen/><span><strong>Stories</strong><small>Read folk tales</small></span></a>
      <a href="#audio"><Headphones/><span><strong>Audio Books</strong><small>Coming soon</small></span></a>
      <a href="#writer"><PencilLine/><span><strong>Write</strong><small>Create and submit</small></span></a>
      <a href="#profile"><UserRound/><span><strong>Profile</strong><small>Coming soon</small></span></a>
    </nav>
    <div className="build-version">Website Version 21 · July 2026</div>
  </div></footer>; }
function MobileFooter() { return <nav className="mobile-footer" id="mobile-menu"><a href="#home"><Home/>Home</a><a href="#stories"><BookOpen/>Stories</a><a href="#audio"><Headphones/>Audio</a><a href="#writer"><PencilLine/>Write</a><a href="#profile"><UserRound/>Profile</a></nav>; }

function App() {
  const [openStory,setOpenStory]=useState<string|null>(null);
  return <><Header/><main><Hero/><Features/><StoryHome onOpenStory={setOpenStory}/><Writer/><StorySubmission/><Dictionary/><DatabaseBrowser/><Contributions/><InstallGuide/><Standard/><AiAssistant/><Api/><DownloadPanel/><ComingSoonSection id="profile" title="Profile" icon={<UserRound/>}/></main><Footer/><MobileFooter/>{openStory && <ReaderOverlay storyId={openStory} onClose={()=>setOpenStory(null)}/>}</>;
}

createRoot(document.getElementById('root')!).render(<App />);
