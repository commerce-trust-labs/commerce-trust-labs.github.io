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
    }, { threshold: 0.08 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
};

const Reveal = ({ children, delay = 0 }) => {
  const [ref, v] = useInView();
  return (
      <div ref={ref} style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateY(24px)",
        transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .8s cubic-bezier(.16,1,.3,1) ${delay}ms`
      }}>
        {children}
      </div>
  );
};

const Eyebrow = ({ children, center }) => (
    center ? (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:".7rem", marginBottom:"1.6rem" }}>
          <span style={{ width:"1.4rem", height:"1px", background:C.accent, display:"inline-block" }}/>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".65rem", letterSpacing:".22em", textTransform:"uppercase", color:C.accent, textAlign:"center" }}>{children}</span>
        </div>
    ) : (
        <div style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:"1.6rem" }}>
          <span style={{ width:"1.4rem", height:"1px", background:C.accent, display:"inline-block", flexShrink:0 }}/>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".65rem", letterSpacing:".22em", textTransform:"uppercase", color:C.accent }}>{children}</span>
        </div>
    )
);

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
      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".6rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(28,28,30,.35)" }}>Scroll</span>
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

const NetworkGraphic = () => (
    <svg viewBox="0 0 480 420" fill="none" style={{ width:"100%", height:"auto", display:"block" }}>
      <defs><radialGradient id="ng" cx="50%" cy="50%" r="55%"><stop offset="0%" stopColor="#7bafe0" stopOpacity=".16"/><stop offset="100%" stopColor="#7bafe0" stopOpacity="0"/></radialGradient></defs>
      <rect x="0" y="0" width="480" height="420" fill="url(#ng)"/>
      {[["APPLICATION",90,110],["RUNTIME",340,90],["HISTORY",400,240],["ENGINEERING",320,340],["BUSINESS",110,320]].map(([label,x,y],i)=>(
          <g key={label}>
            <line x1={240} y1={210} x2={x} y2={y} stroke="rgba(28,28,30,.14)" strokeWidth="1"/>
            <circle cx={x} cy={y} r={i<3?6:4.5} fill={i<3?"#d9631f":"#7bafe0"} opacity={i<3?0.95:0.6}/>
            <text x={x} y={y< 210 ? y-12 : y+18} textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="8" letterSpacing="1" fill="rgba(28,28,30,.55)">{label}</text>
          </g>
      ))}
      <circle cx="240" cy="210" r="16" fill="#ffffff" stroke="#d9631f" strokeWidth="1.4"/>
      <text x="240" y="213" textAnchor="middle" fontFamily="'DM Mono',monospace" fontSize="7" fill="#d9631f">CTX</text>
    </svg>
);

const FlowGraphic = () => {
  const steps = ["TRIGGER","CONTEXT","DIAGNOSE","PLAN","APPROVE","VERIFY"];
  return (
      <svg viewBox="0 0 480 420" fill="none" style={{ width:"100%", height:"auto", display:"block" }}>
        <defs><linearGradient id="flg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7bafe0" stopOpacity=".14"/><stop offset="100%" stopColor="#7bafe0" stopOpacity="0"/></linearGradient></defs>
        <rect x="0" y="0" width="480" height="420" fill="url(#flg)"/>
        <line x1="90" y1="40" x2="90" y2="380" stroke="rgba(28,28,30,.12)" strokeWidth="1"/>
        {steps.map((s,i)=>{
          const y = 40 + i*68;
          const isGate = s === "APPROVE";
          return (
              <g key={s}>
                <circle cx="90" cy={y} r={isGate?9:6} fill={isGate?"#d9631f":"#ffffff"} stroke={isGate?"#d9631f":"#7bafe0"} strokeWidth="1.4"/>
                <text x="115" y={y+4} fontFamily="'DM Mono',monospace" fontSize="10" letterSpacing="1.5" fill={isGate?"#d9631f":"rgba(28,28,30,.7)"}>{s}</text>
                {isGate && <text x="115" y={y+20} fontFamily="'DM Mono',monospace" fontSize="7" letterSpacing="1" fill="rgba(28,28,30,.4)">HUMAN GATE</text>}
              </g>
          );
        })}
        <path d="M300 40 L420 40 L420 380 L300 380" stroke="rgba(28,28,30,.08)" strokeWidth="1" fill="none" strokeDasharray="3 5"/>
        <text x="308" y="30" fontFamily="'DM Mono',monospace" fontSize="7.5" letterSpacing="1" fill="rgba(28,28,30,.35)">EVIDENCE LEDGER</text>
      </svg>
  );
};

const EngineeringArcGraphic = () => {
  const evolution = [
    ["01","MAR 2025","Content without a complete cart","Agentic Commerce"],
    ["02","MAY 2026","A valuable loop bound to one assistant","Governed Agentic SDLC"],
    ["03","2026","Every agent rebuilding the same reality","Composite Context"],
    ["04","2026","Confidence without inspectable proof","Engineering Confidence Platform"],
    ["05","AUG 2026","API success mistaken for recovery","Agentic Operations"],
    ["06","AUG 2026","Trust controls repeated per workflow","Enterprise Control Plane"],
    ["07","ROADMAP","Token savings without evidence safety","Intelligence Control Plane"],
  ];
  return (
    <div style={{ marginBottom:"4rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap", alignItems:"baseline", marginBottom:"2rem" }}>
        <div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".64rem", letterSpacing:".2em", textTransform:"uppercase", color:C.accent, marginBottom:".5rem" }}>Not a product map · A decision trail</div>
          <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(1.2rem,1.8vw,1.5rem)", fontWeight:800, letterSpacing:"-.02em", color:C.text }}>Each constraint forced the next architecture</div>
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".12em", color:C.muted, whiteSpace:"nowrap" }}>2025 &rarr; Roadmap</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(185px, 1fr))", gap:"1.1rem" }}>
        {evolution.map(([n,date,observed,built],i)=>{ const road=i===6; return (
          <div key={n} style={{ border:`1px solid ${road?"rgba(47,111,176,.4)":C.border}`, borderTop:`3px solid ${road?C.blueHi:C.accent}`, borderRadius:"16px", background:road?"rgba(47,111,176,.05)":"#fff", padding:"1.6rem 1.4rem", display:"flex", flexDirection:"column" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", gap:".5rem", marginBottom:"1.4rem" }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"1.05rem", fontWeight:500, color:road?C.blueHi:C.accent }}>{n}</span>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", letterSpacing:".1em", color:"rgba(28,28,30,.42)" }}>{date}</span>
            </div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".56rem", letterSpacing:".16em", textTransform:"uppercase", color:"rgba(28,28,30,.42)", marginBottom:".45rem" }}>Observed</div>
            <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".95rem", lineHeight:1.45, color:C.muted, flex:1, marginBottom:"1.3rem" }}>{observed}</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".56rem", letterSpacing:".16em", textTransform:"uppercase", color:road?C.blueHi:C.accent, marginBottom:".4rem" }}>{road?"Roadmap":"Built"}</div>
            <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.08rem", fontWeight:750, lineHeight:1.25, color:C.text }}>{built}</div>
          </div>
        ); })}
      </div>

      <div style={{ border:`1px solid ${C.border}`, borderRadius:"20px", background:C.bg2, padding:"clamp(2rem,4vw,3.2rem)", marginTop:"1.4rem" }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".64rem", letterSpacing:".2em", textTransform:"uppercase", color:C.blueHi, marginBottom:"2rem", textAlign:"center" }}>The architecture that emerged</div>
        <div style={{ maxWidth:"1040px", margin:"0 auto", display:"flex", flexDirection:"column", gap:".9rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:".9rem" }}>
            {[["Agentic Commerce","Project-to-cart outcomes"],["Governed Agentic SDLC","Evidence-gated delivery"],["Agentic Operations","Approved, verified remediation"]].map(([title,body])=>(
              <div key={title} style={{ border:`1px solid ${C.border}`, borderRadius:"14px", background:"#fff", padding:"1.5rem", textAlign:"center" }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".1em", textTransform:"uppercase", color:C.accent, marginBottom:".6rem" }}>{title}</div>
                <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".92rem", lineHeight:1.5, color:C.muted }}>{body}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", color:"rgba(28,28,30,.32)", fontSize:"1.1rem" }}>&#8597;</div>
          <div style={{ border:"1px solid rgba(217,99,31,.34)", borderRadius:"14px", background:"rgba(217,99,31,.06)", padding:"1.5rem", textAlign:"center" }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:C.accent, marginBottom:".5rem" }}>Composite Context</div>
            <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".92rem", color:C.muted }}>Business &middot; application &middot; repository &middot; runtime &middot; policy &middot; history &middot; verified outcomes</div>
          </div>
          <div style={{ textAlign:"center", color:"rgba(28,28,30,.32)", fontSize:"1.1rem" }}>&#8597;</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:".9rem" }}>
            <div style={{ border:`1px solid ${C.border}`, borderRadius:"14px", background:"#fff", padding:"1.5rem", textAlign:"center" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".1em", textTransform:"uppercase", color:C.text, marginBottom:".5rem" }}>Engineering Confidence Platform</div>
              <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".92rem", color:C.muted }}>Requirements &middot; gates &middot; confidence &middot; release evidence</div>
            </div>
            <div style={{ border:`1px solid ${C.text}`, borderRadius:"14px", background:C.text, padding:"1.5rem", textAlign:"center" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".1em", textTransform:"uppercase", color:"#ed8a4d", marginBottom:".5rem" }}>Enterprise Control Plane</div>
              <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".92rem", color:"rgba(255,255,255,.66)" }}>Identity &middot; policy &middot; authorization &middot; registered action &middot; audit &middot; verification</div>
            </div>
          </div>
          <div style={{ textAlign:"center", color:"rgba(28,28,30,.32)", fontSize:"1.1rem" }}>&darr;</div>
          <div style={{ border:"1px dashed rgba(47,111,176,.55)", borderRadius:"14px", background:"rgba(47,111,176,.07)", padding:"1.5rem", textAlign:"center" }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".64rem", letterSpacing:".12em", textTransform:"uppercase", color:C.blueHi, marginBottom:".5rem" }}>Roadmap &middot; Enterprise Intelligence Control Plane</div>
            <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".92rem", color:C.muted }}>Context selection &middot; model routing &middot; tool path &middot; token budget &middot; quality-aware economics</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocGraphic = () => (
    <svg viewBox="0 0 480 420" fill="none" style={{ width:"100%", height:"auto", display:"block" }}>
      <defs><radialGradient id="dg" cx="50%" cy="40%" r="55%"><stop offset="0%" stopColor="#d9631f" stopOpacity=".12"/><stop offset="100%" stopColor="#d9631f" stopOpacity="0"/></radialGradient></defs>
      <rect x="0" y="0" width="480" height="420" fill="url(#dg)"/>
      {[0,1,2].map(i=>(
          <rect key={i} x={140-i*16} y={70+i*14} width="220" height="280" rx="10" fill="#ffffff" stroke="rgba(28,28,30,.12)" strokeWidth="1" transform={`rotate(${(i-1)*4} 250 210)`}/>
      ))}
      <g transform="translate(120,90)">
        {[0,1,2,3,4,5].map(i=>(<rect key={i} x="0" y={i*30} width={i%2===0?170:120} height="8" rx="4" fill={i===0?"#d9631f":"rgba(28,28,30,.14)"}/>))}
      </g>
    </svg>
);

/* ── NAV ── */
const Nav = () => {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const links = [["story","Story"],["loop","Delivery Loop"],["context","Context"],["operations","Operations"],["enterprise-control-plane","Control Plane"],["roadmap","Roadmap"],["engineering-notes","Engineering Notes"],["research","Research"],["team","Creator"]];
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
        <a href="#" style={{ display:"flex", alignItems:"center", gap:".75rem", fontFamily:"'Manrope',sans-serif", fontSize:".96rem", fontWeight:750, letterSpacing:"-.015em", color:C.text, textDecoration:"none", flexShrink:0 }}>
          <span style={{ width:"2rem", height:"2rem", borderRadius:"7px", background:C.accent, display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontSize:".7rem", fontWeight:500, color:"#fff" }}>CT</span>
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
              <a key={id} href={`#${id}`} onClick={()=>setOpen(false)} className={`nl${active===id?" on":""}`} style={{ fontSize:".82rem" }}>{l}</a>
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
            <Eyebrow center>Agentic Infrastructure for Enterprise Commerce</Eyebrow>
          </div>
          <h1 style={{ ...a(150), fontFamily:"'Manrope',sans-serif", fontSize:"clamp(3rem,7vw,6.5rem)", fontWeight:800, lineHeight:1.0, letterSpacing:"-.04em", color:C.text, maxWidth:"16ch", marginBottom:"2.2rem" }}>
            Where Tokens Become{" "}
            <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>Trusted Actions</em>
          </h1>
          <p style={{ ...a(260), fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"clamp(1.15rem,1.8vw,1.5rem)", lineHeight:1.65, color:"rgba(28,28,30,.72)", maxWidth:"42ch", marginBottom:"3.2rem" }}>
            Tokens carry model output. Trusted action emerges only when that output is grounded in authoritative context, evaluated by policy, authorized at the right risk level, executed through registered procedures, and verified with evidence. Commerce Trust Labs explores the control plane in between.
          </p>
          <div style={{ ...a(360), display:"flex", gap:"1.1rem", flexWrap:"wrap", justifyContent:"center", marginBottom:"5.5rem" }}>
            <a href="#story" className="pill">Read the Story →</a>
            <a href="https://github.com/PraneshSoma/agentic-sdlc-loop" target="_blank" rel="noreferrer" className="pill2">View on GitHub</a>
          </div>
          <div style={{ ...a(480), display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"clamp(2rem, 6vw, 5rem)", width:"100%" }}>
            {[["Composite","Context Model"],["Governed","SDLC Loop"],["Human-Gated","Agentic Ops"]].map(([v,d]) => (
                <div key={v} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.35rem", fontWeight:800, color:C.text, marginBottom:".4rem", letterSpacing:"-.01em" }}>{v}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".64rem", letterSpacing:".16em", textTransform:"uppercase", color:C.accent }}>{d}</div>
                </div>
            ))}
          </div>
        </div>
        <ScrollCue/>
      </section>
  );
};

/* ── generic full-bleed split section ── */
const SplitSection = ({ id, bg, eyebrow, heading, headingEm, body, visual, atmosphere, reverse, alignVisualToContent, children }) => (
    <section id={id} style={{ position:"relative", background:bg, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
      {atmosphere && <Atmosphere variant={atmosphere}/>}
      <div style={inner({ position:"relative", zIndex:1, padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
        <div className={`split-row${reverse?" reverse":""}`}>
          <div className="split-text">
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
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

/* ── STORY ── */
const Story = () => {
  const items = [
    { title:"Understand the Project", body:"A customer describes a do-it-yourself project or shares a video, article, or link. Content and planning agents infer the steps, materials, tools, quantities, and compatibility constraints." },
    { title:"Build a Complete Project Cart", body:"The supervisor coordinates catalog, pricing, availability, and cart capabilities to match every required item—not merely recommend one product at a time." },
    { title:"Turn Missing Products Into Merchandising Intelligence", body:"When an item is unavailable, the experience can offer an external marketplace option. That unmet purchase intent becomes a structured catalog-gap signal that helps merchandising teams prioritize assortment expansion." },
  ];
  return (
      <SplitSection id="story" bg={C.bg2} eyebrow="Origin"
        heading="Agentic Commerce Started With" headingEm="the Project-to-Cart Gap"
        body="In March 2025, the gap I encountered in project-based shopping was not a shortage of do-it-yourself content. Customers could find videos, articles, and inspiration, but there was no unified journey that understood a project, identified the complete bill of materials, matched every item to a retailer's catalog, and created a ready-to-buy cart. Agentic Commerce began as a multi-agent orchestrator designed to close that gap."
        visual={<OrchestratorGraphic/>}>
        <div style={{ display:"flex", flexDirection:"column", gap:"1.4rem", marginBottom:"2rem" }}>
          {items.map((p,i) => (
              <Reveal key={i} delay={220+i*70}>
                <div style={{ borderLeft:`2px solid ${C.accent}`, paddingLeft:"1.5rem" }}>
                  <h4 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.02rem", fontWeight:700, color:C.text, marginBottom:".4rem" }}>{p.title}</h4>
                  <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".92rem", lineHeight:1.75, color:"rgba(28,28,30,.62)" }}>{p.body}</p>
                </div>
              </Reveal>
          ))}
        </div>
        <Reveal delay={460}>
          <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"1.3rem", lineHeight:1.55, color:C.text, borderLeft:`3px solid ${C.accent}`, paddingLeft:"1.4rem" }}>
            A smarter planner did not make the system safe to operate. The harder problem was turning AI reasoning into an authorized, evidence-backed, auditable action. That shift—from intelligence alone to governed execution—is the purpose of Commerce Trust Labs.
          </p>
        </Reveal>
      </SplitSection>
  );
};

/* ── LOOP ── */
const Loop = () => {
  const stages = [
    "Discovery","ADR","LLD","Story Gen","Planning","Code Gen","Test Gen","RFC/PR","Shadow","Review","Release"
  ];
  const gated = new Set(["ADR","LLD","RFC/PR","Release"]);
  return (
      <section id="loop" style={{ position:"relative", background:C.bg3, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
        <div style={inner({ padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
          <Reveal>
            <Eyebrow>Governed Agentic Software Delivery</Eyebrow>
            <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2.1rem,3.4vw,3.2rem)", fontWeight:800, lineHeight:1.06, letterSpacing:"-.035em", color:C.text, marginBottom:"1.8rem", maxWidth:"22ch" }}>
              An 11-stage delivery loop with evidence and human gates
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:"1.08rem", lineHeight:1.85, color:"rgba(28,28,30,.66)", maxWidth:"68ch", marginBottom:"3.5rem" }}>
              In May 2026, this began as a portability experiment. Loop Engineering was already adding value through a Claude-driven way of carrying discovery, architecture decisions, implementation, and validation forward as one continuous body of work. I rebuilt the operating model as a GitHub Copilot simulation to test whether the value came from one assistant—or from the structure of the loop itself. The result was a supervisor-led, four-phase state machine that later expanded into eleven explicit delivery stages with evidence, persisted state, retries, and human gates.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ overflowX:"auto", paddingBottom:"1rem" }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:0, minWidth:"760px" }}>
                {stages.map((s,i) => (
                    <div key={s} style={{ display:"flex", alignItems:"center", flex: i===stages.length-1 ? "0 0 auto" : "1 1 auto" }}>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:".7rem", flexShrink:0 }}>
                        <div style={{ width: gated.has(s)?"1.1rem":".7rem", height: gated.has(s)?"1.1rem":".7rem", borderRadius:"50%", background: gated.has(s)?C.accent:"transparent", border:`1.5px solid ${gated.has(s)?C.accent:C.blueHi}` }}/>
                        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".05em", color: gated.has(s)?C.accent:"rgba(28,28,30,.6)", whiteSpace:"nowrap" }}>{s}</div>
                        {gated.has(s) && <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".54rem", letterSpacing:".05em", color:"rgba(28,28,30,.32)", whiteSpace:"nowrap" }}>human gate</div>}
                      </div>
                      {i < stages.length-1 && <div style={{ flex:1, height:"1px", background:"rgba(28,28,30,.14)", marginTop:".35rem" }}/>}
                    </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:"2.5rem", marginTop:"3rem" }}>
            {[
              ["Discovery → ADR → LLD","Requirements, architecture decisions, and low-level design as accepted, reviewable artifacts — with an explicit open-issue queue — before any code is written."],
              ["Story → Planning → Code / Test Gen","Design decomposes into traceable implementation units. Code and test generation run as separately-scoped agents, so an implementation never validates only its own assumptions."],
              ["RFC/PR → Shadow → Review","Every change ships with a review package — diff, requirement traceability, test results, and shadow-execution evidence comparing new behavior against the current production path."],
              ["Tiered Adoption & Audit","Bronze, Silver, and Gold adoption tiers scale the required agents, architecture decisions, CI evidence, audit workflow, and human gates with the risk and maturity of the engineering work."],
            ].map(([t,d],i) => (
                <Reveal key={t} delay={280+i*70}>
                  <h4 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1rem", fontWeight:700, color:C.text, marginBottom:".5rem" }}>{t}</h4>
                  <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".92rem", lineHeight:1.75, color:"rgba(28,28,30,.62)" }}>{d}</p>
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
};

/* ── CONTEXT ── */
const ContextSection = () => {
  const layers = [
    { n:"Application Context", body:"What the system is — owning team, dependencies, registered actions, and operating procedures." },
    { n:"Runtime Context", body:"What's happening now — alerts, logs, metrics, traces, deployment state, and current health." },
    { n:"Historical Evidence", body:"What's happened before — prior incidents, remediations, outcomes, and human overrides." },
    { n:"Engineering Context — Phase 2", body:"Connects a runtime signal back to the repository, commit, and change that likely caused it." },
    { n:"Business Context — Phase 3", body:"Weighs criticality, customer impact, and business ownership into the policy decision." },
  ];
  return (
      <SplitSection id="context" bg={C.bg} eyebrow="Composite Context"
        heading="Context Assembled From Multiple Authoritative Sources"
        body="An enterprise decision rarely depends on one prompt or one database. Composite context is built on demand by connectors, each pulling a bounded piece of information from its authoritative source, then normalized into a single package — with source, freshness, and confidence tracked for every element it contains.">
        <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem", marginBottom:"2rem" }}>
          {layers.map((l,i) => (
              <Reveal key={i} delay={200+i*60}>
                <div style={{ borderLeft:`2px solid ${i<3?C.accent:C.blueHi}`, paddingLeft:"1.5rem" }}>
                  <h4 style={{ fontFamily:"'Manrope',sans-serif", fontSize:".98rem", fontWeight:700, color:C.text, marginBottom:".35rem" }}>{l.n}</h4>
                  <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".9rem", lineHeight:1.7, color:"rgba(28,28,30,.62)" }}>{l.body}</p>
                </div>
              </Reveal>
          ))}
        </div>
        <Reveal delay={520}>
          <div style={{ border:`1px solid ${C.border}`, borderRadius:"14px", padding:"1.6rem 1.8rem", background:C.glass }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".82rem", color:C.blueHi, marginBottom:".7rem" }}>Context assembled from connectors (missing: 0, stale: 0)</div>
            <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".88rem", color:"rgba(28,28,30,.62)", lineHeight:1.7 }}>Every element carries its source, retrieval time, and confidence — so a diagnosis can only use evidence that's current, complete, and tied to the right tenant and environment.</div>
          </div>
        </Reveal>
      </SplitSection>
  );
};

/* ── OPERATIONS ── */
const Operations = () => {
  const log = [
    ["10:42:03","TRIGGER","slack","error spike reported on checkout-service"],
    ["10:42:04","OPC_MATCHED","opc_error_spike","outcome MATCHED"],
    ["10:42:06","CONTEXT","connectors","assembled (missing: 0, stale: 0)"],
    ["10:42:11","DIAGNOSED","investigator","deploy-induced error spike on checkout-service — evidence-grounded"],
    ["10:42:12","PLANNED","planner","1 step, 1 registered action: restart_service {\"version\":\"1.3.0\"}"],
    ["10:42:12","POLICY","policy-engine","R2 action in production → REQUIRE_APPROVAL"],
    ["10:44:51","WAITING_APPROVAL","sam-oncall → senior_oncall","frozen plan + evidence sent for review"],
    ["10:47:20","APPROVED","senior_oncall","reason: deploy-induced spike; restart is the registered R2 remediation"],
    ["10:47:24","EXECUTING","execution-svc","restart_service run under registered action, scoped credential"],
    ["10:49:02","VERIFYING","verifier","health, error rate, traffic checked against recovery window"],
    ["10:49:41","RESOLVED","control-tower","incident closed — outcome verified, evidence ledger updated"],
  ];
  return (
      <SplitSection id="operations" bg={C.bg2} reverse eyebrow="Agentic Operations"
        heading="From Trigger to Verified Resolution"
        body="The Agentic Operations Platform applies these principles to operational work — incidents, production tickets, data reconciliation, entitlement issues. Agents never hold production write credentials directly: they propose a plan built from a registered action, and a separately governed execution layer performs it only after policy and approval clear."
        visual={<FlowGraphic/>}>
        <Reveal delay={200}>
          <div style={{ border:`1px solid ${C.border}`, borderRadius:"10px", background:"#f4f2ec", overflow:"hidden", marginBottom:"1.4rem" }}>
            <div style={{ display:"flex", alignItems:"center", gap:".5rem", padding:".7rem 1rem", borderBottom:`1px solid ${C.border}` }}>
              <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"rgba(28,28,30,.18)" }}/>
              <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"rgba(28,28,30,.18)" }}/>
              <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"rgba(28,28,30,.18)" }}/>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", color:"rgba(28,28,30,.35)", marginLeft:".4rem" }}>INC-1002 — checkout-service</span>
            </div>
            <div style={{ padding:"1.1rem 1.2rem", overflowX:"auto" }}>
              <div style={{ minWidth:"max-content" }}>
                {log.map(([t,state,actor,msg],i) => (
                    <div key={i} style={{ display:"flex", gap:".8rem", fontFamily:"'DM Mono',monospace", fontSize:".7rem", lineHeight:1.9, whiteSpace:"nowrap" }}>
                      <span style={{ color:"rgba(28,28,30,.25)" }}>{t}</span>
                      <span style={{ color: state==="APPROVED"||state==="RESOLVED" ? C.accent : state==="WAITING_APPROVAL" ? "#b07d15" : C.blueHi, flexShrink:0, width:"9.5rem" }}>{state}</span>
                      <span style={{ color:"rgba(28,28,30,.4)", flexShrink:0 }}>{actor}</span>
                      <span style={{ color:"rgba(28,28,30,.72)" }}>{msg}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={280}>
          <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".88rem", color:"rgba(28,28,30,.4)", lineHeight:1.7 }}>
            This is an architecture and working prototype, not a production deployment claim. Approved plans are immutable, execution never runs on unrestricted credentials, and an incident closes only after a verified outcome — not just a successful API call.
          </p>
        </Reveal>
      </SplitSection>
  );
};

/* ── ENTERPRISE CONTROL PLANE ── */
const EnterpriseControlPlane = () => {
  const pillars = [
    { title:"One connected learning loop", body:"Agentic Commerce establishes outcome orchestration. The governed software-delivery loop builds and changes those capabilities safely. Agentic Operations executes controlled remediation, and verified production outcomes flow back as evidence for the next engineering and business decision." },
    { title:"Composite Context compounds", body:"Every stage consumes the same assembled business, application, engineering, runtime, policy, and historical context. Each decision and verified outcome then enriches that context, allowing the next agent and workflow to begin with stronger evidence instead of starting over." },
    { title:"Configurable at every scope", body:"Context and policy are defined at the organization, domain, application, repository, and workflow level, so governance doesn't mean copy-pasting the same rules into every agent prompt." },
    { title:"Trust is structural, not a score", body:"Trust comes from correct identity, fresh evidence, a registered procedure and action, a valid policy decision, human authorization, and a verified outcome — not from a model's confidence." },
  ];
  return (
      <section id="enterprise-control-plane" style={{ position:"relative", background:C.bg, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
        <div style={inner({ padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
          <div className="split-row" style={{ marginBottom:"4.5rem", alignItems:"flex-start" }}>
            <div className="split-text">
              <Reveal>
                <Eyebrow>Enterprise Control Plane</Eyebrow>
                <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2.1rem,3.4vw,3.2rem)", fontWeight:800, lineHeight:1.06, letterSpacing:"-.035em", color:C.text, marginBottom:"1.8rem" }}>
                  The Governed Plane Between{" "}
                  <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>Reasoning and Action</em>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"clamp(1.3rem,1.9vw,1.7rem)", lineHeight:1.5, color:C.text, maxWidth:"34ch" }}>
                  "Intelligence proposes; the Enterprise Control Plane governs; enterprise systems execute; evidence proves the outcome."
                </p>
              </Reveal>
            </div>
            <div className="split-visual">
              <Reveal delay={100}><CompassGraphic/></Reveal>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:"1.25rem" }}>
            {pillars.map((p,i) => (
                <Reveal key={i} delay={i*100}>
                  <div className="card" style={{ background:C.glass, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"2.6rem", height:"100%", cursor:"default", transition:"all .3s", borderTop:`2px solid ${C.accent}` }}>
                    <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.12rem", fontWeight:700, color:C.text, marginBottom:"1rem" }}>{p.title}</h3>
                    <p style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".92rem", lineHeight:1.8, color:"rgba(28,28,30,.62)" }}>{p.body}</p>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
};

/* ── ROADMAP ── */
const Roadmap = () => {
  const phases = [
    {
      n:"01", label:"Observe", title:"Transparent intelligence gateway",
      body:"Use Claude Code as the first client. Proxy requests without rewriting them and establish a reliable baseline for user, repository, task, model, input/output tokens, cache behavior, latency, retries, compaction, and cost.",
      proof:"Proof: a session-level cost and quality baseline"
    },
    {
      n:"02", label:"Curate", title:"Composite Context through MCP",
      body:"Expose task-specific architecture, repository, policy, runtime, and decision evidence as a context manifest. Record what was selected, what was excluded, source freshness, and why each item deserved tokens.",
      proof:"Proof: lower context volume without missed evidence"
    },
    {
      n:"03", label:"Govern", title:"Deterministic controls through hooks",
      body:"Classify task and risk, enforce repository policy, constrain tool use, run validation after changes, require approval for high-risk actions, and return verified outcomes to the control plane.",
      proof:"Proof: policy enforcement outside the model prompt"
    },
    {
      n:"04", label:"Optimize", title:"Risk-aware intelligence routing",
      body:"Assign token budgets, reuse stable context, delegate classification and summarization to lower-cost models, and escalate to frontier reasoning only when uncertainty, evidence conflict, or risk justifies it.",
      proof:"Proof: measurable savings with quality held constant"
    },
  ];
  const consoleViews = [
    ["Session trace","Context, model, tool, retry, and escalation decisions"],
    ["Token economics","Baseline cost, optimized cost, latency, and savings"],
    ["Context manifest","Included and excluded evidence with reasons and freshness"],
    ["Policy decisions","Allowed, blocked, escalated, approved, and verified actions"],
  ];
  return (
    <section id="roadmap" style={{ position:"relative", background:C.text, color:"#fff", width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at 78% 22%, rgba(47,111,176,.28), transparent 34%), radial-gradient(circle at 18% 76%, rgba(217,99,31,.2), transparent 32%)" }}/>
      <div style={inner({ position:"relative", zIndex:1, padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
        <Reveal>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".65rem", letterSpacing:".2em", textTransform:"uppercase", color:"#ed8a4d", marginBottom:"1.6rem" }}>Roadmap · The Next Control Plane</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"clamp(2.5rem,6vw,7rem)", alignItems:"end", marginBottom:"4.5rem" }}>
            <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2.5rem,5vw,5rem)", fontWeight:800, lineHeight:1, letterSpacing:"-.05em", color:"#fff", maxWidth:"13ch" }}>
              From traffic control to{" "}<em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:"#ed8a4d" }}>intelligence control</em>
            </h2>
            <div>
              <p style={{ fontFamily:"'Instrument Serif',serif", fontSize:"clamp(1.25rem,1.8vw,1.6rem)", lineHeight:1.55, color:"rgba(255,255,255,.88)", marginBottom:"1.2rem" }}>
                A reverse proxy decides where traffic should go. An intelligence control plane decides which context, model, tools, governance path, and token budget should handle an enterprise task.
              </p>
              <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".94rem", lineHeight:1.8, color:"rgba(255,255,255,.58)" }}>
                The gateway market already covers provider routing, budgets, caching, and observability. The differentiated problem is context economics: assembling the smallest trustworthy evidence package for a task and proving that lower cost did not remove a requirement, policy, or production constraint.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", border:"1px solid rgba(255,255,255,.14)", borderRadius:"18px", overflow:"hidden", marginBottom:"4.5rem", background:"rgba(255,255,255,.035)" }}>
            {["CLAUDE CODE","INTELLIGENCE DATA PLANE","COMPOSITE CONTEXT","MODEL + TOOL ROUTING","EVIDENCE + OUTCOME"].map((step,i)=>(
              <div key={step} style={{ position:"relative", padding:"1.5rem 1.1rem", borderRight:i<4?"1px solid rgba(255,255,255,.12)":"none", minHeight:"92px", display:"flex", alignItems:"center", justifyContent:"center", textAlign:"center" }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".67rem", letterSpacing:".09em", lineHeight:1.5, color:i===0||i===4?"#ed8a4d":"rgba(255,255,255,.74)" }}>{step}</span>
                {i<4 && <span aria-hidden="true" style={{ position:"absolute", right:"-.42rem", top:"50%", transform:"translateY(-50%)", zIndex:2, color:"#ed8a4d", fontSize:"1rem" }}>→</span>}
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:"1.2rem", marginBottom:"4.5rem" }}>
          {phases.map((p,i)=>(
            <Reveal key={p.n} delay={i*70}>
              <div style={{ height:"100%", border:"1px solid rgba(255,255,255,.14)", borderRadius:"18px", padding:"2rem", background:"rgba(255,255,255,.045)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", gap:"1rem", alignItems:"center", marginBottom:"1.3rem" }}>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".68rem", color:"#ed8a4d" }}>{p.n}</span>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".56rem", letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,.4)" }}>{p.label}</span>
                </div>
                <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.18rem", lineHeight:1.25, fontWeight:750, color:"#fff", marginBottom:"1rem" }}>{p.title}</h3>
                <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".88rem", lineHeight:1.75, color:"rgba(255,255,255,.6)", marginBottom:"1.4rem" }}>{p.body}</p>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", lineHeight:1.55, color:"#ed8a4d" }}>{p.proof}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.14)", paddingTop:"3.5rem" }} className="note-story">
            <div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".16em", textTransform:"uppercase", color:"#ed8a4d", marginBottom:"1rem" }}>First product experience</div>
              <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(1.8rem,3vw,2.8rem)", lineHeight:1.08, letterSpacing:"-.035em", color:"#fff", marginBottom:"1.2rem" }}>Claude Code first. Thin evidence console second.</h3>
              <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".94rem", lineHeight:1.8, color:"rgba(255,255,255,.58)" }}>
                The control plane should prove itself inside a real engineering workflow before becoming a large standalone application. Claude Code remains the primary experience; the UI exists to expose the decisions the gateway made and whether they preserved engineering quality.
              </p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,minmax(0,1fr))", gap:"1px", background:"rgba(255,255,255,.12)", border:"1px solid rgba(255,255,255,.12)", borderRadius:"15px", overflow:"hidden" }}>
              {consoleViews.map(([title,body])=>(
                <div key={title} style={{ background:"#1d1d22", padding:"1.5rem" }}>
                  <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".94rem", fontWeight:700, color:"#fff", marginBottom:".55rem" }}>{title}</div>
                  <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:".8rem", lineHeight:1.65, color:"rgba(255,255,255,.48)" }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"clamp(1.3rem,2vw,1.8rem)", lineHeight:1.55, color:"#fff", textAlign:"center", maxWidth:"55ch", margin:"4rem auto 0" }}>
            The objective is not fewer tokens at any cost. It is the smallest trustworthy context, the least expensive capable intelligence, and evidence that the outcome remained correct.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

/* ── ENGINEERING NOTES ── */
const EngineeringNotes = () => {
  const notes = [
    {
      number:"01", era:"Early 2025 · Agentic Commerce",
      title:"Content inspired the project, but it could not complete the purchase",
      lead:"By March 2025, customers had abundant do-it-yourself videos, articles, and project inspiration. The missing experience was a unified path from that content—or from a customer's own idea—to every compatible item required for the project and a complete, purchasable cart.",
      problem:"Search and recommendations worked one product at a time. The customer still had to interpret the project, derive a bill of materials, determine quantities and compatibility, find each item, recognize catalog gaps, and coordinate the final cart. A chatbot that only answered questions did not remove that work.",
      decision:"Build a supervisor-and-worker orchestrator around the project outcome. A content agent interprets a video, article, link, or natural-language request. A project agent derives steps and required materials. Catalog agents resolve products, price, availability, and substitutes. A cart agent assembles the purchasable result. When the retailer cannot fulfill an item, a marketplace agent can surface an external option rather than leaving the project incomplete.",
      trace:["Customer provides a project idea, video, article, or link","Agents derive steps, materials, tools, quantities, and constraints","Catalog capabilities match available products and substitutes","The orchestrator creates a complete project cart","Missing items route to marketplace options","Unmet purchase intent becomes a catalog-gap signal for merchandising"],
      learned:"The architecture created two connected outcomes: a simpler project-to-cart journey for the customer and a demand-sensing loop for the retailer. External purchase intent revealed precisely which missing products prevented the retailer from owning the complete project. But coordinating content understanding, catalog decisions, cart actions, and feedback across multiple agents introduced a new delivery challenge.",
      next:"That constraint produced the governed software-delivery loop."
    },
    {
      number:"02", era:"May 2026 · Governed Agentic SDLC",
      title:"Was the value in Claude—or in the engineering loop around it?",
      lead:"Loop Engineering was already producing value in Claude by keeping research, architecture decisions, implementation intent, and validation connected across a long-running engineering problem. In May 2026, I used GitHub Copilot to simulate that workflow and test whether the operating model could survive outside the assistant where it originated.",
      problem:"AI coding assistants typically started each task cold. Architectural decisions, constraints, prior research, and accepted trade-offs had to be rediscovered or manually restated. Even when one long-running Claude workflow accumulated that knowledge successfully, the value was difficult to reproduce, govern, or transfer across tools and engineers.",
      decision:"Make the loop—not the model—the system. A supervisor called the Loop Engine coordinated four phases—Discovery, Design, Build, and Validate—along with their phase transitions, story queue, pre-flight checks, retry logic, persisted pipeline state, and human-in-the-loop gates. Artifact, Evidence, and Product repositories separated what was decided, why it was trusted, and what was being changed. The later reference architecture expanded that operating model into eleven traceable stages.",
      trace:["Discovery maps stakeholders, consumers, pain points, and constraints","Design produces accepted architecture decisions and low-level design","Build decomposes accepted design into planned code and test work","Validate assembles review, shadow, and release evidence","The Loop Engine persists state, manages retries, and stops at human gates","The same workflow is reproduced across assistants without losing its contracts"],
      learned:"The Copilot simulation showed that the durable advantage was not a particular assistant. It was accumulated engineering memory, explicit stage contracts, supervisor-controlled transitions, evidence, and human judgment. But every agent still spent time assembling overlapping fragments of repository, business, runtime, and decision context.",
      next:"That constraint produced Composite Context."
    },
    {
      number:"03", era:"2026 · Composite Context",
      title:"The expensive part was repeatedly rebuilding reality",
      lead:"An agent rarely fails because the enterprise has no information. It fails because the relevant facts live in different systems, arrive with different freshness, and lose their provenance when compressed into a prompt.",
      problem:"Repository structure, architecture decisions, business rules, runtime telemetry, ownership, policy, and prior outcomes were retrieved independently by each workflow. This increased response latency, duplicated interpretation, and allowed two agents to act from different versions of reality.",
      decision:"Treat context as a governed evidence product. Composite Context assembles claims from authoritative sources, preserves source and freshness metadata, resolves them at organization, domain, application, repository, and workflow scope, and exposes only the minimum evidence required by the current decision.",
      trace:["Resolve the acting identity and scope","Collect claims from authoritative connectors","Mark missing, stale, and conflicting evidence","Assemble a decision-specific context package","Persist accepted decisions and verified outcomes back into context"],
      learned:"Shared context improved consistency, but evidence alone could not decide whether an agent was permitted to act. The architecture still needed a reusable model for confidence, policy, approval, and release readiness.",
      next:"That constraint produced the Engineering Confidence Platform."
    },
    {
      number:"04", era:"2026 · Engineering Confidence Platform",
      title:"Confidence could not be another model-generated number",
      lead:"Once AI participated in architecture and software delivery, the important question changed from “Is the answer convincing?” to “What evidence makes this change acceptable at this risk level?”",
      problem:"A single confidence score hides why a decision is safe. High model certainty cannot compensate for stale context, an unapproved architecture change, missing tests, an unauthorized actor, or an action outside the registered release procedure.",
      decision:"Define confidence structurally. A change earns progression through traceable requirements, accepted decisions, evidence completeness, policy evaluation, risk-tiered human gates, immutable execution intent, and outcome verification. The platform applies those controls at application and repository scope while the delivery loop performs the work.",
      trace:["Evidence establishes what is known","Policy evaluates the proposed action","Risk determines the required authorization","The accepted plan becomes immutable intent","Verification proves the resulting system state"],
      learned:"The same governed-action pattern was not limited to code. Production support had the identical trust problem—only with shorter timelines and a larger blast radius.",
      next:"That constraint produced Agentic Operations."
    },
    {
      number:"05", era:"2026 · Agentic Operations",
      title:"A successful API call is not a resolved incident",
      lead:"Operational tickets appeared ideal for automation: detect a known symptom, run a standard procedure, and close the incident. The dangerous gap was everything between diagnosis and verified recovery.",
      problem:"An agent could select the wrong procedure, diagnose from incomplete telemetry, mutate a plan after approval, execute with broad credentials, or report success because an API returned 200—even while the customer-facing condition remained broken.",
      decision:"Build an evidence-grounded incident state machine. A synthetic Slack incident matches a registered operating procedure, assembles connector context, produces a claim-linked diagnosis, freezes a remediation plan, evaluates policy, waits at the required human gate, executes through scoped credentials, and closes only after outcome verification.",
      trace:["Trigger → operating procedure match","Context → evidence-grounded diagnosis","Plan → registered action and frozen parameters","Policy → risk decision and human approval","Execution → scoped capability","Verification → observed recovery or rollback"],
      learned:"Software delivery and production operations were using the same primitives: identity, authoritative context, registered actions, policy, authorization, immutable intent, controlled execution, and evidence. Rebuilding those controls per workflow would recreate the fragmentation the work began by removing.",
      next:"That constraint produced the Enterprise Control Plane."
    },
    {
      number:"06", era:"2026 · Enterprise Control Plane",
      title:"The architecture converged on one governed-action model",
      lead:"Agentic Commerce, software delivery, and production operations began as separate problems. Their implementations converged because every enterprise action must answer the same questions before it is trusted.",
      problem:"Who is acting? What authoritative facts support the decision? Is the proposed action registered? Which policy applies at this scope? Who must authorize it? What exactly was approved? Did execution produce the intended outcome?",
      decision:"Place a reusable Enterprise Control Plane between probabilistic reasoning and deterministic enterprise systems. Composite Context supplies governed evidence. Identity, policy, and authorization determine whether an action may proceed. Registered procedures constrain execution. Verification feeds the observed outcome back into the context shared by commerce, engineering, and operations.",
      trace:["Models propose","Composite Context grounds","Policy and people authorize","Registered capabilities execute","Evidence verifies","Outcomes strengthen the next decision"],
      learned:"The result is not a claim that every enterprise workflow is solved. It is a working architectural thesis: intelligence can vary by model and use case, while the infrastructure that converts reasoning into accountable action remains consistent. But operating the loop exposed a new economic constraint: frontier models were repeatedly consuming large volumes of overlapping context even when only part of that evidence required expensive reasoning.",
      next:"That constraint produced the Enterprise Intelligence Control Plane roadmap."
    },
    {
      number:"07", era:"Roadmap · Enterprise Intelligence Control Plane",
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
          <Eyebrow center>Engineering Notes · The Complete Arc</Eyebrow>
          <h2 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(2.4rem,4.4vw,4.4rem)", fontWeight:800, lineHeight:1.02, letterSpacing:"-.045em", color:C.text, textAlign:"center", maxWidth:"17ch", margin:"0 auto 1.5rem" }}>
            Seven decisions. One accumulated{" "}<em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>architecture</em>
          </h2>
          <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.06rem", lineHeight:1.8, color:C.muted, textAlign:"center", maxWidth:"68ch", margin:"0 auto 3.5rem" }}>
            This work did not begin with a control plane diagram. Each architecture emerged because the previous experiment exposed a constraint it could not solve. The individual mechanisms—context, policy, approval, gateways, and agent orchestration—are established patterns. The native contribution is the problem-driven sequence and their composition into one governed-action architecture. Open a chapter to follow the evidence trail.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <EngineeringArcGraphic/>
        </Reveal>
        <div className="note-grid">
          {notes.map((n,i)=>(
            <Reveal key={n.number} delay={(i%2)*80}>
              <details className="note-card" open={i===0} style={{ background:"rgba(255,255,255,.82)", border:`1px solid ${C.border}`, borderRadius:"20px", overflow:"hidden", height:"100%" }}>
                <summary style={{ cursor:"pointer", padding:"2rem", display:"flex", gap:"1.4rem", alignItems:"flex-start" }}>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".72rem", color:C.accent, letterSpacing:".12em", paddingTop:".25rem" }}>{n.number}</span>
                  <span style={{ flex:1, minWidth:0 }}>
                    <span style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:".58rem", letterSpacing:".13em", textTransform:"uppercase", color:C.blueHi, marginBottom:".7rem" }}>{n.era}</span>
                    <span style={{ display:"block", fontFamily:"'Manrope',sans-serif", fontSize:"clamp(1.15rem,1.8vw,1.5rem)", fontWeight:800, letterSpacing:"-.025em", lineHeight:1.2, color:C.text }}>{n.title}</span>
                    <span style={{ display:"block", fontFamily:"'Manrope',sans-serif", fontSize:".9rem", lineHeight:1.7, color:"rgba(28,28,30,.6)", marginTop:".8rem" }}>{n.lead}</span>
                  </span>
                  <span className="note-plus" aria-hidden="true" style={{ width:"2rem", height:"2rem", borderRadius:"50%", border:`1px solid ${C.border}`, display:"inline-flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .25s", fontSize:"1.2rem" }}>+</span>
                </summary>
                <div className="note-story" style={{ borderTop:`1px solid ${C.border}`, padding:"clamp(2rem,5vw,4rem)" }}>
                  <div>
                    <Eyebrow>The constraint</Eyebrow>
                    <p style={{ fontFamily:"'Instrument Serif',serif", fontSize:"1.35rem", lineHeight:1.55, color:C.text, marginBottom:"2rem" }}>{n.problem}</p>
                    <h4 style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".15em", textTransform:"uppercase", color:C.accent, marginBottom:".8rem" }}>The architecture decision</h4>
                    <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".94rem", lineHeight:1.85, color:"rgba(28,28,30,.66)" }}>{n.decision}</p>
                  </div>
                  <div>
                    <div style={{ background:C.text, borderRadius:"16px", padding:"1.8rem", marginBottom:"1.6rem" }}>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", letterSpacing:".16em", textTransform:"uppercase", color:"rgba(255,255,255,.46)", marginBottom:"1.1rem" }}>Execution trace</div>
                      {n.trace.map((step,j)=>(
                        <div key={step} style={{ display:"grid", gridTemplateColumns:"1.5rem 1fr", gap:".7rem", alignItems:"start", fontFamily:"'DM Mono',monospace", fontSize:".72rem", lineHeight:1.6, color:"rgba(255,255,255,.82)", padding: j?".65rem 0 0":"0" }}>
                          <span style={{ color:C.accent }}>{String(j+1).padStart(2,"0")}</span><span>{step}</span>
                        </div>
                      ))}
                    </div>
                    <h4 style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".15em", textTransform:"uppercase", color:C.blueHi, marginBottom:".8rem" }}>What it revealed</h4>
                    <p style={{ fontFamily:"'Manrope',sans-serif", fontSize:".94rem", lineHeight:1.8, color:"rgba(28,28,30,.66)", marginBottom:"1.4rem" }}>{n.learned}</p>
                    <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"1.2rem", lineHeight:1.5, color:C.accent, borderLeft:`2px solid ${C.accent}`, paddingLeft:"1rem" }}>{n.next}</p>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:".65rem", lineHeight:1.8, color:"rgba(28,28,30,.42)", maxWidth:"78ch", margin:"2.5rem auto 0", textAlign:"center" }}>
            These are generalized architecture stories and synthetic execution examples from independent research prototypes. They do not describe or disclose any employer or client system.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

/* ── RESEARCH ── */
const Research = () => {
  const pubs = [
    { type:"Implementation", title:"agentic-sdlc-loop", desc:"A working reference implementation of the governed software-delivery loop, including supervisor orchestration, stage transitions, human gates, and evidence flow.", link:"https://github.com/PraneshSoma/agentic-sdlc-loop", linkLabel:"GitHub →" },
    { type:"Reference Architecture", title:"loop-engineering", desc:"The companion reference architecture for the same delivery loop, covering stage contracts, acceptance gates, traceability, and the audit model.", link:"https://github.com/PraneshSoma/loop-engineering", linkLabel:"GitHub →" },
    { type:"Platform", title:"agentic-operations-platform", desc:"The Agentic Operations runtime — trigger, context assembly, diagnosis, policy, approval, execution, and verification.", link:null, linkLabel:"Private repository" },
    { type:"Article", title:"Retry Storms in Distributed Commerce Infrastructure", desc:"Analysis of cascading failure patterns in high-volume retail systems and patterns for resilient distributed commerce infrastructure.", link:"https://medium.com/@praneshsoma/retry-storms-139869b956e3", linkLabel:"Read →" },
    { type:"Article", title:"AI Agents Are the New Bot Traffic — And Commerce Infrastructure Isn't Ready", desc:"How agentic, machine-speed traffic triggers retry storms and cascading failures in commerce infrastructure built for human interaction — and why the next generation of retail platforms needs a governance and control plane.", link:"https://medium.com/@praneshsoma/ai-agents-are-the-new-bot-traffic-and-commerce-infrastructure-isnt-ready-35e12e01158d", linkLabel:"Read →" },
  ];
  return (
      <SplitSection id="research" bg={C.bg2} reverse eyebrow="Research &amp; Publications"
        heading="Written &amp; Built" headingEm="in the Open"
        alignVisualToContent
        visual={<DocGraphic/>}>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:C.border, border:`1px solid ${C.border}`, borderRadius:"16px", overflow:"hidden" }}>
          {pubs.map((p,i) => (
              <Reveal key={i} delay={180+i*60}>
                <div className="row research-row" style={{ background:C.bg, padding:"1.6rem 1.8rem", alignItems:"center", minWidth:0, transition:"background .25s" }}>
                  <div className="research-type" style={{ fontFamily:"'DM Mono',monospace", fontSize:".56rem", letterSpacing:".15em", textTransform:"uppercase", color:C.accent }}>{p.type}</div>
                  <div style={{ minWidth:0, flex:"1 1 180px" }}>
                    <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:700, fontSize:".98rem", color:C.text, marginBottom:".35rem" }}>{p.title}</div>
                    <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".86rem", color:"rgba(28,28,30,.6)", lineHeight:1.6 }}>{p.desc}</div>
                  </div>
                  {p.link
                      ? <a href={p.link} target="_blank" rel="noreferrer" className="lk research-action">{p.linkLabel}</a>
                      : <span className="research-action" style={{ fontFamily:"'DM Mono',monospace", fontSize:".68rem", color:C.muted, whiteSpace:"nowrap" }}>{p.linkLabel}</span>
                  }
                </div>
              </Reveal>
          ))}
        </div>
      </SplitSection>
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
    {t:0.164,y:"2025",a:"Repo Compare"},
    {t:0.298,y:"2025",a:"Multi-Agent Commerce"},
    {t:0.432,y:"2026",a:"Governed SDLC Loop"},
    {t:0.566,y:"2026",a:"Composite Context"},
    {t:0.70,y:"2026",a:"PDLC"},
    {t:0.834,y:"2026",a:"Agentic Ops"},
    {t:0.97,y:"2026",a:"Enterprise Control Plane"},
  ];
  const ePath=`M${eP[0][0]} ${eP[0][1]} Q ${eP[1][0]} ${eP[1][1]} ${eP[2][0]} ${eP[2][1]}`;
  const aPath=`M${aP[0][0]} ${aP[0][1]} Q ${aP[1][0]} ${aP[1][1]} ${aP[2][0]} ${aP[2][1]}`;
  return (
      <div style={{ marginTop:"3.5rem" }}>
        <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"1.6rem", marginBottom:"2.2rem" }}>
          <span style={{ display:"inline-flex", alignItems:"center", gap:".5rem", fontFamily:"'DM Mono',monospace", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:C.muted }}>
            <span style={{ width:".7rem", height:".7rem", borderRadius:"50%", background:C.blueHi }}/> Enterprise commerce
          </span>
          <span style={{ display:"inline-flex", alignItems:"center", gap:".5rem", fontFamily:"'DM Mono',monospace", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:C.muted }}>
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
            <div className="arc-hint" style={{ textAlign:"center", marginTop:".6rem", fontFamily:"'DM Mono',monospace", fontSize:".6rem", letterSpacing:".18em", textTransform:"uppercase", color:C.muted }}>Scroll the timeline →</div>
          </Reveal>
      </div>
  );
};

/* ── ORIGIN / FOUNDER ── */
const Team = () => (
    <section id="team" style={{ position:"relative", background:C.bg, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
      <div style={inner({ position:"relative", zIndex:1, padding:"8.5rem clamp(1.25rem, 5vw, 3.5rem)" })}>
        <Reveal>
          <Eyebrow center>Creator</Eyebrow>
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
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".1em", textTransform:"uppercase", color:C.accent, textAlign:"center" }}>Creator &amp; Principal Architect</div>
            </div>
            <div style={{ minWidth:0, flex:"1 1 320px" }}>
              <h3 style={{ fontFamily:"'Manrope',sans-serif", fontSize:"clamp(1.35rem,2.2vw,1.9rem)", fontWeight:800, lineHeight:1.14, letterSpacing:"-.035em", color:C.text, marginBottom:"1.6rem" }}>
                Experience transformed into{" "}
                <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>reference architecture</em>
              </h3>
              {[
                "Pranesh Soma is a distributed systems architect with close to two decades of experience designing large-scale enterprise commerce systems across cart, checkout, pricing, identity, platform traffic, modernization, and complex data migrations.",
                "Commerce Trust Labs turns that experience into a connected body of independent research: the planner-and-worker model behind Agentic Commerce, the governed software-delivery loop within the Engineering Confidence Platform, the composite-context model, and the Agentic Operations runtime. The Enterprise Control Plane unifies them through shared context, policy, authorization, and evidence between AI reasoning and enterprise action.",
              ].map((para,i) => (
                  <p key={i} style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".95rem", lineHeight:1.85, color:"rgba(28,28,30,.64)", marginBottom:"1rem" }}>{para}</p>
              ))}
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
            <span style={{ width:"1.6rem", height:"1.6rem", borderRadius:"6px", background:C.accent, display:"inline-flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Mono',monospace", fontSize:".62rem", color:"#fff" }}>CT</span>
            <div style={{ fontFamily:"'Manrope',sans-serif", fontSize:"1.1rem", fontWeight:800, color:C.text }}>Commerce Trust Labs</div>
          </div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".66rem", color:C.muted, marginBottom:"1rem" }}>Agentic Infrastructure for Enterprise Commerce — Atlanta, Georgia, USA</div>
          <div style={{ fontFamily:"'Manrope',sans-serif", fontWeight:400, fontSize:".72rem", color:"rgba(28,28,30,.38)", lineHeight:1.8, maxWidth:"62ch" }}>
            Commerce Trust Labs is an independent personal research and engineering initiative exploring governed infrastructure between AI reasoning and enterprise action. The views, prototypes, and reference architectures are the creator's own; they are not affiliated with or endorsed by any employer or client and contain only generalized, publicly shareable material.
          </div>
        </div>
        <div style={{ textAlign:"right", fontFamily:"'DM Mono',monospace", fontSize:".7rem", lineHeight:2.4, minWidth:0, flex:"1 1 200px" }}>
          {[["commercetrustlabs.org","https://commercetrustlabs.org"],["github.com/PraneshSoma","https://github.com/PraneshSoma"],["contact@commercetrustlabs.org","mailto:contact@commercetrustlabs.org"]].map(([label,href]) => (
              <div key={label}><a href={href} className="fl">{label}</a></div>
          ))}
          <div style={{ color:"rgba(28,28,30,.14)", marginTop:".5rem", fontSize:".62rem" }}>© 2026 Commerce Trust Labs. All rights reserved.</div>
        </div>
      </div>
    </footer>
);

export default function App() {
  return (
      <>
        <GlobalStyle/>
        <Nav/>
        <Hero/>
        <Story/>
        <Loop/>
        <ContextSection/>
        <Operations/>
        <EnterpriseControlPlane/>
        <Roadmap/>
        <EngineeringNotes/>
        <Research/>
        <Team/>
        <Footer/>
      </>
  );
}
