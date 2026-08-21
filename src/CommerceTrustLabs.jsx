import { useState, useEffect, useRef } from "react";

const C = {
  bg:"#ffffff", bg2:"#f6f5f2", bg3:"#efede8",
  accent:"#d9631f", blueHi:"#2f6fb0",
  text:"#16161a", muted:"#5c5e66",
  border:"rgba(28,28,30,0.12)",
  glass:"rgba(28,28,30,0.02)"
};

const GlobalStyle = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;overflow-x:hidden;width:100%;max-width:100vw}
    body{background:#ffffff;color:#16161a;font-family:'Manrope',sans-serif;overflow-x:hidden;width:100%;max-width:100vw;min-width:0}
    #root{width:100%;min-width:0;overflow-x:hidden;max-width:100vw}
    ::selection{background:#d9631f;color:#fff}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:#ffffff}
    ::-webkit-scrollbar-thumb{background:#d9631f}
    @keyframes drift{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-2%,3%) scale(1.05)}}
    @keyframes drift2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(3%,-2%) scale(1.08)}}
    @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
    .nl{position:relative;color:rgba(28,28,30,.62);text-decoration:none;font-family:'DM Mono',monospace;font-size:.76rem;letter-spacing:.075em;transition:color .25s;white-space:nowrap}
    .nl:hover,.nl.on{color:#16161a}
    .nl.on::after{content:'';position:absolute;left:0;right:0;bottom:-.5rem;height:1px;background:#d9631f}
    .card:hover{background:rgba(28,28,30,0.05)!important;border-color:rgba(28,28,30,0.14)!important;transform:translateY(-2px)}
    .row:hover{background:rgba(28,28,30,0.04)!important}
    .pill{display:inline-flex;align-items:center;gap:.6rem;background:#16161a;color:#ffffff;padding:.95rem 2rem;border-radius:999px;font-family:'Manrope',sans-serif;font-size:.8rem;font-weight:700;text-decoration:none;transition:all .25s;border:1px solid #16161a}
    .pill:hover{background:#d9631f;border-color:#d9631f;color:#fff;transform:translateY(-1px)}
    .pill2{display:inline-flex;align-items:center;gap:.6rem;background:transparent;color:#16161a;padding:.95rem 2rem;border-radius:999px;font-family:'Manrope',sans-serif;font-size:.8rem;font-weight:700;text-decoration:none;border:1px solid rgba(28,28,30,.22);transition:all .25s}
    .pill2:hover{border-color:#16161a;background:rgba(28,28,30,.06);transform:translateY(-1px)}
    .lk{opacity:.45;transition:opacity .2s;text-decoration:none;font-family:'DM Mono',monospace;font-size:.7rem;color:#16161a;white-space:nowrap}
    .lk:hover{opacity:1}
    .fl{color:rgba(28,28,30,.35);text-decoration:none;transition:color .2s}
    .fl:hover{color:#d9631f}
    .arc-hint{display:none}
    .nav-links{display:flex}
    .nav-burger{display:none}
    .nav-mobile-panel{display:none}
    .split-row{display:flex;flex-wrap:wrap;gap:clamp(4rem,6vw,7rem);align-items:center}
    .split-text{order:1;min-width:0;flex:1 1 340px}
    .split-visual{order:2;min-width:0;flex:1 1 420px;max-width:580px;margin:0 auto}
    .split-visual.align-content{padding-top:8rem}
    .split-visual svg{filter:contrast(1.15) saturate(1.08)}
    .research-row{display:grid!important;grid-template-columns:220px minmax(0,1fr) auto;column-gap:1.5rem;row-gap:.7rem}
    .research-type{align-self:center}
    .research-action{align-self:center;justify-self:end}
    .note-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.4rem}
    .note-card[open]{grid-column:1/-1}
    .note-card summary{list-style:none}
    .note-card summary::-webkit-details-marker{display:none}
    .note-card summary:focus-visible{outline:2px solid #d9631f;outline-offset:5px;border-radius:12px}
    .note-card[open] .note-plus{transform:rotate(45deg);background:#d9631f;color:#fff;border-color:#d9631f}
    .career-details summary::-webkit-details-marker{display:none}
    .career-details[open] .career-plus{transform:rotate(45deg)}
    .note-story{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(2rem,5vw,5rem)}
    .split-row.reverse .split-text{order:2}
    .split-row.reverse .split-visual{order:1}
    @media (max-width: 860px){
      .arc-hint{display:block}
      .nav-links{display:none}
      .nav-burger{display:inline-flex}
      .nav-mobile-panel.open{display:flex}
      .split-text,.split-row.reverse .split-text{order:1}
      .split-visual,.split-row.reverse .split-visual{order:2}
      .split-visual.align-content{padding-top:0}
      .research-row{grid-template-columns:1fr;gap:.65rem}
      .research-type,.research-action{justify-self:start}
      .note-grid{grid-template-columns:1fr}
      .note-story{grid-template-columns:1fr}
    }
    @media (min-width: 1440px){
      .split-text{flex-basis:520px}
      .split-visual{flex-basis:500px;max-width:620px}
    }
    @media (min-width: 1440px){
      .split-text{flex-basis:520px}
      .split-visual{flex-basis:500px;max-width:620px}
    }
  `}</style>
);

const inner = (extra = {}) => ({
  maxWidth: "min(1520px, 100%)",
  margin: "0 auto",
  padding: "0 clamp(1.25rem, 5vw, 3.5rem)",
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  ...extra
});

const useInView = () => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); o.disconnect(); }
    }, { threshold: 0.01, rootMargin: "0px 0px -8% 0px" });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
};

const Reveal = ({ children, delay = 0 }) => {
  const [ref, v] = useInView();
  const d = Math.min(delay, 120);
  return (
      <div ref={ref} style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateY(14px)",
        transition: `opacity .42s cubic-bezier(.16,1,.3,1) ${d}ms, transform .42s cubic-bezier(.16,1,.3,1) ${d}ms`
      }}>
        {children}
      </div>
  );
};

const Eyebrow = ({ children, center }) => (
    center ? (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:".7rem", marginBottom:"1.6rem" }}>
          <span style={{ width:"1.4rem", height:"1px", background:C.accent, display:"inline-block" }}/>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".74rem", letterSpacing:".22em", textTransform:"uppercase", color:C.accent, textAlign:"center" }}>{children}</span>
        </div>
    ) : (
        <div style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:"1.6rem" }}>
          <span style={{ width:"1.4rem", height:"1px", background:C.accent, display:"inline-block", flexShrink:0 }}/>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".74rem", letterSpacing:".22em", textTransform:"uppercase", color:C.accent }}>{children}</span>
        </div>
    )
);

/* ── STATUS BADGE ── */
const StatusBadge = ({ kind }) => {
  const map = {
    prototype:   ["Working Prototype",      C.accent,  "rgba(217,99,31,.08)"],
    spec:        ["Reference Architecture", C.blueHi,  "rgba(47,111,176,.08)"],
    roadmap:     ["Roadmap",                C.blueHi,  "rgba(47,111,176,.06)"],
    exploration: ["Exploration",            C.muted,   "rgba(28,28,30,.05)"],
  };
  const [label, color, bg] = map[kind] || map.spec;
  return (
      <span style={{ display:"inline-flex", alignItems:"center", gap:".45rem", fontFamily:"'DM Mono',monospace", fontSize:".66rem", fontWeight:500, letterSpacing:".16em", textTransform:"uppercase", color, background:bg, border:`1px solid ${color}`, borderRadius:"999px", padding:".34rem .75rem", whiteSpace:"nowrap" }}>
        <span style={{ width:".4rem", height:".4rem", borderRadius:"50%", background:color }}/>{label}
      </span>
  );
};

/* ── ATMOSPHERE ── */
const Atmosphere = ({ variant = "hero" }) => {
  const palettes = {
    hero:  ["rgba(217,99,31,.22)","rgba(123,175,224,.14)","rgba(217,99,31,.10)"],
    warm:  ["rgba(217,99,31,.16)","rgba(217,99,31,.06)","rgba(123,175,224,.08)"],
    cool:  ["rgba(123,175,224,.16)","rgba(123,175,224,.06)","rgba(217,99,31,.08)"],
  };
  const [c1,c2,c3] = palettes[variant] || palettes.hero;
  return (
      <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
        <div style={{ position:"absolute", width:"60%", paddingBottom:"60%", left:"-10%", top:"-15%", borderRadius:"50%", background:c1, filter:"blur(90px)", animation:"drift 22s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", width:"50%", paddingBottom:"50%", right:"-10%", top:"10%", borderRadius:"50%", background:c2, filter:"blur(100px)", animation:"drift2 26s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", width:"40%", paddingBottom:"40%", left:"20%", bottom:"-15%", borderRadius:"50%", background:c3, filter:"blur(90px)", animation:"drift 30s ease-in-out infinite" }}/>
        <div style={{
          position:"absolute", inset:"-20%",
          backgroundImage:"linear-gradient(rgba(28,28,30,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,28,30,.05) 1px, transparent 1px)",
          backgroundSize:"56px 56px",
          maskImage:"radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)",
          WebkitMaskImage:"radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent)"
        }}/>
      </div>
  );
};

const ScrollCue = () => (
    <div style={{ position:"absolute", left:"50%", bottom:"2.4rem", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:".6rem", animation:"bob 2.4s ease-in-out infinite" }}>
      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".7rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(28,28,30,.35)" }}>Scroll</span>
      <svg width="14" height="20" viewBox="0 0 14 20" fill="none"><path d="M7 1v16M1 11l6 6 6-6" stroke="rgba(28,28,30,.35)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
);

/* ── SECTION VISUALS ── */
const OrchestratorGraphic = () => (
    <svg viewBox="0 0 480 420" fill="none" style={{ width:"100%", height:"auto", display:"block" }}>
      <defs>
        <radialGradient id="og" cx="50%" cy="48%" r="58%"><stop offset="0%" stopColor="#d9631f" stopOpacity=".18"/><stop offset="100%" stopColor="#d9631f" stopOpacity="0"/></radialGradient>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(28,28,30,.48)"/></marker>
      </defs>
      <rect x="0" y="0" width="480" height="420" fill="url(#og)"/>

      <rect x="104" y="24" width="272" height="54" rx="10" fill="rgba(255,255,255,.78)" stroke="#d9631f" strokeWidth="1.6"/>
      <text x="240" y="46" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="8" letterSpacing="1.1" fill="#b94d12">USER OUTCOME</text>
      <text x="240" y="63" textAnchor="middle" fontFamily="'Manrope',sans-serif" fontSize="11.5" fontWeight="700" fill="rgba(28,28,30,.82)">Turn a project idea into a complete cart</text>

      <line x1="240" y1="78" x2="240" y2="118" stroke="rgba(28,28,30,.48)" strokeWidth="1.5" markerEnd="url(#arrow)"/>
      <rect x="158" y="120" width="164" height="84" rx="12" fill="rgba(255,255,255,.86)" stroke="#d9631f" strokeWidth="2"/>
      <text x="240" y="151" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="9.5" fontWeight="500" letterSpacing="1" fill="#b94d12">SUPERVISOR</text>
      <text x="240" y="170" textAnchor="middle" fontFamily="'Manrope',sans-serif" fontSize="12" fontWeight="700" fill="rgba(28,28,30,.82)">Plan · Delegate · Synthesize</text>
      <text x="240" y="188" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="7.5" letterSpacing=".7" fill="rgba(28,28,30,.55)">SHARED CONTEXT + TASK STATE</text>

      {[[28,264,96,58,"CONTENT","AGENT"],[137,264,96,58,"PROJECT","AGENT"],[247,264,96,58,"CATALOG","AGENT"],[356,264,96,58,"CART","AGENT"]].map(([x,y,w,h,line1,line2],i)=>(
        <g key={i}>
          <line x1="240" y1="204" x2={x+w/2} y2={y-5} stroke="rgba(28,28,30,.4)" strokeWidth="1.35" strokeDasharray="4 5" markerEnd="url(#arrow)"/>
          <rect x={x} y={y} width={w} height={h} rx="9" fill="rgba(255,255,255,.7)" stroke={i===0||i===3?"#d9631f":"rgba(28,28,30,.36)"} strokeWidth="1.4"/>
          <text x={x+w/2} y={y+25} textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="8" letterSpacing=".8" fill={i===0||i===3?"#b94d12":"rgba(28,28,30,.7)"}>{line1}</text>
          <text x={x+w/2} y={y+40} textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="7.5" letterSpacing=".8" fill="rgba(28,28,30,.5)">{line2}</text>
        </g>
      ))}

      <rect x="104" y="356" width="272" height="40" rx="9" fill="rgba(255,255,255,.72)" stroke="rgba(47,111,176,.7)" strokeWidth="1.5"/>
      <text x="240" y="375" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="7.5" fontWeight="500" letterSpacing=".8" fill="#2f6fb0">CATALOG GAP → MARKETPLACE OPTION</text>
      <text x="240" y="387" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="6.8" letterSpacing=".65" fill="rgba(28,28,30,.52)">CUSTOMER INTENT → MERCHANDISING SIGNAL</text>
    </svg>
);

const CompassGraphic = () => (
    <svg viewBox="0 0 480 420" fill="none" style={{ width:"100%", height:"auto", display:"block" }}>
      <defs>
        <radialGradient id="cg" cx="50%" cy="50%" r="58%"><stop offset="0%" stopColor="#d9631f" stopOpacity=".18"/><stop offset="100%" stopColor="#d9631f" stopOpacity="0"/></radialGradient>
        <marker id="cycleArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#d9631f"/></marker>
      </defs>
      <rect x="18" y="18" width="444" height="384" rx="28" fill="url(#cg)" stroke="rgba(28,28,30,.22)" strokeWidth="1.3"/>
      <text x="240" y="42" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="8.5" fontWeight="500" letterSpacing="1.1" fill="#b94d12">ENTERPRISE CONTROL PLANE</text>
      <text x="240" y="57" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="7" letterSpacing=".65" fill="rgba(28,28,30,.48)">IDENTITY · POLICY · AUTHORIZATION · EVIDENCE</text>

      <path d="M310 112 C360 125 386 153 396 190" stroke="#d9631f" strokeWidth="1.7" markerEnd="url(#cycleArrow)"/>
      <path d="M396 260 C380 305 345 327 306 338" stroke="#d9631f" strokeWidth="1.7" markerEnd="url(#cycleArrow)"/>
      <path d="M174 338 C128 326 98 300 84 262" stroke="#d9631f" strokeWidth="1.7" markerEnd="url(#cycleArrow)"/>
      <path d="M84 190 C98 151 130 124 174 112" stroke="#d9631f" strokeWidth="1.7" markerEnd="url(#cycleArrow)"/>

      {[
        [156,72,168,62,"AGENTIC COMMERCE","Orchestrate outcomes"],
        [326,180,132,82,"GOVERNED SDLC","Build with gates"],
        [156,326,168,62,"AGENTIC OPERATIONS","Act and verify"],
        [22,180,132,82,"VERIFIED OUTCOMES","Learn from evidence"],
      ].map(([x,y,w,h,title,subtitle],i)=>(
        <g key={title}>
          <rect x={x} y={y} width={w} height={h} rx="10" fill="rgba(255,255,255,.86)" stroke={i%2===0?"#d9631f":"#2f6fb0"} strokeWidth="1.5"/>
          <text x={x+w/2} y={y+h/2-3} textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="8" fontWeight="500" letterSpacing=".75" fill={i%2===0?"#b94d12":"#2f6fb0"}>{title}</text>
          <text x={x+w/2} y={y+h/2+15} textAnchor="middle" fontFamily="'Manrope',sans-serif" fontSize="9" fontWeight="600" fill="rgba(28,28,30,.62)">{subtitle}</text>
        </g>
      ))}

      <circle cx="240" cy="230" r="67" fill="rgba(255,255,255,.9)" stroke="#d9631f" strokeWidth="1.8"/>
      <text x="240" y="220" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="9" fontWeight="500" letterSpacing=".8" fill="#b94d12">COMPOSITE</text>
      <text x="240" y="234" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="9" fontWeight="500" letterSpacing=".8" fill="#b94d12">CONTEXT</text>
      <text x="240" y="250" textAnchor="middle" fontFamily="'Manrope',sans-serif" fontSize="8.5" fontWeight="600" fill="rgba(28,28,30,.55)">consumed by every stage</text>
      <text x="240" y="263" textAnchor="middle" fontFamily="'Manrope',sans-serif" fontSize="8" fontWeight="600" fill="rgba(28,28,30,.48)">enriched by every outcome</text>
      {[[240,163,240,134],[307,230,326,230],[240,297,240,326],[173,230,154,230]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(28,28,30,.3)" strokeWidth="1.2" strokeDasharray="3 4" markerStart="url(#cycleArrow)" markerEnd="url(#cycleArrow)"/>
      ))}
    </svg>
);

/* ── NAV ── */
const Nav = () => {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const links = [["story","Story"],["architecture","Architecture"],["evidence","Evidence"],["engineering-notes","Engineering Notes"],["team","Creator"]];
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const o = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.3 });
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) o.observe(el); });
    return () => o.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:"1.25rem", padding: solid ? "1.1rem clamp(1.5rem, 4vw, 5rem)" : "1.8rem clamp(1.5rem, 4vw, 5rem)", background: solid||open ? "rgba(255,255,255,.9)" : "transparent", backdropFilter: (solid||open) ? "blur(18px) saturate(140%)" : "none", borderBottom:`1px solid ${(solid||open) ? C.border : "transparent"}`, transition:"all .35s cubic-bezier(.16,1,.3,1)", minWidth:0, maxWidth:"100vw" }}>
        <a href="#" style={{ display:"flex", alignItems:"center", gap:".75rem", fontFamily:"'Manrope',sans-serif", fontSize:"1.05rem", fontWeight:750, letterSpacing:"-.015em", color:C.text, textDecoration:"none", flexShrink:0 }}>
          <span style={{ width:"2rem", height:"2rem", borderRadius:"7px", background:C.accent, display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontSize:".8rem", fontWeight:500, color:"#fff" }}>CT</span>
          Commerce Trust Labs
        </a>
        <div className="nav-links" style={{ flexWrap:"wrap", gap:"clamp(1.25rem, 2vw, 2rem)", minWidth:0 }}>
          {links.map(([id,l]) => (
              <a key={id} href={`#${id}`} className={`nl${active===id?" on":""}`}>{l}</a>
          ))}
        </div>
        <button
            onClick={() => setOpen(o=>!o)}
            className="nav-burger"
            aria-label="Toggle menu"
            style={{ alignItems:"center", justifyContent:"center", width:"2.2rem", height:"2.2rem", background:"transparent", border:`1px solid ${C.border}`, borderRadius:"8px", cursor:"pointer", flexShrink:0 }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ flexShrink:0, display:"block" }}>
            {open
                ? <path d="M1 1l14 10M15 1L1 11" stroke={C.text} strokeWidth="1.4" strokeLinecap="round"/>
                : <><line x1="0" y1="1" x2="16" y2="1" stroke={C.text} strokeWidth="1.4"/><line x1="0" y1="6" x2="16" y2="6" stroke={C.text} strokeWidth="1.4"/><line x1="0" y1="11" x2="16" y2="11" stroke={C.text} strokeWidth="1.4"/></>
            }
          </svg>
        </button>
        <div className={`nav-mobile-panel${open?" open":""}`} style={{ position:"absolute", top:"100%", left:0, right:0, background:"rgba(255,255,255,.97)", backdropFilter:"blur(18px)", borderBottom:`1px solid ${C.border}`, flexDirection:"column", padding:"1rem clamp(1.25rem, 5vw, 3.5rem) 1.6rem", gap:"1.1rem" }}>
          {links.map(([id,l]) => (
              <a key={id} href={`#${id}`} onClick={()=>setOpen(false)} className={`nl${active===id?" on":""}`} style={{ fontSize:".92rem" }}>{l}</a>
          ))}
        </div>
      </nav>
  );
};

/* ── HERO ── */
const Hero = () => {
  const [up, setUp] = useState(false);
  useEffect(() => { const t = setTimeout(() => setUp(true), 80); return () => clearTimeout(t); }, []);
  const a = d => ({ opacity: up?1:0, transform: up?"none":"translateY(20px)", transition:`opacity 1s cubic-bezier(.16,1,.3,1) ${d}ms, transform 1s cubic-bezier(.16,1,.3,1) ${d}ms` });
  return (
      <section style={{ position:"relative", background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden", width:"100%", maxWidth:"100vw" }}>
        <Atmosphere variant="hero"/>
        <div style={inner({ position:"relative", zIndex:1, padding:"10rem clamp(1.25rem, 5vw, 3.5rem) 7rem", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center" })}>
          <div style={{ ...a(60) }}>
            <Eyebrow center>Personal Research &amp; Engineering Portfolio</Eyebrow>
          </div>
          <h1 style={{ ...a(150), fontFamily:"'Manrope',sans-serif", fontSize:"clamp(3rem,7vw,6.5rem)", fontWeight:800, lineHeight:1.0, letterSpacing:"-.04em", color:C.text, maxWidth:"16ch", marginBottom:"2.2rem" }}>
            Where Tokens Become{" "}
            <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>Trusted Actions</em>
          </h1>
          <p style={{ ...a(260), fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"clamp(1.15rem,1.8vw,1.5rem)", lineHeight:1.65, color:"rgba(28,28,30,.72)", maxWidth:"40ch", marginBottom:"3.2rem" }}>
            Personal research and working prototypes exploring how enterprises can turn AI reasoning into authorized, controlled, and verifiable action.
          </p>
          <div style={{ ...a(330), fontFamily:"'DM Mono',monospace", fontSize:".86rem", letterSpacing:".03em", color:"rgba(28,28,30,.55)", lineHeight:1.7, maxWidth:"56ch", marginBottom:"2.6rem" }}>
            Built by <span style={{ color:C.text, fontWeight:600 }}>Pranesh Soma</span> — drawing on nearly two decades of enterprise commerce architecture and engineering leadership.
          </div>
          <div style={{ ...a(400), display:"flex", gap:"1.1rem", flexWrap:"wrap", justifyContent:"center", marginBottom:"4.5rem" }}>
            <a href="#architecture" className="pill">Explore the Architecture →</a>
            <a href="#evidence" className="pill2">Review the Evidence</a>
          </div>
          <div style={{ ...a(480), display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"clamp(2rem, 6vw, 5rem)", width:"100%" }}>
            {[["Composite","Context Model"],["Governed","SDLC Loop"],["Human-Gated","Agentic Ops"]].map(([v,d]) => (
                <div key={v} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.35rem", fontWeight:800, color:C.text, marginBottom:".4rem", letterSpacing:"-.01em" }}>{v}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".74rem", letterSpacing:".16em", textTransform:"uppercase", color:C.accent }}>{d}</div>
                </div>
            ))}
          </div>
        </div>
        <ScrollCue/>
      </section>
  );
};

/* ── generic full-bleed split section ── */
const SplitSection = ({ id, bg, eyebrow, badge, heading, headingEm, body, visual, atmosphere, reverse, alignVisualToContent, children }) => (
    <section id={id} style={{ position:"relative", background:bg, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
      {atmosphere && <Atmosphere variant={atmosphere}/>}
      <div style={inner({ position:"relative", zIndex:1, padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
        <div className={`split-row${reverse?" reverse":""}`}>
          <div className="split-text">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
              {badge && <div style={{ marginTop:"-.8rem", marginBottom:"1.5rem" }}>{badge}</div>}
              <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2.1rem,3.4vw,3.2rem)", fontWeight:800, lineHeight:1.06, letterSpacing:"-.035em", color:C.text, marginBottom:"1.8rem" }}>
                {heading}{" "}
                {headingEm && <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>{headingEm}</em>}
              </h2>
            </Reveal>
            {body && (
                <Reveal delay={140}>
                  <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"1.08rem", lineHeight:1.85, color:"rgba(28,28,30,.66)", maxWidth:"54ch", marginBottom:"2.4rem" }}>{body}</p>
                </Reveal>
            )}
            {children}
          </div>
          <div className={`split-visual${alignVisualToContent?" align-content":""}`}>
            <Reveal delay={100}>{visual}</Reveal>
          </div>
        </div>
      </div>
    </section>
);

/* ── ENGINEERING NOTES ── */
const EngineeringNotes = () => {
  const notes = [
    {
      number:"01", status:"spec", era:"Early 2025 · Agentic Commerce",
      title:"Content inspired the project, but it could not complete the purchase",
      lead:"By March 2025, customers had abundant do-it-yourself videos, articles, and project inspiration. The missing experience was a unified path from that content—or from a customer's own idea—to every compatible item required for the project and a complete, purchasable cart.",
      problem:"Search and recommendations worked one product at a time. The customer still had to interpret the project, derive a bill of materials, determine quantities and compatibility, find each item, recognize catalog gaps, and coordinate the final cart. A chatbot that only answered questions did not remove that work.",
      decision:"Build a supervisor-and-worker orchestrator around the project outcome. A content agent interprets a video, article, link, or natural-language request. A project agent derives steps and required materials. Catalog agents resolve products, price, availability, and substitutes. A cart agent assembles the purchasable result. When the retailer cannot fulfill an item, a marketplace agent can surface an external option rather than leaving the project incomplete.",
      trace:["Customer provides a project idea, video, article, or link","Agents derive steps, materials, tools, quantities, and constraints","Catalog capabilities match available products and substitutes","The orchestrator creates a complete project cart","Missing items route to marketplace options","Unmet purchase intent becomes a catalog-gap signal for merchandising"],
      learned:"The architecture created two connected outcomes: a simpler project-to-cart journey for the customer and a demand-sensing loop for the retailer. External purchase intent revealed precisely which missing products prevented the retailer from owning the complete project. But coordinating content understanding, catalog decisions, cart actions, and feedback across multiple agents introduced a new delivery challenge.",
      next:"That constraint produced the governed software-delivery loop."
    },
    {
      number:"02", status:"prototype", era:"May 2026 · Governed Agentic SDLC",
      title:"Was the value in Claude—or in the engineering loop around it?",
      lead:"Loop Engineering was already producing value in Claude by keeping research, architecture decisions, implementation intent, and validation connected across a long-running engineering problem. In May 2026, I used GitHub Copilot to simulate that workflow and test whether the operating model could survive outside the assistant where it originated.",
      problem:"AI coding assistants typically started each task cold. Architectural decisions, constraints, prior research, and accepted trade-offs had to be rediscovered or manually restated. Even when one long-running Claude workflow accumulated that knowledge successfully, the value was difficult to reproduce, govern, or transfer across tools and engineers.",
      decision:"Make the loop—not the model—the system. A supervisor called the Loop Engine coordinated four phases—Discovery, Design, Build, and Validate—along with their phase transitions, story queue, pre-flight checks, retry logic, persisted pipeline state, and human-in-the-loop gates. Artifact, Evidence, and Product repositories separated what was decided, why it was trusted, and what was being changed. The later reference architecture expanded that operating model into eleven traceable stages.",
      trace:["Discovery maps stakeholders, consumers, pain points, and constraints","Design produces accepted architecture decisions and low-level design","Build decomposes accepted design into planned code and test work","Validate assembles review, shadow, and release evidence","The Loop Engine persists state, manages retries, and stops at human gates","The same workflow is reproduced across assistants without losing its contracts"],
      learned:"The Copilot simulation showed that the durable advantage was not a particular assistant. It was accumulated engineering memory, explicit stage contracts, supervisor-controlled transitions, evidence, and human judgment. But every agent still spent time assembling overlapping fragments of repository, business, runtime, and decision context.",
      next:"That constraint produced Composite Context."
    },
    {
      number:"03", status:"prototype", era:"2026 · Composite Context",
      title:"The expensive part was repeatedly rebuilding reality",
      lead:"An agent rarely fails because the enterprise has no information. It fails because the relevant facts live in different systems, arrive with different freshness, and lose their provenance when compressed into a prompt.",
      problem:"Repository structure, architecture decisions, business rules, runtime telemetry, ownership, policy, and prior outcomes were retrieved independently by each workflow. This increased response latency, duplicated interpretation, and allowed two agents to act from different versions of reality.",
      decision:"Treat context as a governed evidence product. Composite Context assembles claims from authoritative sources, preserves source and freshness metadata, resolves them at organization, domain, application, repository, and workflow scope, and exposes only the minimum evidence required by the current decision.",
      trace:["Resolve the acting identity and scope","Collect claims from authoritative connectors","Mark missing, stale, and conflicting evidence","Assemble a decision-specific context package","Persist accepted decisions and verified outcomes back into context"],
      learned:"Shared context improved consistency, but evidence alone could not decide whether an agent was permitted to act. The architecture still needed a reusable model for confidence, policy, approval, and release readiness.",
      next:"That constraint produced the Engineering Confidence Platform.",
      artifact:{ label:"Context manifest (synthetic example)", lines:[
        "context_id: ctx_9f21  scope: app=checkout-service env=prod",
        "claims:",
        "  - source: service-catalog     freshness: 4m   confidence: high",
        "  - source: runtime-metrics     freshness: 20s  confidence: high",
        "  - source: deploy-history      freshness: 1m   confidence: high",
        "  - source: incident-history    freshness: 2h   confidence: med",
        "excluded: [marketing-copy, unrelated-tenants]   missing: 0  stale: 0",
      ]},
    },
    {
      number:"04", status:"exploration", era:"Exploration · Engineering Confidence",
      title:"Confidence could not be another model-generated number",
      lead:"This chapter is an open exploration, not a built platform. Once AI participated in architecture and software delivery, the important question changed from “Is the answer convincing?” to “What evidence makes this change acceptable at this risk level?” The idea below frames how that could work — it has not been implemented as a standalone system.",
      problem:"A single confidence score hides why a decision is safe. High model certainty cannot compensate for stale context, an unapproved architecture change, missing tests, an unauthorized actor, or an action outside the registered release procedure.",
      decision:"Define confidence structurally. A change earns progression through traceable requirements, accepted decisions, evidence completeness, policy evaluation, risk-tiered human gates, immutable execution intent, and outcome verification. The platform applies those controls at application and repository scope while the delivery loop performs the work.",
      trace:["Evidence establishes what is known","Policy evaluates the proposed action","Risk determines the required authorization","The accepted plan becomes immutable intent","Verification proves the resulting system state"],
      learned:"The same governed-action pattern was not limited to code. Production support had the identical trust problem—only with shorter timelines and a larger blast radius.",
      next:"That constraint produced Agentic Operations."
    },
    {
      number:"05", status:"prototype", era:"2026 · Agentic Operations",
      title:"A successful API call is not a resolved incident",
      lead:"Operational tickets appeared ideal for automation: detect a known symptom, run a standard procedure, and close the incident. The dangerous gap was everything between diagnosis and verified recovery.",
      problem:"An agent could select the wrong procedure, diagnose from incomplete telemetry, mutate a plan after approval, execute with broad credentials, or report success because an API returned 200—even while the customer-facing condition remained broken.",
      decision:"Build an evidence-grounded incident state machine. A synthetic Slack incident matches a registered operating procedure, assembles connector context, produces a claim-linked diagnosis, freezes a remediation plan, evaluates policy, waits at the required human gate, executes through scoped credentials, and closes only after outcome verification.",
      trace:["Trigger → operating procedure match","Context → evidence-grounded diagnosis","Plan → registered action and frozen parameters","Policy → risk decision and human approval","Execution → scoped capability","Verification → observed recovery or rollback"],
      learned:"Software delivery and production operations were using the same primitives: identity, authoritative context, registered actions, policy, authorization, immutable intent, controlled execution, and evidence. Rebuilding those controls per workflow would recreate the fragmentation the work began by removing.",
      next:"That constraint produced the Enterprise Control Plane."
    },
    {
      number:"06", status:"spec", era:"2026 · Enterprise Control Plane",
      title:"The architecture converged on one governed-action model",
      lead:"Agentic Commerce, software delivery, and production operations began as separate problems. Their implementations converged because every enterprise action must answer the same questions before it is trusted.",
      problem:"Who is acting? What authoritative facts support the decision? Is the proposed action registered? Which policy applies at this scope? Who must authorize it? What exactly was approved? Did execution produce the intended outcome?",
      decision:"Place a reusable Enterprise Control Plane between probabilistic reasoning and deterministic enterprise systems. Composite Context supplies governed evidence. Identity, policy, and authorization determine whether an action may proceed. Registered procedures constrain execution. Verification feeds the observed outcome back into the context shared by commerce, engineering, and operations.",
      trace:["Models propose","Composite Context grounds","Policy and people authorize","Registered capabilities execute","Evidence verifies","Outcomes strengthen the next decision"],
      learned:"The result is not a claim that every enterprise workflow is solved. It is a working architectural thesis: intelligence can vary by model and use case, while the infrastructure that converts reasoning into accountable action remains consistent. But operating the loop exposed a new economic constraint: frontier models were repeatedly consuming large volumes of overlapping context even when only part of that evidence required expensive reasoning.",
      next:"That constraint produced the Enterprise Intelligence Control Plane roadmap.",
      artifact:{ label:"Policy decision + registered action (synthetic example)", lines:[
        "decision: REQUIRE_APPROVAL   risk_tier: R2   scope: app=checkout env=prod",
        "actor: agent:ops-investigator   identity: verified   evidence: ctx_9f21",
        "registered_action:",
        "  name: restart_service   params: { version: \"1.3.0\" }  (frozen)",
        "  credential: scoped, single-use   mutation_after_approval: denied",
        "verify: health + error_rate + traffic within recovery window → close",
      ]},
    },
    {
      number:"07", status:"roadmap", era:"Roadmap · Enterprise Intelligence Control Plane",
      title:"The next scarce resource is trustworthy intelligence per token",
      lead:"Once context, policy, approval, execution, and verification were connected, the next question became economic: how can an enterprise provide every agent with sufficient evidence while avoiding repeated, indiscriminate use of the most expensive model and context window?",
      problem:"Existing gateways can route providers, count tokens, cache prompts, and enforce budgets. They do not by themselves determine which evidence deserves tokens, whether excluded context contained a critical constraint, when a lower-cost model is sufficient, or whether optimization reduced the quality of the engineering outcome.",
      decision:"Evolve the earlier reverse-proxy control-plane pattern into an Enterprise Intelligence Control Plane. Claude Code becomes the first client. A transparent intelligence data plane observes requests and establishes a baseline; Composite Context supplies curated evidence through MCP; deterministic hooks enforce task, repository, tool, and approval policy; and risk-aware routing selects context, models, tools, and token budgets. A thin evidence console makes every decision inspectable.",
      trace:["Observe Claude Code sessions without changing behavior","Attribute tokens, cost, cache, latency, and retries to task and repository","Curate the smallest trustworthy context manifest through Composite Context","Enforce deterministic tool and risk policy through hooks","Route routine work economically and escalate when risk or uncertainty requires","Compare savings, latency, quality, and missed-evidence rate against the baseline"],
      learned:"This remains a roadmap, not a completed-product claim. Its success criterion is deliberately harder than reducing spend: demonstrate that token and model optimization preserved required evidence, policy compliance, and outcome quality.",
      next:"Use the least expensive capable intelligence—but make every context and routing decision provable."
    },
  ];
  return (
    <section id="engineering-notes" style={{ position:"relative", background:C.bg3, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
      <Atmosphere variant="warm"/>
      <div style={inner({ position:"relative", zIndex:1, padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
        <Reveal>
          <Eyebrow center>Engineering Notes</Eyebrow>
          <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2.4rem,4.4vw,4.4rem)", fontWeight:800, lineHeight:1.02, letterSpacing:"-.045em", color:C.text, textAlign:"center", maxWidth:"17ch", margin:"0 auto 1.5rem" }}>
            Follow the complete{" "}<em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>decision trail</em>
          </h2>
          <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.06rem", lineHeight:1.8, color:C.muted, textAlign:"center", maxWidth:"66ch", margin:"0 auto 3.5rem" }}>
            Each experiment exposed a constraint the last one could not solve. The mechanisms — context, policy, approval, gateways, agent orchestration — are established patterns; the through-line is the problem-driven sequence and how it composes into one governed-action model. Open a chapter to read the constraint, the decision, and the evidence trail.
          </p>
        </Reveal>
        <div className="note-grid">
          {notes.map((n,i)=>(
            <Reveal key={n.number} delay={(i%2)*80}>
              <details className="note-card" style={{ background:"rgba(255,255,255,.82)", border:`1px solid ${C.border}`, borderRadius:"20px", overflow:"hidden", height:"100%" }}>
                <summary style={{ cursor:"pointer", padding:"2rem", display:"flex", gap:"1.4rem", alignItems:"flex-start" }}>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".82rem", color:C.accent, letterSpacing:".12em", paddingTop:".25rem" }}>{n.number}</span>
                  <span style={{ flex:1, minWidth:0 }}>
                    <span style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:".7rem", marginBottom:".7rem" }}>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".68rem", letterSpacing:".13em", textTransform:"uppercase", color:C.blueHi }}>{n.era}</span>
                      {n.status && <StatusBadge kind={n.status}/>}
                    </span>
                    <span style={{ display:"block", fontFamily:"'Manrope',sans-serif", fontSize:"clamp(1.15rem,1.8vw,1.5rem)", fontWeight:800, letterSpacing:"-.025em", lineHeight:1.2, color:C.text }}>{n.title}</span>
                    <span style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:".72rem", letterSpacing:".04em", color:C.accent, marginTop:".9rem" }}>Open to read the constraint, decision &amp; evidence →</span>
                  </span>
                  <span className="note-plus" aria-hidden="true" style={{ width:"2rem", height:"2rem", borderRadius:"50%", border:`1px solid ${C.border}`, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .25s", fontSize:"1.2rem" }}>+</span>
                </summary>
                <div className="note-story" style={{ borderTop:`1px solid ${C.border}`, padding:"clamp(2rem,5vw,4rem)" }}>
                  <div>
                    <Eyebrow>The constraint</Eyebrow>
                    <p style={{ fontFamily:"'Instrument Serif',serif", fontSize:"1.35rem", lineHeight:1.55, color:C.text, marginBottom:"2rem" }}>{n.problem}</p>
                    <h4 style={{ fontFamily:"'DM Mono',monospace", fontSize:".72rem", letterSpacing:".15em", textTransform:"uppercase", color:C.accent, marginBottom:".8rem" }}>The architecture decision</h4>
                    <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.04rem", lineHeight:1.85, color:"rgba(28,28,30,.66)" }}>{n.decision}</p>
                  </div>
                  <div>
                    <div style={{ background:C.text, borderRadius:"16px", padding:"1.8rem", marginBottom:"1.6rem" }}>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".68rem", letterSpacing:".16em", textTransform:"uppercase", color:"rgba(255,255,255,.46)", marginBottom:"1.1rem" }}>Execution trace</div>
                      {n.trace.map((step,j)=>(
                        <div key={step} style={{ display:"grid", gridTemplateColumns:"1.5rem 1fr", gap:".7rem", alignItems:"start", fontFamily:"'DM Mono',monospace", fontSize:".82rem", lineHeight:1.6, color:"rgba(255,255,255,.82)", padding: j?".65rem 0 0":"0" }}>
                          <span style={{ color:C.accent }}>{String(j+1).padStart(2,"0")}</span><span>{step}</span>
                        </div>
                      ))}
                    </div>
                    <h4 style={{ fontFamily:"'DM Mono',monospace", fontSize:".72rem", letterSpacing:".15em", textTransform:"uppercase", color:C.blueHi, marginBottom:".8rem" }}>What it revealed</h4>
                    <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.04rem", lineHeight:1.8, color:"rgba(28,28,30,.66)", marginBottom:"1.4rem" }}>{n.learned}</p>
                    <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"1.2rem", lineHeight:1.5, color:C.accent, borderLeft:`2px solid ${C.accent}`, paddingLeft:"1rem", marginBottom:n.artifact?"1.6rem":0 }}>{n.next}</p>
                    {n.artifact && (
                        <div style={{ background:C.text, borderRadius:"14px", padding:"1.4rem 1.5rem", overflowX:"auto" }}>
                          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,.46)", marginBottom:".9rem" }}>{n.artifact.label}</div>
                          <div style={{ minWidth:"max-content" }}>
                            {n.artifact.lines.map((ln,k)=>(
                                <div key={k} style={{ fontFamily:"'DM Mono',monospace", fontSize:".74rem", lineHeight:1.75, color: k===0?"#7bafe0":"rgba(255,255,255,.8)", whiteSpace:"pre" }}>{ln}</div>
                            ))}
                          </div>
                        </div>
                    )}
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <div style={{ marginTop:"3.5rem", borderTop:`1px solid ${C.border}`, paddingTop:"2.5rem" }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".2em", textTransform:"uppercase", color:C.accent, marginBottom:"1.4rem", textAlign:"center" }}>Repositories &amp; writing</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:C.border, border:`1px solid ${C.border}`, borderRadius:"16px", overflow:"hidden", maxWidth:"860px", margin:"0 auto" }}>
              {[
                ["Implementation","agentic-sdlc-loop","Reference implementation of the governed delivery loop — supervisor orchestration, stage transitions, human gates, evidence flow.","https://github.com/PraneshSoma/agentic-sdlc-loop","GitHub ↗"],
                ["Reference Architecture","loop-engineering","Companion architecture: stage contracts, acceptance gates, traceability, and the audit model.","https://github.com/PraneshSoma/loop-engineering","GitHub ↗"],
                ["Platform","agentic-operations-platform","The Agentic Operations runtime — trigger, context, diagnosis, policy, approval, execution, verification.",null,"Private repository"],
                ["Article","AI Agents Are the New Bot Traffic","Why agentic, machine-speed traffic breaks commerce infrastructure built for humans — and why it needs a governance and control plane.","https://medium.com/@praneshsoma/ai-agents-are-the-new-bot-traffic-and-commerce-infrastructure-isnt-ready-35e12e01158d","Read ↗"],
                ["Article","Retry Storms in Distributed Commerce Infrastructure","Cascading failure patterns in high-volume retail systems, and patterns for resilient distributed commerce.","https://medium.com/@praneshsoma/retry-storms-139869b956e3","Read ↗"],
              ].map(([type,title,desc,href,label])=>(
                  <div key={title} className="row research-row" style={{ background:C.bg, padding:"1.5rem 1.8rem", alignItems:"center", transition:"background .25s" }}>
                    <div className="research-type" style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".15em", textTransform:"uppercase", color:C.accent }}>{type}</div>
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:"1.02rem", color:C.text, marginBottom:".3rem" }}>{title}</div>
                      <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".92rem", color:"rgba(28,28,30,.6)", lineHeight:1.6 }}>{desc}</div>
                    </div>
                    {href
                        ? <a href={href} target="_blank" rel="noreferrer" className="lk research-action">{label}</a>
                        : <span className="research-action" style={{ fontFamily:"'DM Mono',monospace", fontSize:".74rem", color:C.muted, whiteSpace:"nowrap" }}>{label}</span>}
                  </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:".74rem", lineHeight:1.8, color:"rgba(28,28,30,.42)", maxWidth:"78ch", margin:"2.5rem auto 0", textAlign:"center" }}>
            These are generalized architecture stories and synthetic execution examples from independent research prototypes. They do not describe or disclose any employer or client system.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

/* ── SYSTEM BOUNDARIES ── */
const Boundaries = () => {
  const items = [
    ["Context freshness at scale","Keeping assembled evidence current across many authoritative systems, without paying a prohibitive latency or cost penalty on every decision."],
    ["Conflicting authoritative sources","When two systems of record disagree, deciding which claim wins — and proving the choice — is not yet a solved, general mechanism."],
    ["Policy evolution & versioning","Policies change. Reconciling a decision made under an old policy with the version in force at execution time remains an open design problem."],
    ["Measuring false confidence","The hardest metric: detecting when optimization or a confident model quietly dropped a constraint that mattered. Missed-evidence rate is proposed, not proven."],
    ["Long-running workflow recovery","Resuming or rolling back a multi-stage agentic workflow after partial failure — without losing evidence or re-authorizing everything — is unresolved."],
    ["Cross-organization authorization","Authorizing action across team, tenant, and organizational boundaries, with identity and policy that hold up, is designed but not exercised at scale."],
    ["Cost versus evidence completeness","The core tension of the roadmap: reduce cost without omitting evidence. Where the honest trade-off sits is exactly what the next experiment is meant to test."],
    ["Governance overhead at low risk","Whether the full governed-action model stays worth its overhead at lower-risk tiers, or needs a lighter path, is an open question about adoption."],
  ];
  return (
      <section id="boundaries" style={{ position:"relative", background:C.bg, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
        <div style={inner({ padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
          <Reveal>
            <Eyebrow center>What Remains Unresolved</Eyebrow>
            <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2.1rem,3.4vw,3.2rem)", fontWeight:800, lineHeight:1.06, letterSpacing:"-.035em", color:C.text, textAlign:"center", maxWidth:"20ch", margin:"0 auto 1.2rem" }}>
              The open problems,{" "}
              <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>stated plainly</em>
            </h2>
            <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"1.08rem", lineHeight:1.75, color:C.muted, textAlign:"center", maxWidth:"60ch", margin:"0 auto 3.5rem" }}>
              Naming what a design does not yet solve is part of the engineering. These are the constraints this work has surfaced but not closed &mdash; the more precisely they are stated, the more credible the parts that do work.
            </p>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"1.25rem" }}>
            {items.map(([t,b],i)=>(
                <Reveal key={t} delay={(i%3)*80}>
                  <div style={{ background:C.glass, border:`1px solid ${C.border}`, borderLeft:`2px solid ${C.muted}`, borderRadius:"16px", padding:"2rem", height:"100%" }}>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".68rem", letterSpacing:".16em", textTransform:"uppercase", color:C.muted, marginBottom:".9rem" }}>Open {String(i+1).padStart(2,"0")}</div>
                    <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.05rem", fontWeight:700, color:C.text, marginBottom:".7rem", lineHeight:1.25 }}>{t}</h3>
                    <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"1rem", lineHeight:1.75, color:"rgba(28,28,30,.62)" }}>{b}</p>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
};

/* ── MILESTONES (double-arc career timeline) ── */
const Milestones = () => {
  const bez = (P0,P1,P2,t) => { const m=1-t; return [ m*m*P0[0]+2*m*t*P1[0]+t*t*P2[0], m*m*P0[1]+2*m*t*P1[1]+t*t*P2[1] ]; };
  const eP=[[130,342],[600,14],[1070,342]];
  const aP=[[178,342],[600,120],[1022,342]];
  const enterprise=[
    {t:0.03,y:"2006",a:"Commerce",b:"foundations"},
    {t:0.1475,y:"2013–17",a:"Cloud migration",b:"monolith → microservices"},
    {t:0.265,y:"2018",a:"Traffic Manager",b:"reverse-proxy control"},
    {t:0.3825,y:"2019",a:"Cart Commons",b:"shared capabilities"},
    {t:0.50,y:"2019",a:"B2B Commerce",b:"enterprise buyers"},
    {t:0.6175,y:"2021–23",a:"Reactive checkout",b:"~3× throughput"},
    {t:0.735,y:"2023–24",a:"eProcurement",b:"25+ engineer team"},
    {t:0.8525,y:"2024–25",a:"Custom Product",b:"offering + search"},
    {t:0.97,y:"2026",a:"Customer Platform",b:"graph → Cassandra"},
  ];
  const ai=[
    {t:0.03,y:"Early 2025",a:"Agentic Commerce"},
    {t:0.187,y:"2025",a:"Repo Compare"},
    {t:0.343,y:"2025",a:"Multi-Agent Commerce"},
    {t:0.50,y:"2026",a:"Governed SDLC Loop"},
    {t:0.657,y:"2026",a:"Composite Context"},
    {t:0.813,y:"2026",a:"Agentic Ops"},
    {t:0.97,y:"2026",a:"Enterprise Control Plane"},
  ];
  const ePath=`M${eP[0][0]} ${eP[0][1]} Q ${eP[1][0]} ${eP[1][1]} ${eP[2][0]} ${eP[2][1]}`;
  const aPath=`M${aP[0][0]} ${aP[0][1]} Q ${aP[1][0]} ${aP[1][1]} ${aP[2][0]} ${aP[2][1]}`;
  return (
      <div style={{ marginTop:"3.5rem" }}>
        <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"1.6rem", marginBottom:"2.2rem" }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:".5rem", fontFamily:"'DM Mono',monospace", fontSize:".78rem", letterSpacing:".12em", textTransform:"uppercase", color:C.muted }}>
            <span style={{ width:".7rem", height:".7rem", borderRadius:"50%", background:C.blueHi }}/> Enterprise commerce
          </span>
          <span style={{ display:"inline-flex", alignItems:"center", gap:".5rem", fontFamily:"'DM Mono',monospace", fontSize:".78rem", letterSpacing:".12em", textTransform:"uppercase", color:C.muted }}>
            <span style={{ width:".7rem", height:".7rem", borderRadius:"50%", background:C.accent }}/> Agentic AI architecture
          </span>
        </div>
          <Reveal delay={150}>
            <div style={{ overflowX:"auto", paddingBottom:".5rem" }}>
              <svg viewBox="0 68 1200 372" style={{ width:"100%", minWidth:"1000px", height:"auto", display:"block" }}>
                <defs>
                  <linearGradient id="eg" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2f6fb0"/><stop offset="55%" stopColor="#4f74c0"/><stop offset="100%" stopColor="#6a54b8"/>
                  </linearGradient>
                  <linearGradient id="ag" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#d9631f"/><stop offset="60%" stopColor="#dd7a24"/><stop offset="100%" stopColor="#e0a636"/>
                  </linearGradient>
                </defs>
                <line x1="70" y1="342" x2="1130" y2="342" stroke={C.border} strokeWidth="1"/>
                {/* soft rainbow bands */}
                <path d={ePath} stroke="url(#eg)" strokeWidth="12" fill="none" opacity="0.10" strokeLinecap="round"/>
                <path d={aPath} stroke="url(#ag)" strokeWidth="12" fill="none" opacity="0.10" strokeLinecap="round"/>
                <path d={ePath} stroke="url(#eg)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <path d={aPath} stroke="url(#ag)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                {enterprise.map((m,i)=>{ const [x,y]=bez(eP[0],eP[1],eP[2],m.t); const far=i%2===1; const dY=far?110:162; return (
                    <g key={"e"+i}>
                      <line x1={x} y1={y-6} x2={x} y2={dY+4} stroke="rgba(28,28,30,0.09)" strokeWidth="1"/>
                      <circle cx={x} cy={y} r="4.5" fill="#fff" stroke={C.blueHi} strokeWidth="2"/>
                      <text x={x} y={dY-30} textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="10.5" letterSpacing="0.5" fill={C.blueHi}>{m.y}</text>
                      <text x={x} y={dY-15} textAnchor="middle" fontFamily="'Manrope',sans-serif" fontSize="13.5" fontWeight="700" fill={C.text}>{m.a}</text>
                      <text x={x} y={dY} textAnchor="middle" fontFamily="'Manrope',sans-serif" fontSize="10.5" fill={C.muted}>{m.b}</text>
                    </g>
                ); })}
                {ai.map((m,i)=>{ const [x,y]=bez(aP[0],aP[1],aP[2],m.t); const far=i%2===1; const yY=far?410:372; return (
                    <g key={"a"+i}>
                      <line x1={x} y1={y+6} x2={x} y2={yY-11} stroke="rgba(28,28,30,0.09)" strokeWidth="1"/>
                      <circle cx={x} cy={y} r="4.5" fill="#fff" stroke={C.accent} strokeWidth="2"/>
                      <text x={x} y={yY} textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="10.5" letterSpacing="0.5" fill={C.accent}>{m.y}</text>
                      <text x={x} y={yY+16} textAnchor="middle" fontFamily="'Manrope',sans-serif" fontSize="13.5" fontWeight="700" fill={C.text}>{m.a}</text>
                    </g>
                ); })}
              </svg>
            </div>
            <div className="arc-hint" style={{ textAlign:"center", marginTop:".6rem", fontFamily:"'DM Mono',monospace", fontSize:".7rem", letterSpacing:".18em", textTransform:"uppercase", color:C.muted }}>Scroll the timeline →</div>
          </Reveal>
      </div>
  );
};

/* ── ORIGIN / FOUNDER ── */
const Team = () => (
    <section id="team" style={{ position:"relative", background:C.bg, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
      <div style={inner({ position:"relative", zIndex:1, padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
        <Reveal>
          <Eyebrow center>Career Arc · Creator</Eyebrow>
          <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2.1rem,3.4vw,3.2rem)", fontWeight:800, lineHeight:1.06, letterSpacing:"-.035em", color:C.text, textAlign:"center", maxWidth:"22ch", margin:"0 auto 1.2rem" }}>
            From commerce systems to{" "}
            <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>governed autonomy</em>
          </h2>
          <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"1.08rem", lineHeight:1.75, color:C.muted, textAlign:"center", maxWidth:"62ch", margin:"0 auto" }}>
            Commerce Trust Labs did not begin with AI. It evolved from nearly two decades of building enterprise commerce systems—translating the same disciplines of control, evidence, resilience, and safe migration into governed infrastructure for AI-driven action.
          </p>
        </Reveal>
        <Milestones/>
        <Reveal delay={100}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"3.5rem", alignItems:"start", border:`1px solid ${C.border}`, borderRadius:"24px", padding:"3rem", background:C.glass, minWidth:0, maxWidth:"960px", margin:"5rem auto 0" }}>
            <div style={{ flexShrink:0, minWidth:0, width:"220px", margin:"0 auto" }}>
              <div style={{ width:"100%", aspectRatio:"3/4", background:C.bg2, borderRadius:"16px", border:`1px solid ${C.border}`, marginBottom:"1.2rem", position:"relative", overflow:"hidden" }}>
                <img src="/Pranesh.PNG" alt="Pranesh Soma" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }}/>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px", background:C.accent }}/>
              </div>
              <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.05rem", fontWeight:700, color:C.text, marginBottom:".3rem", textAlign:"center" }}>Pranesh Soma</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".72rem", letterSpacing:".1em", textTransform:"uppercase", color:C.accent, textAlign:"center" }}>Creator &amp; Principal Architect</div>
            </div>
            <div style={{ minWidth:0, flex:"1 1 320px" }}>
              <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(1.35rem,2.2vw,1.9rem)", fontWeight:800, lineHeight:1.14, letterSpacing:"-.035em", color:C.text, marginBottom:"1.6rem" }}>
                Experience transformed into{" "}
                <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>reference architecture</em>
              </h3>
              <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"1.05rem", lineHeight:1.85, color:"rgba(28,28,30,.64)", marginBottom:"1.4rem" }}>
                A distributed-systems architect with close to two decades designing large-scale enterprise commerce systems — cart, checkout, pricing, identity, platform traffic, modernization, and complex data migrations. Commerce Trust Labs turns that experience into independent research on governed AI action.
              </p>
              <details className="career-details">
                <summary style={{ cursor:"pointer", listStyle:"none", display:"inline-flex", alignItems:"center", gap:".5rem", fontFamily:"'DM Mono',monospace", fontSize:".74rem", letterSpacing:".05em", color:C.accent }}>
                  <span className="career-plus" style={{ display:"inline-block", transition:"transform .2s" }}>+</span> View career story
                </summary>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"1.02rem", lineHeight:1.85, color:"rgba(28,28,30,.6)", marginTop:"1rem" }}>
                  The through-line runs from core commerce systems, through cloud and microservices, traffic and release infrastructure, and reactive and B2B platforms, into governed agentic systems: the planner-and-worker model behind Agentic Commerce, the governed software-delivery loop, the composite-context model, and the Agentic Operations runtime — unified by the Enterprise Control Plane through shared context, policy, authorization, and evidence between AI reasoning and enterprise action.
                </p>
              </details>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
);

/* ── FOOTER ── */
const Footer = () => (
    <footer style={{ background:C.bg2, borderTop:`1px solid ${C.border}`, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
      <div style={inner({ padding:"4rem clamp(1.25rem, 5vw, 3.5rem) 3rem", display:"flex", flexWrap:"wrap", gap:"2rem", alignItems:"end" })}>
        <div style={{ minWidth:0, flex:"1 1 300px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:".8rem" }}>
            <span style={{ width:"1.6rem", height:"1.6rem", borderRadius:"6px", background:C.accent, display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontSize:".72rem", color:"#fff" }}>CT</span>
            <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.1rem", fontWeight:800, color:C.text }}>Commerce Trust Labs</div>
          </div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".76rem", color:C.muted, marginBottom:"1rem" }}>Agentic Infrastructure for Enterprise Commerce — Atlanta, Georgia, USA</div>
          <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".82rem", color:"rgba(28,28,30,.38)", lineHeight:1.8, maxWidth:"62ch" }}>
            Commerce Trust Labs is an independent personal research and engineering initiative exploring governed infrastructure between AI reasoning and enterprise action. The views, prototypes, and reference architectures are the creator's own; they are not affiliated with or endorsed by any employer or client and contain only generalized, publicly shareable material.
          </div>
        </div>
        <div style={{ textAlign:"right", fontFamily:"'DM Mono',monospace", fontSize:".8rem", lineHeight:2.4, minWidth:0, flex:"1 1 200px" }}>
          {[["commercetrustlabs.org","https://commercetrustlabs.org"],["github.com/PraneshSoma","https://github.com/PraneshSoma"],["contact@commercetrustlabs.org","mailto:contact@commercetrustlabs.org"]].map(([label,href]) => (
              <div key={label}><a href={href} className="fl">{label}</a></div>
          ))}
          <div style={{ color:"rgba(28,28,30,.14)", marginTop:".5rem", fontSize:".72rem" }}>© 2026 Commerce Trust Labs. All rights reserved.</div>
        </div>
      </div>
    </footer>
);

/* ── ORIGIN STORY (single detailed opening) ── */
const OriginStory = () => (
    <SplitSection id="story" bg={C.bg2} eyebrow="The Origin" badge={<StatusBadge kind="spec"/>}
      heading="One customer problem started" headingEm="all of it"
      body="Project-based shopping had plenty of inspiration and no execution. A customer could find content for a project, but nothing assembled the complete, purchasable set of items that project required. Agentic Commerce began as the experiment to close that gap."
      visual={<OrchestratorGraphic/>}>
      <div style={{ display:"flex", flexDirection:"column", gap:"1.4rem", marginBottom:"2rem" }}>
        {[
          ["The problem I observed","Project content could inspire a customer but could not assemble a complete, purchasable project — the bill of materials, quantities, compatibility, and cart were left to the person. (Do-it-yourself is one example of project-based shopping, not the whole of it.)"],
          ["The experiment","A supervisor coordinated content, project-planning, catalog, availability, marketplace, and cart capabilities into a single outcome: a ready-to-buy project cart."],
          ["The business loop","When the retailer could not fulfil an item, that missing-product intent became structured merchandising intelligence — a catalog-gap signal, not a dead end."],
        ].map(([t,b],i)=>(
            <Reveal key={t} delay={220+i*70}>
              <div style={{ borderLeft:`2px solid ${C.accent}`, paddingLeft:"1.5rem" }}>
                <h4 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.08rem", fontWeight:700, color:C.text, marginBottom:".4rem" }}>{t}</h4>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"1rem", lineHeight:1.75, color:"rgba(28,28,30,.62)" }}>{b}</p>
              </div>
            </Reveal>
        ))}
      </div>
      <Reveal delay={460}>
        <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"1.4rem", lineHeight:1.55, color:C.text, borderLeft:`3px solid ${C.accent}`, paddingLeft:"1.4rem" }}>
          Coordinating intelligent agents was possible. Trusting their actions was the harder problem — and that problem is what the rest of this work is about.
        </p>
      </Reveal>
    </SplitSection>
);

/* ── ONE ACCUMULATED ARCHITECTURE ── */
const Architecture = () => {
  const rows = [
    ["Agentic Commerce","Orchestrates a customer outcome","spec"],
    ["Governed Agentic SDLC","Builds and changes capabilities safely","prototype"],
    ["Composite Context","Supplies authoritative, traceable evidence","prototype"],
    ["Agentic Operations","Executes governed operational remediation","prototype"],
    ["Enterprise Control Plane","Applies shared identity, policy, authorization, and verification","spec"],
    ["Intelligence Control Plane","Future optimization — token and model economics","roadmap"],
  ];
  return (
      <section id="architecture" style={{ position:"relative", background:C.bg, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
        <div style={inner({ padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
          <Reveal>
            <Eyebrow center>One Accumulated Architecture</Eyebrow>
            <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2.1rem,3.4vw,3.2rem)", fontWeight:800, lineHeight:1.06, letterSpacing:"-.035em", color:C.text, textAlign:"center", maxWidth:"22ch", margin:"0 auto 1.4rem" }}>
              One governed-action{" "}
              <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>architecture</em>
            </h2>
            <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"1.08rem", lineHeight:1.8, color:C.muted, textAlign:"center", maxWidth:"64ch", margin:"0 auto 3.5rem" }}>
              Each experiment exposed a constraint the last one could not solve. The result is not six products — it is one model: an action is trusted only when it is grounded in authoritative context, authorized by policy and a human at the right risk, executed through a registered procedure, and verified by evidence. Composite Context feeds that model; the Enterprise Control Plane governs it.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ maxWidth:"600px", margin:"0 auto 3.5rem" }}><CompassGraphic/></div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:C.border, border:`1px solid ${C.border}`, borderRadius:"18px", overflow:"hidden", maxWidth:"960px", margin:"0 auto" }}>
              {rows.map(([name,resp,st])=>(
                  <div key={name} className="row" style={{ display:"grid", gridTemplateColumns:"minmax(0,1fr) auto", gap:"1.5rem", alignItems:"center", background:C.bg, padding:"1.5rem 1.9rem", transition:"background .25s" }}>
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:750, fontSize:"1.06rem", color:C.text, marginBottom:".3rem" }}>{name}</div>
                      <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".98rem", lineHeight:1.6, color:"rgba(28,28,30,.6)" }}>{resp}</div>
                    </div>
                    <StatusBadge kind={st}/>
                  </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
  );
};

/* ── THREE PROOF-BACKED CASE STUDIES ── */
const CaseStudies = () => {
  const cases = [
    {
      k:"01", title:"Project to cart", kind:"spec", evidence:"Orchestration diagram + synthetic trace",
      problem:"Project content could inspire a purchase but never assemble a complete, purchasable project.",
      designed:"A supervisor-and-worker orchestration over content, project-planning, catalog, availability, marketplace, and cart.",
      result:"Takes a project request to a complete cart, and converts unmet demand into structured merchandising signal.",
      built:"A multi-agent reference architecture — design and orchestration, not a shipped runtime — covering the full project-to-cart path with marketplace fallback.",
      proved:"Missing-product intent can be captured as structured merchandising signal — the outcome, not just the answer, is the product.",
      open:"Catalog-scale grounding and substitution quality across a real assortment remain to be validated.",
      trace:[
        ["t0","REQUEST","project brief received — video, article, or prompt"],
        ["t1","PLAN","content + project agents derive steps, materials, quantities"],
        ["t2","RESOLVE","catalog agents match SKUs, price, availability"],
        ["t3","GAP","unmet item → marketplace option; logged as catalog-gap signal"],
        ["t4","CART","supervisor assembles complete, purchasable project cart"],
      ],
    },
    {
      k:"02", title:"Governed delivery loop", kind:"prototype",
      problem:"AI coding assistants start each task cold; architecture, constraints, and prior decisions get rediscovered every time.",
      designed:"An 11-stage delivery loop where the loop — not the assistant — is the system: discovery, ADR, LLD, code/test gen, review, shadow, release, behind human gates.",
      result:"A portable, evidence-gated delivery loop — proven by rebuilding it on a different assistant.",
      built:"A supervisor-led state machine with persisted state, retries, evidence, and human gates; proven portable by rebuilding it as a Copilot simulation.",
      proved:"The durable value was the structure and accumulated engineering memory, not any single assistant.",
      open:"Tiered adoption and audit at multi-team scale is designed but not operated in production.",
      repos:[["agentic-sdlc-loop","https://github.com/PraneshSoma/agentic-sdlc-loop"],["loop-engineering","https://github.com/PraneshSoma/loop-engineering"]],
    },
    {
      k:"03", title:"Governed incident remediation", kind:"prototype", evidence:"Synthetic demo + immutable event trace",
      problem:"A successful API call is not a resolved incident; agents can diagnose from partial telemetry or report false recovery.",
      designed:"An evidence-grounded incident state machine: trigger, context, diagnosis, frozen plan, policy, human gate, scoped execution, verification.",
      result:"Incidents close only on verified recovery, executed on scoped credentials after a human gate.",
      built:"A synthetic incident that runs end-to-end — agents never hold production credentials; a separate layer executes a registered action only after approval.",
      proved:"An incident closes only on verified recovery; an approved plan is immutable and runs on scoped credentials.",
      open:"Real-world telemetry noise, multi-service blast radius, and rollback under partial failure are not yet exercised.",
      trace:[
        ["10:42","TRIGGER","error spike reported on checkout-service"],
        ["10:42","CONTEXT","assembled (missing: 0, stale: 0)"],
        ["10:42","DIAGNOSED","deploy-induced spike — evidence-grounded"],
        ["10:42","POLICY","R2 action in production → REQUIRE_APPROVAL"],
        ["10:47","APPROVED","senior_oncall — registered R2 remediation"],
        ["10:47","EXECUTING","restart_service under scoped credential"],
        ["10:49","RESOLVED","outcome verified — evidence ledger updated"],
      ],
    },
  ];
  const Field = ({ label, children, color }) => (
      <div style={{ marginBottom:"1rem" }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".16em", textTransform:"uppercase", color:color||C.muted, marginBottom:".35rem" }}>{label}</div>
        <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".98rem", lineHeight:1.65, color:"rgba(28,28,30,.68)" }}>{children}</div>
      </div>
  );
  return (
      <section id="evidence" style={{ position:"relative", background:C.bg3, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
        <div style={inner({ padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
          <Reveal>
            <Eyebrow center>Evidence · Case Studies</Eyebrow>
            <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2.1rem,3.4vw,3.2rem)", fontWeight:800, lineHeight:1.06, letterSpacing:"-.035em", color:C.text, textAlign:"center", maxWidth:"20ch", margin:"0 auto 1.2rem" }}>
              Three experiments,{" "}
              <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>with the proof</em>
            </h2>
            <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"1.08rem", lineHeight:1.75, color:C.muted, textAlign:"center", maxWidth:"58ch", margin:"0 auto 3.5rem" }}>
              Each answers the same five questions: what problem existed, what I designed, what I built, what it proved, and what remains unresolved.
            </p>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:"1.4rem", alignItems:"start" }}>
            {cases.map((c)=>(
                <Reveal key={c.k}>
                  <div style={{ background:"rgba(255,255,255,.7)", border:`1px solid ${C.border}`, borderRadius:"22px", padding:"2.4rem", height:"100%" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:".8rem", marginBottom:"1.4rem" }}>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".72rem", color:C.accent, letterSpacing:".12em" }}>{c.k}</span>
                      <StatusBadge kind={c.kind}/>
                    </div>
                    <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.4rem", fontWeight:800, letterSpacing:"-.02em", color:C.text, marginBottom:"1.5rem" }}>{c.title}</h3>
                    <Field label="Problem">{c.problem}</Field>
                    <Field label="Architectural decision" color={C.accent}>{c.designed}</Field>
                    <Field label="Demonstrated result" color={C.blueHi}>{c.result}</Field>
                    <div style={{ marginTop:"1.2rem", paddingTop:"1.2rem", borderTop:`1px solid ${C.border}`, display:"flex", flexWrap:"wrap", gap:"1rem", alignItems:"center" }}>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", letterSpacing:".16em", textTransform:"uppercase", color:C.muted }}>Evidence</span>
                      {c.repos
                          ? c.repos.map(([l,h])=>(<a key={l} href={h} target="_blank" rel="noreferrer" className="lk">{l} ↗</a>))
                          : <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".72rem", color:C.text, opacity:.75 }}>{c.evidence}</span>}
                    </div>
                    <details className="career-details" style={{ marginTop:"1.2rem" }}>
                      <summary style={{ cursor:"pointer", listStyle:"none", display:"inline-flex", alignItems:"center", gap:".5rem", fontFamily:"'DM Mono',monospace", fontSize:".7rem", letterSpacing:".05em", color:C.accent }}>
                        <span className="career-plus" style={{ display:"inline-block", transition:"transform .2s" }}>+</span> Built · proved · unresolved
                      </summary>
                      <div style={{ marginTop:"1.2rem" }}>
                        <Field label="Built" color={C.accent}>{c.built}</Field>
                        {c.trace && (
                            <div style={{ background:C.text, borderRadius:"12px", padding:"1rem 1.1rem", margin:".4rem 0 1rem", overflowX:"auto" }}>
                              <div style={{ minWidth:"max-content" }}>
                                {c.trace.map(([t,st,msg],j)=>(
                                    <div key={j} style={{ display:"flex", gap:".7rem", fontFamily:"'DM Mono',monospace", fontSize:".66rem", lineHeight:1.9, whiteSpace:"nowrap" }}>
                                      <span style={{ color:"rgba(255,255,255,.35)" }}>{t}</span>
                                      <span style={{ color: st==="APPROVED"||st==="RESOLVED"||st==="CART"?C.accent:"#7bafe0", width:"5.6rem", flexShrink:0 }}>{st}</span>
                                      <span style={{ color:"rgba(255,255,255,.8)" }}>{msg}</span>
                                    </div>
                                ))}
                              </div>
                            </div>
                        )}
                        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", letterSpacing:".14em", textTransform:"uppercase", color:"rgba(28,28,30,.4)", marginTop:"-.4rem", marginBottom:"1rem" }}>{c.trace ? "Illustrative synthetic trace — not a real system record" : ""}</div>
                        <Field label="Proved" color={C.blueHi}>{c.proved}</Field>
                        <Field label="Unresolved">{c.open}</Field>
                      </div>
                    </details>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
};

/* ── ROADMAP (condensed to one card) ── */
const RoadmapNext = () => (
    <section id="roadmap" style={{ position:"relative", background:C.text, color:"#fff", width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 80% 20%, rgba(47,111,176,.24), transparent 38%), radial-gradient(circle at 15% 80%, rgba(217,99,31,.18), transparent 36%)" }}/>
      <div style={inner({ position:"relative", zIndex:1, padding:"7rem clamp(1.25rem, 5vw, 3.5rem)" })}>
        <Reveal>
          <div style={{ maxWidth:"820px", margin:"0 auto", textAlign:"center" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:".45rem", fontFamily:"'DM Mono',monospace", fontSize:".62rem", fontWeight:500, letterSpacing:".16em", textTransform:"uppercase", color:"#ed8a4d", background:"rgba(237,138,77,.12)", border:"1px solid #ed8a4d", borderRadius:"999px", padding:".34rem .8rem", marginBottom:"1.8rem" }}>
              <span style={{ width:".4rem", height:".4rem", borderRadius:"50%", background:"#ed8a4d" }}/>Roadmap · Not Built
            </div>
            <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2rem,3.4vw,3rem)", fontWeight:800, lineHeight:1.1, letterSpacing:"-.035em", color:"#fff", marginBottom:"1.6rem" }}>
              Next experiment:{" "}
              <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:"#ed8a4d" }}>intelligence economics</em>
            </h2>
            <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.06rem", lineHeight:1.8, color:"rgba(255,255,255,.66)", marginBottom:"3rem" }}>
              The next experiment applies reverse-proxy principles to AI-assisted engineering: select the task-relevant context, model, tools, governance path, and token budget for each request. The test is not whether it reduces tokens — it is whether it lowers cost without omitting evidence or weakening the outcome.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1px", background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.12)", borderRadius:"16px", overflow:"hidden", maxWidth:"900px", margin:"0 auto" }}>
            {[
              ["Planned experiment","A transparent intelligence data plane in front of Claude Code, curating context via MCP and enforcing policy via deterministic hooks."],
              ["How I'll measure it","Cost and latency against a baseline, held next to a missed-evidence rate and engineering-outcome quality — not spend alone."],
              ["Not built yet","Routing, token budgeting, and the evidence console are design and hypothesis; nothing here is a shipped capability."],
            ].map(([t,b])=>(
                <div key={t} style={{ background:"#1d1d22", padding:"1.6rem" }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".6rem", letterSpacing:".16em", textTransform:"uppercase", color:"#ed8a4d", marginBottom:".7rem" }}>{t}</div>
                  <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".92rem", lineHeight:1.7, color:"rgba(255,255,255,.62)" }}>{b}</div>
                </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
);

/* ── HIRING / CONTACT ── */
const Hiring = () => (
    <section id="contact" style={{ position:"relative", background:C.bg2, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
      <div style={inner({ padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
        <div className="split-row" style={{ alignItems:"flex-start" }}>
          <div className="split-text">
            <Reveal>
              <Eyebrow>What I Bring</Eyebrow>
              <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2.1rem,3.4vw,3.2rem)", fontWeight:800, lineHeight:1.08, letterSpacing:"-.035em", color:C.text, marginBottom:"1.8rem" }}>
                Find the binding constraint.{" "}
                <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>Change the architecture around it.</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"1.08rem", lineHeight:1.85, color:"rgba(28,28,30,.66)", maxWidth:"54ch", marginBottom:"2.4rem" }}>
                I work at the intersection of enterprise platforms, distributed systems, engineering leadership, and governed AI. My strength is identifying the constraint that actually binds, changing the architecture around it, and carrying the decision through implementation, migration, operational evidence, and organizational adoption.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"1rem" }}>
                <a href="#evidence" className="pill">Review Technical Work →</a>
                <a href="https://github.com/PraneshSoma" target="_blank" rel="noreferrer" className="pill2">GitHub</a>
                <a href="mailto:contact@commercetrustlabs.org" className="pill2">Contact</a>
              </div>
            </Reveal>
          </div>
          <div className="split-visual">
            <Reveal delay={100}>
              <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:C.border, border:`1px solid ${C.border}`, borderRadius:"18px", overflow:"hidden" }}>
                {[
                  "Platform & distributed-systems architecture",
                  "Large-scale modernization & migration",
                  "Multi-team engineering leadership",
                  "Governed agentic-system design",
                ].map((cap,i)=>(
                    <div key={cap} style={{ background:C.bg, padding:"1.6rem 1.8rem", display:"flex", alignItems:"center", gap:"1.2rem" }}>
                      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".7rem", color:C.accent }}>{String(i+1).padStart(2,"0")}</span>
                      <span style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.02rem", fontWeight:600, color:C.text }}>{cap}</span>
                    </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
);

export default function App() {
  return (
      <>
        <GlobalStyle/>
        <Nav/>
        <Hero/>
        <Team/>
        <OriginStory/>
        <Architecture/>
        <CaseStudies/>
        <RoadmapNext/>
        <EngineeringNotes/>
        <Boundaries/>
        <Hiring/>
        <Footer/>
      </>
  );
}
