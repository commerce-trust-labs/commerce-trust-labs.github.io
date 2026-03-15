import { useState, useEffect, useRef } from "react";

const C = {
  bg:"#0b0f14", bg2:"#111820", bg3:"#161e28",
  accent:"#c4501a", blueHi:"#6fa3d8",
  text:"#e8e4dc", muted:"#7a8494",
  border:"rgba(232,228,220,0.08)"
};

const GlobalStyle = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@300;400&family=Instrument+Serif:ital@0;1&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;overflow-x:hidden;width:100%;max-width:100vw}
    body{background:#0b0f14;color:#e8e4dc;font-family:'Syne',sans-serif;overflow-x:hidden;width:100%;max-width:100vw;min-width:0}
    #root{width:100%;min-width:0;overflow-x:hidden;max-width:100vw}
    ::selection{background:#c4501a;color:#fff}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:#0b0f14}
    ::-webkit-scrollbar-thumb{background:#c4501a}
    @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    .nl{color:#7a8494;text-decoration:none;font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;transition:color .2s}
    .nl:hover,.nl.on{color:#c4501a}
    .ch:hover{background:#161e28!important}
    .pr:hover{background:#161e28!important}
    .bp{display:inline-flex;align-items:center;gap:.5rem;background:#c4501a;color:#fff;padding:.8rem 1.6rem;font-family:'DM Mono',monospace;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;transition:background .2s}
    .bp:hover{background:#e06030}
    .bg2btn{display:inline-flex;align-items:center;gap:.5rem;background:transparent;color:#e8e4dc;padding:.8rem 1.6rem;font-family:'DM Mono',monospace;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;border:1px solid rgba(232,228,220,.1);transition:border-color .2s}
    .bg2btn:hover{border-color:rgba(232,228,220,.3)}
    .lk{opacity:.4;transition:opacity .2s;text-decoration:none;font-family:'DM Mono',monospace;font-size:.68rem;color:#e8e4dc;white-space:nowrap}
    .lk:hover{opacity:1}
    .fl{color:rgba(232,228,220,.3);text-decoration:none;transition:color .2s}
    .fl:hover{color:#c4501a}
  `}</style>
);

/* shared wrapper style — never spread over itself, no horizontal overflow */
const inner = (extra = {}) => ({
  maxWidth: "min(1200px, 100%)",
  margin: "0 auto",
  padding: "0 clamp(1rem, 5vw, 3rem)",
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
        transform: v ? "none" : "translateY(20px)",
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`
      }}>
        {children}
      </div>
  );
};

const Label = ({ children, light }) => (
    <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"2rem" }}>
      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".6rem", letterSpacing:".25em", textTransform:"uppercase", color: light ? "rgba(232,228,220,.22)" : C.muted, whiteSpace:"nowrap" }}>{children}</span>
      <div style={{ flex:1, height:"1px", background: light ? "rgba(232,228,220,.05)" : C.border }} />
    </div>
);

/* ── NAV ── */
const Nav = () => {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const ids = ["problem","mission","technology","interest","research","team"];
    const o = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.3 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) o.observe(el); });
    return () => o.disconnect();
  }, []);
  return (
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:"1rem", padding:"1rem clamp(1rem, 5vw, 3rem)", background: solid ? "rgba(11,15,20,.97)" : "rgba(11,15,20,.5)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${solid ? C.border : "transparent"}`, transition:"all .3s", minWidth:0, maxWidth:"100vw" }}>
        <a href="#" style={{ fontFamily:"'DM Mono',monospace", fontSize:".7rem", letterSpacing:".2em", textTransform:"uppercase", color:C.text, textDecoration:"none", flexShrink:0 }}>Commerce Trust Labs</a>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"clamp(1rem, 2vw, 2rem)", minWidth:0 }}>
          {[["problem","Problem"],["mission","Mission"],["technology","Technology"],["interest","Impact"],["research","Research"],["team","Team"]].map(([id,l]) => (
              <a key={id} href={`#${id}`} className={`nl${active===id?" on":""}`}>{l}</a>
          ))}
        </div>
      </nav>
  );
};

/* ── TICKER ── */
const Ticker = () => {
  const items = ["AI Commerce Governance","◆","Open Governance Framework","◆","Real-time Policy Enforcement","◆","Settlement Architecture","◆","Federated Trust Network","◆","AI-Native Control Plane","◆"];
  return (
      <div style={{ background:C.accent, overflow:"hidden", padding:".55rem 0", whiteSpace:"nowrap", width:"100%", maxWidth:"100vw" }}>
        <div style={{ display:"inline-flex", gap:"3rem", animation:"ticker 28s linear infinite" }}>
          {[...items,...items].map((t,i) => (
              <span key={i} style={{ fontFamily:"'DM Mono',monospace", fontSize:".68rem", letterSpacing:".2em", textTransform:"uppercase", color:"rgba(255,255,255,.9)" }}>{t}</span>
          ))}
        </div>
      </div>
  );
};

/* ── NETWORK SVG ── */
const Network = () => (
    <svg viewBox="0 0 500 500" fill="none" style={{ width:"100%", maxWidth:"420px", display:"block" }}>
      <defs>
        <radialGradient id="rg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4501a" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#c4501a" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="250" cy="250" r="190" fill="url(#rg)"/>
      <circle cx="250" cy="250" r="180" stroke="#e8e4dc" strokeWidth="0.4" strokeDasharray="4 8" opacity="0.07"/>
      <circle cx="250" cy="250" r="120" stroke="#e8e4dc" strokeWidth="0.4" strokeDasharray="3 6" opacity="0.05"/>
      <circle cx="250" cy="250" r="60" stroke="#c4501a" strokeWidth="0.6" strokeDasharray="2 5" opacity="0.2"/>
      {[[250,70],[415,170],[415,330],[250,430],[85,330],[85,170]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="5" fill={i%2===0?"#c4501a":"#6fa3d8"} opacity="0.9"/>
      ))}
      {[[250,70,415,170],[415,170,415,330],[415,330,250,430],[250,430,85,330],[85,330,85,170],[85,170,250,70]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e8e4dc" strokeWidth="0.5" opacity="0.08"/>
      ))}
      {[[250,165],[335,208],[335,293],[250,335],[165,293],[165,208]].map(([x,y],i) => [
        <circle key={`c${i}`} cx={x} cy={y} r="3" fill={i%2===0?"#c4501a":"#6fa3d8"} opacity="0.55"/>,
        <line key={`l${i}`} x1="250" y1="250" x2={x} y2={y} stroke="#c4501a" strokeWidth="0.8" opacity="0.28"/>
      ])}
      <circle cx="250" cy="250" r="8" fill="#c4501a" opacity="0.35"/>
      <circle cx="250" cy="250" r="4" fill="#c4501a"/>
      {[[255,62,"#c4501a","POLICY ENGINE"],[424,165,"#6fa3d8","COMPLIANCE"],[424,342,"#6fa3d8","SETTLEMENT"],[180,450,"#7a8494","ANALYTICS"],[2,342,"#c4501a","GOVERNANCE"],[2,165,"#6fa3d8","TRUST LAYER"]].map(([x,y,col,label],i) => (
          <text key={i} x={x} y={y} fontFamily="'DM Mono',monospace" fontSize="8" fill={col} opacity="0.8">{label}</text>
      ))}
    </svg>
);

/* ── HERO ── */
const Hero = () => {
  const [up, setUp] = useState(false);
  useEffect(() => { const t = setTimeout(() => setUp(true), 80); return () => clearTimeout(t); }, []);
  const a = d => ({ opacity: up?1:0, transform: up?"none":"translateY(16px)", transition:`opacity .7s ease ${d}ms, transform .7s ease ${d}ms` });
  return (
      <section style={{ background:C.bg, paddingTop:"68px", minHeight:"100vh", overflow:"hidden", width:"100%", maxWidth:"100vw" }}>
        <div style={inner({ minHeight:"calc(100vh - 68px)", display:"flex", flexWrap:"wrap", gap:"4rem", alignItems:"center", padding:"4rem clamp(1rem, 5vw, 3rem)" })}>
          {/* LEFT */}
          <div style={{ minWidth:0, flex:"1 1 320px" }}>
            <div style={{ ...a(80), display:"flex", alignItems:"center", gap:".8rem", marginBottom:"1.6rem" }}>
              <div style={{ width:"2rem", height:"1px", background:C.accent, flexShrink:0 }}/>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".65rem", letterSpacing:".22em", textTransform:"uppercase", color:C.accent }}>AI-Governed Commerce Infrastructure</span>
            </div>
            <h1 style={{ ...a(160), fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.2rem,3.5vw,4rem)", fontWeight:800, lineHeight:1.0, letterSpacing:"-.03em", color:C.text, marginBottom:"1.5rem" }}>
              The Trust<br/>Layer for<br/>
              <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:C.accent }}>Modern Commerce</em>
            </h1>
            <p style={{ ...a(260), fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".84rem", lineHeight:1.85, color:C.muted, maxWidth:"38ch", marginBottom:"2.5rem" }}>
              Commerce Trust Labs pioneers the governance infrastructure that enables AI-driven commerce to operate with regulatory compliance, transactional integrity, and national-scale resilience.
            </p>
            <div style={{ ...a(360), display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"3rem" }}>
              <a href="#mission" className="bp">Our Mission →</a>
              <a href="https://github.com/commerce-trust-labs" target="_blank" rel="noreferrer" className="bg2btn">GitHub →</a>
            </div>
            <div style={{ ...a(440), display:"flex", flexWrap:"wrap", gap:"1px", background:C.border, border:`1px solid ${C.border}` }}>
              {[["Open","Reference Arch"],["Real-time","Policy Engine"],["AI-Native","Governance"]].map(([v,d]) => (
                  <div key={v} style={{ background:C.bg2, padding:"1.2rem 1rem", flex:"1 1 100px", minWidth:0 }}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:800, color:C.accent, marginBottom:".3rem" }}>{v}</div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", letterSpacing:".1em", textTransform:"uppercase", color:C.muted }}>{d}</div>
                  </div>
              ))}
            </div>
          </div>
          {/* RIGHT */}
          <div style={{ minWidth:0, flex:"1 1 320px", display:"flex", justifyContent:"center", alignItems:"center", position:"relative" }}>
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center,rgba(196,80,26,.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
            <Network/>
          </div>
        </div>
      </section>
  );
};

/* ── PROBLEM ── */
const Problem = () => {
  const items = [
    { title:"Fragmented Regulatory Compliance", body:"U.S. retailers face significant compliance exposure navigating state-level eco-fee mandates, data privacy laws, and tax regulations — with no unified governance layer to enforce cross-jurisdictional policy at scale." },
    { title:"AI Systems Lack Trust Controls", body:"As AI agents increasingly orchestrate pricing, inventory, and customer interactions, there is no established framework to audit, constrain, or certify their behavior against regulatory and ethical standards." },
    { title:"Settlement Infrastructure Gaps", body:"The proliferation of payment methods, digital wallets, and embedded finance has outpaced settlement architectures — creating systemic risk across the U.S. retail economy." },
    { title:"No Cross-Retailer Visibility Standard", body:"Unlike financial services — which share fraud signals through federated networks — retail commerce has no equivalent trust layer, leaving each retailer isolated from industry-wide threat intelligence." },
  ];
  return (
      <section id="problem" style={{ background:C.bg2, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
        <div style={inner({ padding:"6rem clamp(1rem, 5vw, 3rem)" })}>
          <Label light>The Problem</Label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"4rem", alignItems:"start" }}>
            <div style={{ minWidth:0, flex:"1 1 280px" }}>
              <Reveal>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,2.5vw,2.6rem)", fontWeight:800, lineHeight:1.05, letterSpacing:"-.03em", color:C.text }}>
                  AI Commerce<br/>Operates Without<br/>
                  <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:C.accent }}>a Governance Layer</em>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".8rem", lineHeight:1.85, color:C.muted, marginTop:"1.5rem" }}>
                  The U.S. retail economy is rapidly adopting AI — but without governance infrastructure to ensure these systems operate safely, fairly, and in compliance with national standards.
                </p>
              </Reveal>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"1.8rem", minWidth:0, flex:"1 1 280px" }}>
              {items.map((p,i) => (
                  <Reveal key={i} delay={i*80}>
                    <div style={{ borderLeft:`2px solid ${C.accent}`, paddingLeft:"1.4rem" }}>
                      <h4 style={{ fontFamily:"'Syne',sans-serif", fontSize:".88rem", fontWeight:700, color:C.text, marginBottom:".4rem" }}>{p.title}</h4>
                      <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".75rem", lineHeight:1.75, color:C.muted }}>{p.body}</p>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

/* ── MISSION ── */
const Mission = () => {
  const pillars = [
    { n:"01", title:"Govern AI in Commerce", body:"We build the policy and trust layer that allows AI agents to operate within retail commerce — setting enforceable behavioral constraints, audit trails, and regulatory guardrails that protect consumers, businesses, and the broader economy." },
    { n:"02", title:"A National Trust Standard", body:"We envision a shared governance infrastructure — analogous to PCI-DSS for payments or NIST for cybersecurity — that defines how AI systems participate in commerce: open, interoperable, and nationally significant." },
    { n:"03", title:"Protecting the U.S. Economy", body:"U.S. retail commerce is critical national infrastructure. Our work reduces systemic compliance risk, enables AI adoption at scale, and ensures the transition to agentic commerce serves the national interest." },
  ];
  return (
      <section id="mission" style={{ background:C.bg, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
        <div style={inner({ padding:"6rem clamp(1rem, 5vw, 3rem)" })}>
          <Label>Mission & Vision</Label>
          <Reveal>
            <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"clamp(1.2rem,1.8vw,1.7rem)", lineHeight:1.4, color:C.text, maxWidth:"32ch", marginBottom:"4rem", paddingLeft:"1rem", borderLeft:`3px solid ${C.accent}` }}>
              "To build the governance infrastructure that makes AI-driven commerce trustworthy, compliant, and resilient at national scale."
            </p>
          </Reveal>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"1px", background:C.border, border:`1px solid ${C.border}`, overflow:"hidden" }}>
            {pillars.map((p,i) => (
                <Reveal key={i} delay={i*100}>
                  <div className="ch" style={{ background:C.bg2, padding:"2.5rem", height:"100%", cursor:"default", transition:"background .25s", flex:"1 1 260px", minWidth:0 }}>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".6rem", letterSpacing:".2em", color:C.accent, marginBottom:"1rem" }}>{p.n} —</div>
                    <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:700, color:C.text, marginBottom:".8rem" }}>{p.title}</h3>
                    <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".75rem", lineHeight:1.75, color:C.muted }}>{p.body}</p>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
};

/* ── TECHNOLOGY ── */
const Technology = () => {
  const cards = [
    { tag:"Layer 1 — Compliance", title:"Regulatory Rule Engine", body:"A dynamic policy engine that ingests jurisdiction-specific regulations — eco-fees, sales tax, data residency, consumer protection — and enforces them in real-time across multi-retailer commerce pipelines." },
    { tag:"Layer 2 — Trust", title:"AI Agent Governance", body:"A certification and runtime monitoring framework for AI agents in commerce — pricing bots, recommendation engines, inventory orchestrators — providing behavioral auditing and constraint enforcement." },
    { tag:"Layer 3 — Settlement", title:"Distributed Settlement Architecture", body:"A next-generation settlement layer designed for the fragmented payments landscape — supporting real-time reconciliation across wallets, BNPL instruments, and embedded finance products." },
    { tag:"Layer 4 — Intelligence", title:"Cross-Retailer Trust Network", body:"A federated intelligence network enabling participating retailers to share anonymized threat signals, compliance patterns, and governance benchmarks — creating collective defense infrastructure." },
  ];
  return (
      <section id="technology" style={{ background:C.bg3, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
        <div style={inner({ padding:"6rem clamp(1rem, 5vw, 3rem)" })}>
          <Label light>Reference Architecture</Label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"3rem", alignItems:"end", marginBottom:"3rem" }}>
            <Reveal>
              <div style={{ minWidth:0, flex:"1 1 280px" }}>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.5rem,2.2vw,2.2rem)", fontWeight:800, lineHeight:1.05, letterSpacing:"-.03em", color:C.text }}>
                  Commerce Control Plane —{" "}
                  <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:C.blueHi }}>Governance Framework</em>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div style={{ minWidth:0, flex:"1 1 280px" }}>
                <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".82rem", lineHeight:1.85, color:C.muted }}>A reference architecture for governance in AI-driven commerce — sitting between commerce platforms and the regulations, policies, and trust standards that govern them.</p>
              </div>
            </Reveal>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"1px", background:C.border, border:`1px solid ${C.border}`, overflow:"hidden" }}>
            {cards.map((c,i) => (
                <Reveal key={i} delay={i*80}>
                  <div className="ch" style={{ background:C.bg2, padding:"2.5rem", position:"relative", overflow:"hidden", height:"100%", cursor:"default", transition:"background .25s", flex:"1 1 280px", minWidth:0 }}>
                    <div style={{ position:"absolute", bottom:"-.5rem", right:"1rem", fontSize:"4.5rem", fontWeight:800, color:"rgba(232,228,220,.03)", lineHeight:1, fontFamily:"'Syne',sans-serif", pointerEvents:"none" }}>0{i+1}</div>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", letterSpacing:".2em", textTransform:"uppercase", color:C.blueHi, marginBottom:".8rem" }}>{c.tag}</div>
                    <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:700, color:C.text, marginBottom:".8rem" }}>{c.title}</h3>
                    <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".75rem", lineHeight:1.75, color:C.muted }}>{c.body}</p>
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
};

/* ── INTEREST ── */
const Interest = () => {
  const cards = [
    { tag:"National Scale", title:"U.S. Retail Economy at Risk", body:"AI governance failures in commerce infrastructure carry macro-economic consequences. The systems we govern process consumer transactions at national scale." },
    { tag:"Regulatory Gap", title:"No Unified Compliance Standard", body:"State-level regulatory frameworks with no interoperable compliance layer — a structural gap creating significant exposure across major U.S. retailers." },
    { tag:"Open Infrastructure", title:"Public-Benefit Initiative", body:"Our reference architectures are developed as open infrastructure — not proprietary products — to maximize national-level adoption and industry-wide impact." },
  ];
  return (
      <section id="interest" style={{ background:C.bg, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
        <div style={inner({ padding:"6rem clamp(1rem, 5vw, 3rem)" })}>
          <Label>Why This Matters</Label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"4rem", alignItems:"start" }}>
            <div style={{ minWidth:0, flex:"1 1 280px" }}>
              <Reveal>
                <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.5rem,2.2vw,2.4rem)", fontWeight:800, lineHeight:1.05, letterSpacing:"-.03em", color:C.text, marginBottom:"1.5rem" }}>
                  Infrastructure for the<br/>
                  <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:C.accent }}>National Interest</em>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".82rem", lineHeight:1.9, color:C.muted, marginBottom:"2rem" }}>
                  AI systems are rapidly becoming active participants in commerce — setting prices, recommending products, executing transactions, managing inventory. Without governance infrastructure, these systems introduce systemic risks including regulatory violations, market manipulation, and large-scale consumer harm.
                  <br/><br/>
                  Commerce Trust Labs develops the governance infrastructure needed to ensure AI-driven commerce operates safely, transparently, and in the national economic interest.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div style={{ border:`1px solid ${C.border}`, padding:"2rem" }}>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", letterSpacing:".2em", textTransform:"uppercase", color:C.muted, marginBottom:".8rem" }}>Open Repository</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".76rem", color:C.blueHi, marginBottom:".3rem" }}>commerce-trust-labs /</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.05rem", fontWeight:700, color:C.text, marginBottom:".8rem" }}>commerce-control-plane</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".73rem", color:C.muted, lineHeight:1.7, marginBottom:"1.2rem" }}>Reference architecture for AI-native governance layers in distributed commerce infrastructure.</div>
                  <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", marginBottom:"1.2rem" }}>
                    {["Java / Spring","Open Source"].map(t => <span key={t} style={{ fontFamily:"'DM Mono',monospace", fontSize:".64rem", color:C.muted }}>◆ {t}</span>)}
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".64rem", color:C.accent }}>◆ Active</span>
                  </div>
                  <a href="https://github.com/commerce-trust-labs" target="_blank" rel="noreferrer" className="bp" style={{ fontSize:".66rem", padding:".65rem 1.3rem" }}>View on GitHub →</a>
                </div>
              </Reveal>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem", minWidth:0, flex:"1 1 280px" }}>
              {cards.map((c,i) => (
                  <Reveal key={i} delay={i*90}>
                    <div className="ch" style={{ background:C.bg2, border:`1px solid ${C.border}`, padding:"1.6rem 1.8rem", cursor:"default", transition:"background .25s", minWidth:0 }}>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".56rem", letterSpacing:".2em", textTransform:"uppercase", color:C.accent, marginBottom:".4rem" }}>{c.tag}</div>
                      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".88rem", color:C.text, marginBottom:".4rem" }}>{c.title}</div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".73rem", color:C.muted, lineHeight:1.7 }}>{c.body}</div>
                    </div>
                  </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

/* ── RESEARCH ── */
const Research = () => {
const pubs = [
  {
    type: "Architecture",
    title: "Governance Control Plane Reference Architecture",
    desc: "Open reference architecture for AI-governed commerce systems — policy engine design, compliance orchestration, and settlement patterns.",
    link: "https://github.com/commerce-trust-labs/commerce-control-plane",
    linkLabel: "GitHub →"
  },
  {
    type: "Whitepaper",
    title: "AI Commerce Governance Framework (2026)",
    desc: "A framework for certifying, monitoring, and constraining AI agent behavior in retail commerce environments at national scale.",
    link: null,
    linkLabel: "Forthcoming"
  },
  {
    type: "Article",
    title: "Retry Storms in Distributed Commerce Infrastructure",
    desc: "Analysis of cascading failure patterns in high-volume retail systems and patterns for resilient distributed commerce infrastructure.",
    link: "https://medium.com/@praneshsoma/retry-storms-139869b956e3",
    linkLabel: "Read →"
  },
  {
    type: "Article",
    title: "AI Agents Are the New Bot Traffic — And Commerce Infrastructure Isn't Ready",
    desc: "AI agents are beginning to generate machine-speed traffic across retail systems that were designed for human interaction. This article explores how agentic traffic can trigger retry storms, hidden automation loops, and cascading failures in commerce infrastructure—and why the next generation of retail platforms must build governance and control planes to stabilize the ecosystem.",
    link: "https://medium.com/@praneshsoma/ai-agents-are-the-new-bot-traffic-and-commerce-infrastructure-isnt-ready-35e12e01158d",
    linkLabel: "Read →"
  },
  {
    type: "Framework",
    title: "AI-Agent Governance Framework for Retail Platforms",
    desc: "Behavioral constraint specifications, audit trail standards, and explainability requirements for AI agents in U.S. retail commerce.",
    link: null,
    linkLabel: "Forthcoming"
  }
];
  return (
      <section id="research" style={{ background:C.bg2, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
        <div style={inner({ padding:"6rem clamp(1rem, 5vw, 3rem)" })}>
          <Label light>Research & Publications</Label>
          <Reveal>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.5rem,2.2vw,2.2rem)", fontWeight:800, letterSpacing:"-.03em", color:C.text, marginBottom:"3rem", lineHeight:1.05 }}>
              Intellectual Contributions{" "}
              <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:C.accent }}>to the Field</em>
            </h2>
          </Reveal>
          <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:C.border, border:`1px solid ${C.border}` }}>
            {pubs.map((p,i) => (
                <Reveal key={i} delay={i*60}>
                  <div className="pr" style={{ background:C.bg, padding:"1.6rem 2rem", display:"flex", flexWrap:"wrap", gap:"1.5rem", alignItems:"center", minWidth:0 }}>
                    <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".56rem", letterSpacing:".15em", textTransform:"uppercase", color:C.accent, flexShrink:0 }}>{p.type}</div>
                    <div style={{ minWidth:0, flex:"1 1 200px" }}>
                      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".88rem", color:C.text, marginBottom:".3rem" }}>{p.title}</div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".71rem", color:C.muted, lineHeight:1.6 }}>{p.desc}</div>
                    </div>
                    {p.link
                        ? <a href={p.link} target="_blank" rel="noreferrer" className="lk" style={{ flexShrink:0 }}>{p.linkLabel}</a>
                        : <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".66rem", color:C.muted, whiteSpace:"nowrap", flexShrink:0 }}>{p.linkLabel}</span>
                    }
                  </div>
                </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
};

/* ── TEAM ── */
const Team = () => (
    <section id="team" style={{ background:C.bg, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
      <div style={inner({ padding:"6rem clamp(1rem, 5vw, 3rem)" })}>
        <Label>Founder</Label>
        <Reveal>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"4rem", alignItems:"start", border:`1px solid ${C.border}`, padding:"3rem", minWidth:0 }}>
              <div style={{ flexShrink:0, minWidth:0, width:"220px" }}>
                <div style={{ width:"100%", aspectRatio:"3/4", background:C.bg2, border:`1px solid ${C.border}`, marginBottom:"1.2rem", position:"relative", overflow:"hidden" }}>
                    <img
                        src="/Pranesh.PNG"
                        alt="Pranesh Soma"
                        style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }}
                    />
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"3px", background:C.accent }}/>
                </div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1rem", fontWeight:700, color:C.text, marginBottom:".3rem" }}>Pranesh Soma</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", letterSpacing:".12em", textTransform:"uppercase", color:C.accent }}>Founder & Chief Architect</div>
            </div>
            <div style={{ minWidth:0, flex:"1 1 280px" }}>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.2rem,1.8vw,1.6rem)", fontWeight:800, lineHeight:1.1, letterSpacing:"-.03em", color:C.text, marginBottom:"1.8rem" }}>
                Building the{" "}
                <em style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400 }}>Infrastructure That Commerce Runs On</em>
              </h3>
              {[
                "Pranesh Soma is a distributed systems architect and commerce infrastructure engineer with nearly two decades of hands-on experience designing the governance, compliance, and resilience layers that power national-scale retail operations.",
                "As an engineering leader within one of the United States' largest retail platforms, Pranesh designed and deployed systems that prevented significant regulatory exposure, stabilized mission-critical infrastructure under large-scale bot attacks, and built the foundational patterns now being formalized into Commerce Trust Labs' open governance framework.",
                "His expertise is platform-agnostic and transferable — the governance architectures he has designed are as applicable to mid-market e-commerce platforms, government digital services, and financial infrastructure as they are to enterprise retail.",
              ].map((para,i) => (
                  <p key={i} style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".78rem", lineHeight:1.9, color:C.muted, marginBottom:"1rem" }}>{para}</p>
              ))}
              <div style={{ display:"flex", flexWrap:"wrap", gap:"1px", background:C.border, border:`1px solid ${C.border}`, marginTop:"1.8rem" }}>
                {[["Open","Reference Arch"],["Real-time","Policy Engine"],["Federated","Trust Network"],["AI-Native","Governance"]].map(([v,d]) => (
                    <div key={v} style={{ background:C.bg2, padding:"1rem", flex:"1 1 120px", minWidth:0 }}>
                      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:".9rem", fontWeight:800, color:C.accent, marginBottom:".3rem" }}>{v}</div>
                      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".56rem", letterSpacing:".1em", textTransform:"uppercase", color:C.muted }}>{d}</div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
);

/* ── FOOTER ── */
const Footer = () => (
    <footer style={{ background:C.bg2, borderTop:`1px solid ${C.border}`, width:"100%", maxWidth:"100vw", overflow:"hidden" }}>
      <div style={inner({ padding:"3rem clamp(1rem, 5vw, 3rem)", display:"flex", flexWrap:"wrap", gap:"2rem", alignItems:"end" })}>
        <div style={{ minWidth:0, flex:"1 1 280px" }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.1rem", fontWeight:800, color:C.text, marginBottom:".5rem" }}>Commerce Trust Labs</div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".66rem", color:C.muted, marginBottom:"1rem" }}>AI-Governed Commerce Infrastructure — Atlanta, Georgia, USA</div>
          <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:300, fontSize:".64rem", color:"rgba(232,228,220,.18)", lineHeight:1.8, maxWidth:"42ch" }}>Commerce Trust Labs is an independent research and technology initiative focused on governance infrastructure for AI-driven commerce systems.</div>
        </div>
        <div style={{ textAlign:"right", fontFamily:"'DM Mono',monospace", fontSize:".66rem", lineHeight:2.4, minWidth:0, flex:"1 1 200px" }}>
          {[["commercetrustlabs.org","https://commercetrustlabs.org"],["github.com/commerce-trust-labs","https://github.com/commerce-trust-labs"],["contact@commercetrustlabs.org","mailto:contact@commercetrustlabs.org"]].map(([label,href]) => (
              <div key={label}><a href={href} className="fl">{label}</a></div>
          ))}
          <div style={{ color:"rgba(232,228,220,.1)", marginTop:".5rem", fontSize:".6rem" }}>© 2025 Commerce Trust Labs. All rights reserved.</div>
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
