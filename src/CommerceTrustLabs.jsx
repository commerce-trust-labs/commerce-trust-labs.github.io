import { useState, useEffect, useRef } from "react";

const C = {
    bg:       "#0b0f14",
    bg2:      "#111820",
    bg3:      "#161e28",
    accent:   "#c4501a",
    accentHi: "#e06030",
    blueHi:   "#6fa3d8",
    text:     "#e8e4dc",
    muted:    "#7a8494",
    border:   "rgba(232,228,220,0.08)",
};

/* ── GLOBAL STYLES ───────────────────────────────────── */
const GlobalStyle = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400&family=Instrument+Serif:ital@0;1&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #0b0f14; color: #e8e4dc; font-family: 'Syne', sans-serif; overflow-x: hidden; }
    ::selection { background: #c4501a; color: #fff; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #0b0f14; }
    ::-webkit-scrollbar-thumb { background: #c4501a; }
    @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
    .nav-link { color: #7a8494; transition: color 0.2s; font-family:'DM Mono',monospace; font-size:0.65rem; letter-spacing:0.12em; text-transform:uppercase; text-decoration:none; }
    .nav-link:hover, .nav-link.active { color: #c4501a; }
    .card-h { transition: background 0.25s; cursor: default; }
    .card-h:hover { background: #161e28 !important; }
    .pub-row { transition: background 0.2s; }
    .pub-row:hover { background: #161e28 !important; }
    .btn-p { display:inline-flex; align-items:center; gap:0.6rem; background:#c4501a; color:#fff; padding:0.85rem 1.8rem; font-family:'DM Mono',monospace; font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; text-decoration:none; transition:background 0.2s; border:none; cursor:pointer; }
    .btn-p:hover { background:#e06030; }
    .btn-g { display:inline-flex; align-items:center; gap:0.6rem; background:transparent; color:#e8e4dc; padding:0.85rem 1.8rem; font-family:'DM Mono',monospace; font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; text-decoration:none; border:1px solid rgba(232,228,220,0.08); transition:border-color 0.2s; }
    .btn-g:hover { border-color:rgba(232,228,220,0.25); }
    .lnk { opacity:0.45; transition:opacity 0.2s; text-decoration:none; font-family:'DM Mono',monospace; font-size:0.68rem; color:#e8e4dc; white-space:nowrap; }
    .lnk:hover { opacity:1; }
    .footer-lnk { color:rgba(232,228,220,0.3); text-decoration:none; transition:color 0.2s; }
    .footer-lnk:hover { color:#c4501a; }
    /* ── LAYOUT FIX: max-width container ── */
    .wrap { width:100%; max-width:1280px; margin:0 auto; padding:0 4rem; }
    .section { padding:7rem 0; }
    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      .wrap { padding: 0 1.5rem; }
      .two-col { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr !important; }
      .four-col { grid-template-columns: 1fr 1fr !important; }
      .hero-grid { flex-direction: column !important; }
      .hero-right { display: none !important; }
      nav { padding: 1rem 1.5rem !important; }
      .nav-links { display: none !important; }
    }
  `}</style>
);

/* ── HOOKS ───────────────────────────────────────────── */
const useInView = (threshold = 0.1) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
        }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
};

const Reveal = ({ children, delay = 0 }) => {
    const [ref, visible] = useInView();
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }}>
            {children}
        </div>
    );
};

const Label = ({ children, light }) => (
    <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"2.5rem" }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.25em", textTransform:"uppercase", color: light ? "rgba(232,228,220,0.25)" : C.muted, whiteSpace:"nowrap" }}>{children}</span>
        <div style={{ flex:1, height:"1px", background: light ? "rgba(232,228,220,0.06)" : C.border }} />
    </div>
);

/* ── NAV ─────────────────────────────────────────────── */
const Nav = () => {
    const [solid, setSolid] = useState(false);
    const [active, setActive] = useState("");
    useEffect(() => {
        const fn = () => setSolid(window.scrollY > 50);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);
    useEffect(() => {
        const ids = ["problem","mission","technology","interest","research","team"];
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
        }, { threshold: 0.35 });
        ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, []);
    const links = [["problem","Problem"],["mission","Mission"],["technology","Technology"],["interest","Impact"],["research","Research"],["team","Team"]];
    return (
        <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.1rem 4rem", background: solid ? "rgba(11,15,20,0.97)" : "rgba(11,15,20,0.4)", backdropFilter:"blur(18px)", borderBottom:`1px solid ${solid ? C.border : "transparent"}`, transition:"all 0.3s" }}>
            <a href="#" style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.text, textDecoration:"none" }}>
                Commerce Trust Labs
            </a>
            <div className="nav-links" style={{ display:"flex", gap:"2.5rem" }}>
                {links.map(([id, label]) => (
                    <a key={id} href={`#${id}`} className={`nav-link${active===id?" active":""}`}>{label}</a>
                ))}
            </div>
        </nav>
    );
};

/* ── TICKER ──────────────────────────────────────────── */
const Ticker = () => {
    const items = ["AI Commerce Governance","◆","Open Governance Framework","◆","Real-time Policy Enforcement","◆","Settlement Architecture","◆","Federated Trust Network","◆","AI-Native Control Plane","◆"];
    return (
        <div style={{ background:C.accent, overflow:"hidden", padding:"0.6rem 0", whiteSpace:"nowrap" }}>
            <div style={{ display:"inline-flex", gap:"3rem", animation:"ticker 28s linear infinite" }}>
                {[...items,...items].map((item,i) => (
                    <span key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.9)" }}>{item}</span>
                ))}
            </div>
        </div>
    );
};

/* ── NETWORK SVG ─────────────────────────────────────── */
const Network = () => (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:"480px" }}>
        <defs>
            <radialGradient id="rg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c4501a" stopOpacity="0.14"/>
                <stop offset="100%" stopColor="#c4501a" stopOpacity="0"/>
            </radialGradient>
        </defs>
        <circle cx="250" cy="250" r="190" fill="url(#rg)"/>
        <circle cx="250" cy="250" r="180" stroke="#e8e4dc" strokeWidth="0.4" strokeDasharray="4 8" opacity="0.07"/>
        <circle cx="250" cy="250" r="120" stroke="#e8e4dc" strokeWidth="0.4" strokeDasharray="3 6" opacity="0.05"/>
        <circle cx="250" cy="250" r="60"  stroke="#c4501a" strokeWidth="0.6" strokeDasharray="2 5" opacity="0.18"/>
        {[[250,70],[415,170],[415,330],[250,430],[85,330],[85,170]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="5" fill={i%2===0?"#c4501a":"#6fa3d8"} opacity="0.9"/>
        ))}
        {[[250,70,415,170],[415,170,415,330],[415,330,250,430],[250,430,85,330],[85,330,85,170],[85,170,250,70]].map(([x1,y1,x2,y2],i)=>(
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e8e4dc" strokeWidth="0.5" opacity="0.08"/>
        ))}
        <line x1="250" y1="70"  x2="415" y2="330" stroke="#c4501a" strokeWidth="0.4" opacity="0.1"/>
        <line x1="415" y1="170" x2="85"  y2="330" stroke="#6fa3d8" strokeWidth="0.4" opacity="0.1"/>
        <line x1="250" y1="430" x2="85"  y2="170" stroke="#c4501a" strokeWidth="0.4" opacity="0.1"/>
        {[[250,165],[335,208],[335,293],[250,335],[165,293],[165,208]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="3" fill={i%2===0?"#c4501a":"#6fa3d8"} opacity="0.55"/>
        ))}
        {[[250,165],[335,208],[335,293],[250,335],[165,293],[165,208]].map(([x,y],i)=>(
            <line key={i} x1="250" y1="250" x2={x} y2={y} stroke="#c4501a" strokeWidth="0.8" opacity="0.28"/>
        ))}
        <circle cx="250" cy="250" r="18" fill="#c4501a" opacity="0.08"/>
        <circle cx="250" cy="250" r="8"  fill="#c4501a" opacity="0.35"/>
        <circle cx="250" cy="250" r="4"  fill="#c4501a"/>
        {[
            [255,62,"#c4501a","POLICY ENGINE"],
            [422,165,"#6fa3d8","COMPLIANCE"],
            [422,342,"#6fa3d8","SETTLEMENT"],
            [175,450,"#7a8494","ANALYTICS"],
            [2,342,"#c4501a","GOVERNANCE"],
            [2,165,"#6fa3d8","TRUST LAYER"],
        ].map(([x,y,color,label],i)=>(
            <text key={i} x={x} y={y} fontFamily="'DM Mono',monospace" fontSize="8" fill={color} opacity="0.8">{label}</text>
        ))}
    </svg>
);

/* ── HERO ────────────────────────────────────────────── */
const Hero = () => {
    const [up, setUp] = useState(false);
    useEffect(() => { const t = setTimeout(()=>setUp(true),80); return ()=>clearTimeout(t); },[]);
    const anim = (d) => ({ opacity: up?1:0, transform: up?"none":"translateY(18px)", transition:`opacity 0.7s ease ${d}ms, transform 0.7s ease ${d}ms` });
    return (
        <section style={{ minHeight:"100vh", background:C.bg, paddingTop:"70px", overflow:"hidden" }}>
            <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 4rem", minHeight:"calc(100vh - 70px)", display:"flex", alignItems:"center" }}>
                {/* Left */}
                <div className="hero-grid" style={{ display:"flex", width:"100%", alignItems:"center", gap:"4rem" }}>
                    <div style={{ flex:"0 0 50%", minWidth:0 }}>
                        <div style={{ ...anim(80), display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1.8rem" }}>
                            <div style={{ width:"2rem", height:"1px", background:C.accent, flexShrink:0 }}/>
                            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase", color:C.accent }}>AI-Governed Commerce Infrastructure</span>
                        </div>
                        <h1 style={{ ...anim(160), fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.4rem,4vw,4.8rem)", fontWeight:800, lineHeight:1.0, letterSpacing:"-0.03em", color:C.text, marginBottom:"1.6rem" }}>
                            The Trust<br/>Layer for<br/>
                            <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>Modern Commerce</em>
                        </h1>
                        <p style={{ ...anim(260), fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.85rem", lineHeight:1.85, color:C.muted, maxWidth:"42ch", marginBottom:"2.5rem" }}>
                            Commerce Trust Labs is pioneering the governance infrastructure that enables AI-driven commerce systems to operate with regulatory compliance, transactional integrity, and national-scale resilience.
                        </p>
                        <div style={{ ...anim(360), display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                            <a href="#mission" className="btn-p">Our Mission →</a>
                            <a href="https://github.com/commerce-trust-labs" target="_blank" rel="noreferrer" className="btn-g">GitHub →</a>
                        </div>
                        <div style={{ ...anim(460), display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:C.border, border:`1px solid ${C.border}`, marginTop:"4rem" }}>
                            {[["Open","Reference Architecture"],["Real-time","Policy Enforcement"],["AI-Native","Governance Layer"]].map(([val,desc])=>(
                                <div key={val} style={{ background:C.bg2, padding:"1.4rem 1.2rem" }}>
                                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.1rem", fontWeight:800, color:C.accent, marginBottom:"0.3rem" }}>{val}</div>
                                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.12em", textTransform:"uppercase", color:C.muted }}>{desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Right — network */}
                    <div className="hero-right" style={{ flex:"0 0 50%", minWidth:0, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", padding:"2rem" }}>
                        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center, rgba(196,80,26,0.07) 0%, transparent 70%)", pointerEvents:"none" }}/>
                        <Network/>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ── PROBLEM ─────────────────────────────────────────── */
const Problem = () => {
    const problems = [
        { title:"Fragmented Regulatory Compliance", body:"U.S. retailers navigating state-level eco-fee mandates, data privacy laws, and tax regulations face significant compliance exposure annually — with no unified governance infrastructure to manage cross-jurisdictional enforcement at scale." },
        { title:"AI Systems Lack Trust Controls", body:"As AI agents increasingly orchestrate pricing, inventory, and customer interactions, there is no established framework to audit, constrain, or certify their behavior against regulatory and ethical standards." },
        { title:"Settlement Infrastructure Gaps", body:"The proliferation of payment methods, digital wallets, and embedded finance has outpaced settlement architectures — creating systemic risk across the U.S. retail economy." },
        { title:"No Cross-Retailer Visibility Standard", body:"Unlike financial services — where institutions share fraud signals through federated networks — retail commerce has no equivalent trust layer, leaving each retailer isolated from industry-wide threat intelligence." },
    ];
    return (
        <section id="problem" style={{ background:C.bg2 }}>
            <div className="wrap section">
                <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }}>
                    <div>
                        <Label light>The Problem</Label>
                        <Reveal>
                            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.03em", color:C.text }}>
                                AI Commerce<br/>Operates Without<br/>
                                <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:C.accent }}>a Governance Layer</em>
                            </h2>
                        </Reveal>
                        <Reveal delay={180}>
                            <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.8rem", lineHeight:1.85, color:C.muted, marginTop:"2rem" }}>
                                The U.S. retail economy is rapidly adopting AI — but without the governance infrastructure needed to ensure these systems operate safely, fairly, and in compliance with national standards.
                            </p>
                        </Reveal>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>
                        {problems.map((p,i)=>(
                            <Reveal key={i} delay={i*90}>
                                <div style={{ borderLeft:`2px solid ${C.accent}`, paddingLeft:"1.5rem" }}>
                                    <h4 style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.9rem", fontWeight:700, color:C.text, marginBottom:"0.4rem" }}>{p.title}</h4>
                                    <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.76rem", lineHeight:1.75, color:C.muted }}>{p.body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ── MISSION ─────────────────────────────────────────── */
const Mission = () => {
    const pillars = [
        { n:"01", title:"Govern AI in Commerce", body:"We build the policy and trust layer that allows AI agents to operate within retail commerce — setting enforceable behavioral constraints, audit trails, and regulatory guardrails that protect consumers, businesses, and the broader economy." },
        { n:"02", title:"A National Commerce Trust Standard", body:"We envision a shared governance infrastructure — analogous to PCI-DSS for payments or NIST for cybersecurity — that defines how AI systems participate in commerce, open, interoperable, and nationally significant." },
        { n:"03", title:"Protecting the U.S. Retail Economy", body:"U.S. retail commerce is a critical national economic infrastructure. Our work directly reduces systemic compliance risk, enables AI adoption at scale, and ensures the transition to agentic commerce serves the national interest." },
    ];
    return (
        <section id="mission" style={{ background:C.bg }}>
            <div className="wrap section">
                <Label>Mission & Vision</Label>
                <Reveal>
                    <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"clamp(1.6rem,3vw,2.6rem)", lineHeight:1.35, color:C.text, maxWidth:"26ch", marginBottom:"5rem", position:"relative" }}>
                        <span style={{ position:"absolute", top:"-2rem", left:"-0.5rem", fontSize:"6rem", color:"rgba(232,228,220,0.04)", lineHeight:1, fontFamily:"'Instrument Serif',serif" }}>"</span>
                        To build the governance infrastructure that makes AI-driven commerce trustworthy, compliant, and resilient at national scale.
                    </p>
                </Reveal>
                <div className="three-col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:C.border, border:`1px solid ${C.border}` }}>
                    {pillars.map((p,i)=>(
                        <Reveal key={i} delay={i*110}>
                            <div className="card-h" style={{ background:C.bg2, padding:"2.5rem", height:"100%" }}>
                                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.2em", color:C.accent, marginBottom:"1.2rem" }}>{p.n} —</div>
                                <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.05rem", fontWeight:700, color:C.text, marginBottom:"0.8rem", letterSpacing:"-0.01em" }}>{p.title}</h3>
                                <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.76rem", lineHeight:1.75, color:C.muted }}>{p.body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ── TECHNOLOGY ──────────────────────────────────────── */
const Technology = () => {
    const cards = [
        { tag:"Layer 1 — Compliance", title:"Regulatory Rule Engine", body:"A dynamic policy engine that ingests jurisdiction-specific regulations — eco-fees, sales tax, data residency, consumer protection — and enforces them in real-time across multi-retailer commerce pipelines." },
        { tag:"Layer 2 — Trust", title:"AI Agent Governance", body:"A certification and runtime monitoring framework for AI agents operating in commerce contexts — pricing bots, recommendation engines, inventory orchestrators — providing behavioral auditing and constraint enforcement." },
        { tag:"Layer 3 — Settlement", title:"Distributed Settlement Architecture", body:"A next-generation settlement layer designed for the fragmented payments landscape — supporting real-time reconciliation across wallets, BNPL instruments, and embedded finance products." },
        { tag:"Layer 4 — Intelligence", title:"Cross-Retailer Trust Network", body:"A federated intelligence network enabling participating retailers to share anonymized threat signals, compliance patterns, and governance benchmarks — creating collective defense infrastructure." },
    ];
    return (
        <section id="technology" style={{ background:C.bg3 }}>
            <div className="wrap section">
                <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"end", marginBottom:"4rem" }}>
                    <Reveal>
                        <Label light>Reference Architecture</Label>
                        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,3.5vw,3rem)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.03em", color:C.text }}>
                            Commerce Control Plane —{" "}
                            <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:C.blueHi }}>Governance Framework</em>
                        </h2>
                    </Reveal>
                    <Reveal delay={150}>
                        <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.82rem", lineHeight:1.85, color:C.muted }}>
                            A reference architecture for governance in AI-driven commerce systems — sitting between commerce platforms and the policies, regulations, and trust standards that govern them.
                        </p>
                    </Reveal>
                </div>
                <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:C.border, border:`1px solid ${C.border}` }}>
                    {cards.map((c,i)=>(
                        <Reveal key={i} delay={i*80}>
                            <div className="card-h" style={{ background:C.bg2, padding:"3rem", position:"relative", overflow:"hidden", height:"100%" }}>
                                <div style={{ position:"absolute", bottom:"-0.5rem", right:"1.5rem", fontSize:"5rem", fontWeight:800, color:"rgba(232,228,220,0.03)", lineHeight:1, fontFamily:"'Syne',sans-serif", pointerEvents:"none" }}>0{i+1}</div>
                                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.blueHi, marginBottom:"1rem" }}>{c.tag}</div>
                                <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.1rem", fontWeight:700, color:C.text, letterSpacing:"-0.02em", marginBottom:"0.8rem" }}>{c.title}</h3>
                                <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.76rem", lineHeight:1.75, color:C.muted }}>{c.body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ── PUBLIC INTEREST ─────────────────────────────────── */
const Interest = () => {
    const cards = [
        { tag:"National Scale", title:"U.S. Retail Economy at Risk", body:"AI governance failures in commerce infrastructure carry macro-economic consequences — not isolated corporate risk. The systems we govern process consumer transactions at national scale." },
        { tag:"Regulatory Gap", title:"No Unified Compliance Standard", body:"State-level regulatory frameworks with no interoperable compliance layer — a structural gap creating significant exposure across major U.S. retailers." },
        { tag:"Open Infrastructure", title:"Public-Benefit Technical Initiative", body:"Our reference architectures are developed as open infrastructure — not proprietary products — to maximize national-level adoption and industry-wide impact." },
    ];
    return (
        <section id="interest" style={{ background:C.bg }}>
            <div className="wrap section">
                <Label>Why This Matters</Label>
                <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }}>
                    <div>
                        <Reveal>
                            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,3.5vw,3rem)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.03em", color:C.text, marginBottom:"1.8rem" }}>
                                Infrastructure for the<br/>
                                <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:C.accent }}>National Interest</em>
                            </h2>
                        </Reveal>
                        <Reveal delay={150}>
                            <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.82rem", lineHeight:1.9, color:C.muted }}>
                                AI systems are rapidly becoming active participants in commerce — setting prices, recommending products, executing transactions, and managing inventory. Without governance infrastructure, these systems introduce systemic risks including regulatory violations, market manipulation, and large-scale consumer harm.
                                <br/><br/>
                                Commerce Trust Labs develops the governance infrastructure needed to ensure AI-driven commerce operates safely, transparently, and in the national economic interest.
                            </p>
                        </Reveal>
                        <Reveal delay={260}>
                            <div style={{ marginTop:"3rem", border:`1px solid ${C.border}`, padding:"2rem" }}>
                                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.muted, marginBottom:"0.8rem" }}>Open Repository</div>
                                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.78rem", color:C.blueHi, marginBottom:"0.3rem" }}>commerce-trust-labs /</div>
                                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.1rem", fontWeight:700, color:C.text, marginBottom:"0.8rem" }}>commerce-control-plane</div>
                                <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.74rem", color:C.muted, lineHeight:1.7, marginBottom:"1.2rem" }}>Reference architecture for AI-native governance layers in distributed commerce infrastructure.</div>
                                <div style={{ display:"flex", gap:"1.2rem", flexWrap:"wrap", marginBottom:"1.5rem" }}>
                                    {["Java / Spring","Open Source"].map(t=>(<span key={t} style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.66rem", color:C.muted }}>◆ {t}</span>))}
                                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.66rem", color:C.accent }}>◆ Active</span>
                                </div>
                                <a href="https://github.com/commerce-trust-labs" target="_blank" rel="noreferrer" className="btn-p" style={{ fontSize:"0.68rem", padding:"0.7rem 1.4rem" }}>View on GitHub →</a>
                            </div>
                        </Reveal>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
                        {cards.map((c,i)=>(
                            <Reveal key={i} delay={i*100}>
                                <div className="card-h" style={{ background:C.bg2, border:`1px solid ${C.border}`, padding:"1.8rem 2rem" }}>
                                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.2em", textTransform:"uppercase", color:C.accent, marginBottom:"0.5rem" }}>{c.tag}</div>
                                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.9rem", color:C.text, marginBottom:"0.4rem" }}>{c.title}</div>
                                    <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.74rem", color:C.muted, lineHeight:1.7 }}>{c.body}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ── RESEARCH ─────────────────────────────────────────── */
const Research = () => {
    const pubs = [
        { type:"Architecture", title:"Governance Control Plane Reference Architecture", desc:"Open reference architecture for AI-governed commerce systems — policy engine design, compliance orchestration, and settlement patterns.", link:"https://github.com/commerce-trust-labs/commerce-control-plane", linkLabel:"GitHub →" },
        { type:"Whitepaper", title:"AI Commerce Governance Framework (2026)", desc:"A framework for certifying, monitoring, and constraining AI agent behavior in retail commerce environments at national scale.", link:null, linkLabel:"Forthcoming" },
        { type:"Article", title:"Retry Storms in Distributed Commerce Infrastructure", desc:"Analysis of cascading failure patterns in high-volume retail systems and patterns for resilient distributed commerce infrastructure.", link:"#", linkLabel:"Read →" },
        { type:"Framework", title:"AI-Agent Governance Framework for Retail Platforms", desc:"Behavioral constraint specifications, audit trail standards, and explainability requirements for AI agents in U.S. retail commerce platforms.", link:null, linkLabel:"Forthcoming" },
    ];
    return (
        <section id="research" style={{ background:C.bg2 }}>
            <div className="wrap section">
                <Label light>Research & Publications</Label>
                <Reveal>
                    <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,3.5vw,3rem)", fontWeight:800, letterSpacing:"-0.03em", color:C.text, marginBottom:"4rem", lineHeight:1.05 }}>
                        Intellectual Contributions{" "}
                        <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:C.accent }}>to the Field</em>
                    </h2>
                </Reveal>
                <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:C.border, border:`1px solid ${C.border}` }}>
                    {pubs.map((p,i)=>(
                        <Reveal key={i} delay={i*70}>
                            <div className="pub-row" style={{ background:C.bg, padding:"2rem 2.5rem", display:"grid", gridTemplateColumns:"5.5rem 1fr auto", gap:"2rem", alignItems:"center" }}>
                                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.15em", textTransform:"uppercase", color:C.accent }}>{p.type}</div>
                                <div>
                                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.9rem", color:C.text, letterSpacing:"-0.01em", marginBottom:"0.3rem" }}>{p.title}</div>
                                    <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.72rem", color:C.muted, lineHeight:1.6 }}>{p.desc}</div>
                                </div>
                                {p.link
                                    ? <a href={p.link} target="_blank" rel="noreferrer" className="lnk">{p.linkLabel}</a>
                                    : <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", color:C.muted, whiteSpace:"nowrap" }}>{p.linkLabel}</span>
                                }
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ── TEAM ─────────────────────────────────────────────── */
const Team = () => (
    <section id="team" style={{ background:C.bg }}>
        <div className="wrap section">
            <Label>Founder</Label>
            <Reveal>
                <div className="two-col" style={{ display:"grid", gridTemplateColumns:"240px 1fr", gap:"5rem", alignItems:"start", border:`1px solid ${C.border}`, padding:"4rem" }}>
                    <div>
                        <div style={{ width:"100%", aspectRatio:"3/4", background:C.bg2, border:`1px solid ${C.border}`, marginBottom:"1.5rem", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:"4rem", fontWeight:800, color:C.text, opacity:0.07 }}>PS</span>
                            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px", background:C.accent }}/>
                        </div>
                        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.1rem", fontWeight:700, color:C.text, marginBottom:"0.3rem" }}>Pranesh Soma</div>
                        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.12em", textTransform:"uppercase", color:C.accent }}>Founder & Chief Architect</div>
                    </div>
                    <div>
                        <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.4rem,2.2vw,2rem)", fontWeight:800, lineHeight:1.1, letterSpacing:"-0.03em", color:C.text, marginBottom:"2rem" }}>
                            Building the{" "}
                            <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400 }}>Infrastructure That Commerce Runs On</em>
                        </h3>
                        {[
                            "Pranesh Soma is a distributed systems architect and commerce infrastructure engineer with nearly two decades of hands-on experience designing the governance, compliance, and resilience layers that power national-scale retail operations. His work spans AI orchestration prototypes, regulatory rule-engine frameworks, traffic governance layers, and settlement architectures.",
                            "As an engineering leader within one of the United States' largest retail platforms, Pranesh designed and deployed systems that prevented significant regulatory exposure, stabilized mission-critical infrastructure under large-scale bot attacks, and built the foundational patterns now being formalized into Commerce Trust Labs' open governance framework.",
                            "His expertise is platform-agnostic and transferable — the governance architectures he has designed are as applicable to mid-market e-commerce platforms, government digital services, and financial infrastructure as they are to enterprise retail.",
                        ].map((para,i)=>(
                            <p key={i} style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.79rem", lineHeight:1.9, color:C.muted, marginBottom:"1.2rem" }}>{para}</p>
                        ))}
                        <div className="four-col" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:C.border, border:`1px solid ${C.border}`, marginTop:"2rem" }}>
                            {[["Open","Reference Architecture"],["Real-time","Policy Enforcement"],["Federated","Trust Network"],["AI-Native","Governance Layer"]].map(([val,desc])=>(
                                <div key={val} style={{ background:C.bg2, padding:"1.2rem" }}>
                                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:800, color:C.accent, marginBottom:"0.3rem" }}>{val}</div>
                                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.1em", textTransform:"uppercase", color:C.muted }}>{desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
);

/* ── FOOTER ──────────────────────────────────────────── */
const Footer = () => (
    <footer style={{ background:C.bg2, borderTop:`1px solid ${C.border}` }}>
        <div className="wrap" style={{ padding:"4rem 4rem", display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"end", gap:"2rem" }}>
            <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.3rem", fontWeight:800, color:C.text, letterSpacing:"-0.02em", marginBottom:"0.5rem" }}>Commerce Trust Labs</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", color:C.muted, marginBottom:"1.2rem" }}>AI-Governed Commerce Infrastructure — Cumming, Georgia, USA</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:"0.66rem", color:"rgba(232,228,220,0.2)", lineHeight:1.8, maxWidth:"44ch" }}>
                    Commerce Trust Labs is an independent research and technology initiative focused on governance infrastructure for AI-driven commerce systems.
                </div>
            </div>
            <div style={{ textAlign:"right", fontFamily:"'DM Mono',monospace", fontSize:"0.68rem", lineHeight:2.4 }}>
                {[
                    ["commercetrustlabs.org","https://commercetrustlabs.org"],
                    ["github.com/commerce-trust-labs","https://github.com/commerce-trust-labs"],
                    ["contact@commercetrustlabs.org","mailto:contact@commercetrustlabs.org"],
                ].map(([label,href])=>(
                    <div key={label}><a href={href} className="footer-lnk">{label}</a></div>
                ))}
                <div style={{ color:"rgba(232,228,220,0.12)", marginTop:"0.5rem", fontSize:"0.62rem" }}>© 2025 Commerce Trust Labs. All rights reserved.</div>
            </div>
        </div>
    </footer>
);

/* ── APP ─────────────────────────────────────────────── */
export default function App() {
    return (
        <>
            <GlobalStyle/>
            <Nav/>
            <Hero/>
            <Ticker/>
            <Problem/>
            <Mission/>
            <Technology/>
            <Interest/>
            <Research/>
            <Team/>
            <Footer/>
        </>
    );
}
