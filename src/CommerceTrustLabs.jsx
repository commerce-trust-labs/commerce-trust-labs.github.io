import { useState, useEffect, useRef } from "react";

const COLORS = {
  ink: "#0a0a0f",
  paper: "#f5f2eb",
  accent: "#d4521a",
  navy: "#1a3d6e",
  muted: "#8a8070",
  rule: "rgba(10,10,15,0.1)",
  lightBlue: "#7eb3e8",
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const useCounter = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

// ── Ticker ──────────────────────────────────────────────
const Ticker = () => {
  const items = [
    "AI Commerce Governance", "◆", "Regulatory Trust Infrastructure",
    "◆", "Multi-Retailer Policy Engine", "◆", "Settlement Architecture",
    "◆", "National Commerce Resilience", "◆", "Open Governance Framework", "◆",
  ];
  return (
    <div style={{ background: COLORS.accent, overflow: "hidden", padding: "0.65rem 0", whiteSpace: "nowrap" }}>
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Instrument+Serif:ital@0;1&display=swap');
      `}</style>
      <div style={{ display: "inline-flex", gap: "3rem", animation: "ticker 22s linear infinite" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.paper }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Nav ─────────────────────────────────────────────────
const Nav = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["problem", "mission", "technology", "public-interest", "research", "team"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "1.2rem 3rem",
      background: scrolled ? "rgba(245,242,235,0.92)" : "rgba(245,242,235,0.7)",
      backdropFilter: "blur(14px)",
      borderBottom: scrolled ? `1px solid ${COLORS.rule}` : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <a href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.ink, textDecoration: "none", fontWeight: 400 }}>
        Commerce Trust Labs
      </a>
      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map(l => (
          <a key={l} href={`#${l}`} style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em",
            textTransform: "uppercase", textDecoration: "none",
            color: activeSection === l ? COLORS.accent : COLORS.muted,
            transition: "color 0.2s",
          }}>{l.replace("-", " ")}</a>
        ))}
      </div>
    </nav>
  );
};

// ── Section Label ────────────────────────────────────────
const SectionLabel = ({ children, light = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "3rem" }}>
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: light ? "rgba(245,242,235,0.3)" : COLORS.muted }}>
      {children}
    </span>
    <div style={{ flex: 1, height: "1px", background: light ? "rgba(245,242,235,0.1)" : COLORS.rule }} />
  </div>
);

// ── Reveal wrapper ───────────────────────────────────────
const Reveal = ({ children, delay = 0, style = {} }) => {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
};

// ── Hero Network SVG ─────────────────────────────────────
const NetworkSVG = () => (
  <svg viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
    <defs>
      <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#d4521a" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#d4521a" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="300" cy="350" r="200" fill="url(#hero-glow)" />
    <circle cx="300" cy="350" r="180" stroke="#0a0a0f" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.15" />
    <circle cx="300" cy="350" r="130" stroke="#0a0a0f" strokeWidth="0.5" strokeDasharray="3 8" opacity="0.1" />
    <circle cx="300" cy="350" r="75" stroke="#d4521a" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />
    {/* Outer nodes */}
    {[[300,170],[460,260],[460,440],[300,530],[140,440],[140,260]].map(([x,y], i) => (
      <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 5 : 4} fill={i % 3 === 0 ? "#d4521a" : i % 3 === 1 ? "#1a3d6e" : "#0a0a0f"} opacity={i % 2 === 0 ? 1 : 0.4} />
    ))}
    {/* Outer lines */}
    {[[300,170,460,260],[460,260,460,440],[460,440,300,530],[300,530,140,440],[140,440,140,260],[140,260,300,170]].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0a0a0f" strokeWidth="0.7" opacity="0.12" />
    ))}
    {/* Cross connections */}
    <line x1="300" y1="170" x2="460" y2="440" stroke="#d4521a" strokeWidth="0.5" opacity="0.15" />
    <line x1="460" y1="260" x2="140" y2="440" stroke="#1a3d6e" strokeWidth="0.5" opacity="0.15" />
    <line x1="300" y1="530" x2="140" y2="260" stroke="#d4521a" strokeWidth="0.5" opacity="0.15" />
    {/* Inner nodes */}
    {[[300,280],[370,325],[370,375],[300,420],[230,375],[230,325]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="3" fill={i % 2 === 0 ? "#d4521a" : "#1a3d6e"} opacity="0.5" />
    ))}
    {/* Spokes to center */}
    {[[300,280],[370,325],[370,375],[300,420],[230,375],[230,325]].map(([x,y],i) => (
      <line key={i} x1="300" y1="350" x2={x} y2={y} stroke="#d4521a" strokeWidth="0.8" opacity="0.35" />
    ))}
    {/* Center pulse */}
    <circle cx="300" cy="350" r="10" fill="#d4521a" opacity="0.2" />
    <circle cx="300" cy="350" r="5" fill="#d4521a" />
    {/* Labels */}
    {[
      [310, 162, "#d4521a", "POLICY ENGINE"],
      [468, 252, "#0a0a0f", "COMPLIANCE"],
      [468, 448, "#1a3d6e", "SETTLEMENT"],
      [195, 548, "#0a0a0f", "ANALYTICS"],
      [30, 448, "#d4521a", "GOVERNANCE"],
      [30, 252, "#1a3d6e", "TRUST LAYER"],
    ].map(([x, y, color, label], i) => (
      <text key={i} x={x} y={y} fontFamily="'DM Mono', monospace" fontSize="8.5" fill={color} opacity="0.75">{label}</text>
    ))}
    <line x1="0" y1="350" x2="600" y2="350" stroke="#0a0a0f" strokeWidth="0.3" opacity="0.05" />
    <line x1="300" y1="0" x2="300" y2="700" stroke="#0a0a0f" strokeWidth="0.3" opacity="0.05" />
  </svg>
);

// ── Stat Counter ─────────────────────────────────────────
const StatCounter = ({ prefix = "", num, suffix = "", label, started }) => {
  const count = useCounter(num, 1800, started);
  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.04em", color: COLORS.accent, lineHeight: 1 }}>
        {prefix}{typeof num === "number" ? count.toLocaleString() : num}{suffix}
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.muted, marginTop: "0.2rem" }}>
        {label}
      </div>
    </div>
  );
};

// ── Hero ─────────────────────────────────────────────────
const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "80px", background: COLORS.paper, position: "relative", overflow: "hidden" }}>
      {/* Left */}
      <div style={{ padding: "7rem 3rem 5rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 2 }}>
        <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)", transition: "all 0.6s ease 0.1s", display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "2rem" }}>
          <div style={{ width: "2rem", height: "1px", background: COLORS.accent }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.accent }}>
            AI-Governed Commerce Infrastructure
          </span>
        </div>
        <h1 style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.2s", fontFamily: "'Syne', sans-serif", fontSize: "clamp(3rem, 5vw, 5.5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "1.8rem" }}>
          The Trust<br />Layer for<br />
          <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: COLORS.accent }}>Modern Commerce</em>
        </h1>
        <p style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.35s", fontFamily: "'DM Mono', monospace", fontSize: "0.83rem", lineHeight: 1.8, color: COLORS.muted, maxWidth: "38ch", marginBottom: "2.5rem", fontWeight: 300 }}>
          Commerce Trust Labs is pioneering the governance infrastructure that enables AI-driven commerce systems to operate with regulatory compliance, transactional integrity, and national-scale resilience.
        </p>
        <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all 0.7s ease 0.5s", display: "flex", gap: "1rem" }}>
          <a href="#mission" style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", background: COLORS.ink, color: COLORS.paper, padding: "0.9rem 1.8rem", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
            Our Mission →
          </a>
          <a href="https://github.com/commerce-trust-labs" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", border: `1px solid ${COLORS.rule}`, color: COLORS.ink, padding: "0.9rem 1.8rem", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
            GitHub →
          </a>
        </div>
      </div>
      {/* Right */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.paper }}>
        <NetworkSVG />
        <div ref={statsRef} style={{ position: "absolute", bottom: "3rem", right: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem", zIndex: 3 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.04em", color: COLORS.accent, lineHeight: 1 }}>Open</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.muted, marginTop: "0.2rem" }}>Reference Architecture</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.04em", color: COLORS.accent, lineHeight: 1 }}>Real-time</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.muted, marginTop: "0.2rem" }}>Policy Enforcement</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.04em", color: COLORS.accent, lineHeight: 1 }}>AI-Native</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.muted, marginTop: "0.2rem" }}>Governance Layer</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Problem ──────────────────────────────────────────────
const Problem = () => {
  const problems = [
    { title: "Fragmented Regulatory Compliance", body: "U.S. retailers navigating 50+ state-level eco-fee mandates, data privacy laws, and tax regulations face significant compliance exposure annually — with no unified governance infrastructure to manage cross-jurisdictional enforcement at scale." },
    { title: "AI Systems Lack Trust Controls", body: "As AI agents increasingly orchestrate pricing, inventory, and customer interactions, there is no established framework to audit, constrain, or certify their behavior against regulatory and ethical standards." },
    { title: "Settlement Infrastructure Gaps", body: "The proliferation of payment methods, digital wallets, and embedded finance has outpaced the settlement architectures underpinning them — creating systemic risk across the U.S. retail economy." },
    { title: "No Cross-Retailer Visibility Standard", body: "Unlike financial services — where institutions share fraud signals through federated networks — retail commerce has no equivalent trust layer, leaving each retailer isolated from industry-wide threat intelligence." },
  ];
  return (
    <section id="problem" style={{ background: COLORS.ink, color: COLORS.paper, padding: "8rem 3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
      <div>
        <SectionLabel light>The Problem</SectionLabel>
        <Reveal>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            AI Commerce<br />Operates Without<br />
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: COLORS.accent }}>a Governance Layer</em>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", lineHeight: 1.8, color: "rgba(245,242,235,0.45)", marginTop: "2rem", fontWeight: 300 }}>
            The U.S. retail economy is rapidly adopting AI — but without the governance infrastructure needed to ensure these systems operate safely, fairly, and in compliance with national standards.
          </p>
        </Reveal>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", paddingTop: "0.5rem" }}>
        {problems.map((p, i) => (
          <Reveal key={i} delay={i * 100}>
            <div style={{ borderLeft: `2px solid ${COLORS.accent}`, paddingLeft: "1.5rem" }}>
              <h4 style={{ fontFamily: "'Syne', sans-serif", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.4rem" }}>{p.title}</h4>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.77rem", lineHeight: 1.7, color: "rgba(245,242,235,0.5)", fontWeight: 300 }}>{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ── Mission ──────────────────────────────────────────────
const Mission = () => {
  const pillars = [
    { num: "01", title: "Govern AI in Commerce", body: "We build the policy and trust layer that allows AI agents to operate within retail commerce — setting enforceable behavioral constraints, audit trails, and regulatory guardrails that protect consumers, businesses, and the broader economy." },
    { num: "02", title: "A National Commerce Trust Standard", body: "We envision a shared governance infrastructure — analogous to PCI-DSS for payments or NIST for cybersecurity — that defines how AI systems participate in commerce, open, interoperable, and nationally significant." },
    { num: "03", title: "Protecting the U.S. Retail Economy", body: "U.S. retail commerce is a critical national economic infrastructure. Our work directly reduces systemic compliance risk, enables AI adoption at scale, and ensures the transition to agentic commerce serves the national interest." },
  ];
  return (
    <section id="mission" style={{ padding: "8rem 3rem", background: COLORS.paper }}>
      <SectionLabel>Mission & Vision</SectionLabel>
      <Reveal>
        <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", lineHeight: 1.3, maxWidth: "24ch", marginBottom: "5rem", position: "relative" }}>
          <span style={{ position: "absolute", top: "-1.5rem", left: "-0.5rem", fontSize: "7rem", color: COLORS.rule, fontFamily: "'Instrument Serif', serif", lineHeight: 1 }}>"</span>
          To build the governance infrastructure that makes AI-driven commerce trustworthy, compliant, and resilient at national scale.
        </p>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}>
        {pillars.map((p, i) => (
          <Reveal key={i} delay={i * 120}>
            <div style={{ background: COLORS.paper, padding: "2.5rem", height: "100%", transition: "background 0.2s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = "#ede9e0"}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.paper}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", color: COLORS.accent, marginBottom: "1.2rem" }}>{p.num} —</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.8rem" }}>{p.title}</h3>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.77rem", lineHeight: 1.7, color: COLORS.muted, fontWeight: 300 }}>{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ── Technology ───────────────────────────────────────────
const Technology = () => {
  const cards = [
    { tag: "Layer 1 — Compliance", title: "Regulatory Rule Engine", body: "A dynamic policy engine that ingests jurisdiction-specific regulations — eco-fees, sales tax, data residency, consumer protection — and enforces them in real-time across multi-retailer commerce pipelines. Proven at scale across nationally significant retail infrastructure." },
    { tag: "Layer 2 — Trust", title: "AI Agent Governance", body: "A certification and runtime monitoring framework for AI agents operating in commerce contexts — pricing bots, recommendation engines, inventory orchestrators — providing behavioral auditing, constraint enforcement, and explainability reporting." },
    { tag: "Layer 3 — Settlement", title: "Distributed Settlement Architecture", body: "A next-generation settlement layer designed for the fragmented payments landscape — supporting real-time reconciliation across wallets, BNPL instruments, and embedded finance products while maintaining integrity across banking rails." },
    { tag: "Layer 4 — Intelligence", title: "Cross-Retailer Trust Network", body: "A federated intelligence network enabling participating retailers to share anonymized threat signals, compliance patterns, and governance benchmarks — creating collective defense infrastructure modeled on financial sector fraud intelligence networks." },
  ];
  return (
    <section id="technology" style={{ padding: "8rem 3rem", background: COLORS.navy, color: COLORS.paper }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "end", marginBottom: "4rem" }}>
        <Reveal>
          <SectionLabel light>Reference Architecture</SectionLabel>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Commerce Control Plane —{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: COLORS.lightBlue }}>Governance Framework</em>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.82rem", lineHeight: 1.8, color: "rgba(245,242,235,0.55)", fontWeight: 300 }}>
            Commerce Control Plane is a reference architecture for governance in AI-driven commerce systems — sitting between commerce platforms and the policies, regulations, and trust standards that govern them. Built from 19 years of production experience at national-scale retail infrastructure.
          </p>
        </Reveal>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)" }}>
        {cards.map((c, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{ background: COLORS.navy, padding: "3rem", position: "relative", overflow: "hidden", transition: "background 0.3s", cursor: "default", height: "100%" }}
              onMouseEnter={e => e.currentTarget.style.background = "#1e4880"}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.navy}>
              <div style={{ position: "absolute", bottom: "-1rem", right: "1.5rem", fontSize: "5.5rem", fontWeight: 800, color: "rgba(255,255,255,0.04)", lineHeight: 1, fontFamily: "'Syne', sans-serif", pointerEvents: "none" }}>
                0{i + 1}
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.lightBlue, marginBottom: "1rem" }}>{c.tag}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.8rem" }}>{c.title}</h3>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.77rem", lineHeight: 1.7, color: "rgba(245,242,235,0.5)", fontWeight: 300 }}>{c.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ── Public Interest ──────────────────────────────────────
const PublicInterest = () => {
  const cards = [
    { tag: "National Scale", title: "U.S. Retail Economy at Risk", body: "AI governance failures in commerce infrastructure carry macro-economic consequences — not isolated corporate risk. The systems we govern process consumer transactions at national scale annually." },
    { tag: "Regulatory Gap", title: "No Unified Compliance Standard", body: "50+ state-level regulatory frameworks with no interoperable compliance layer — a structural gap creating significant annual exposure across major U.S. retailers." },
    { tag: "Open Infrastructure", title: "Public-Benefit Technical Initiative", body: "Our reference architectures and governance frameworks are developed as open infrastructure — not proprietary products — to maximize national-level adoption and industry-wide impact." },
  ];
  return (
    <section id="public-interest" style={{ padding: "8rem 3rem", background: "#f0ece2" }}>
      <SectionLabel>Why This Matters</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
        <div>
          <Reveal>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.8rem" }}>
              A National Economic<br />Infrastructure{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: COLORS.accent }}>at Risk</em>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.82rem", lineHeight: 1.9, color: COLORS.muted, fontWeight: 300 }}>
              AI systems are rapidly becoming active participants in commerce — setting prices, recommending products, executing transactions, and managing inventory. Without governance infrastructure, these systems introduce systemic risks including regulatory violations, market manipulation, and large-scale consumer harm.
              <br /><br />
              Commerce Trust Labs develops the governance infrastructure needed to ensure AI-driven commerce operates safely, transparently, and in the national economic interest.
            </p>
          </Reveal>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ background: COLORS.paper, border: `1px solid ${COLORS.rule}`, padding: "1.8rem 2rem" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.accent, marginBottom: "0.5rem" }}>{c.tag}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem" }}>{c.title}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: COLORS.muted, lineHeight: 1.65, fontWeight: 300 }}>{c.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Open Architecture ────────────────────────────────────
const OpenArchitecture = () => (
  <section style={{ padding: "5rem 3rem", background: COLORS.ink, color: COLORS.paper }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
      <div>
        <SectionLabel light>Open Reference Architecture</SectionLabel>
        <Reveal>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.2rem" }}>
            Built in the Open.{" "}
            <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: COLORS.accent }}>For the Industry.</em>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", lineHeight: 1.8, color: "rgba(245,242,235,0.5)", fontWeight: 300, marginBottom: "2rem" }}>
            Commerce Trust Labs publishes open reference architectures for governance-driven commerce infrastructure. Our work is intended to become a shared technical foundation — not a proprietary moat.
          </p>
        </Reveal>
        <Reveal delay={250}>
          <a href="https://github.com/commerce-trust-labs" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem", background: COLORS.accent, color: COLORS.paper, padding: "0.9rem 1.8rem", fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
            View on GitHub →
          </a>
        </Reveal>
      </div>
      <Reveal delay={100}>
        <div style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "2.5rem" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(245,242,235,0.3)", marginBottom: "1.2rem", textTransform: "uppercase" }}>Repository</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", color: COLORS.lightBlue, marginBottom: "0.4rem" }}>commerce-trust-labs /</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>commerce-control-plane</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "rgba(245,242,235,0.4)", lineHeight: 1.7, fontWeight: 300, marginBottom: "1.5rem" }}>
            Reference architecture for AI-native governance layers in distributed commerce infrastructure. Covers policy engines, compliance orchestration, settlement patterns, and trust frameworks.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Java / Spring", "Open Source"].map(t => (
              <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "rgba(245,242,235,0.3)" }}>◆ {t}</span>
            ))}
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.accent }}>◆ Active</span>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

// ── Research ─────────────────────────────────────────────
const Research = () => {
  const pubs = [
    { type: "Architecture", title: "Governance Control Plane Reference Architecture", desc: "Open reference architecture for AI-governed commerce systems — policy engine design, compliance orchestration, and settlement patterns.", link: "https://github.com/commerce-trust-labs/commerce-control-plane", linkLabel: "GitHub →" },
    { type: "Whitepaper", title: "AI Commerce Governance Framework (2026)", desc: "A framework for certifying, monitoring, and constraining AI agent behavior in retail commerce environments at national scale.", link: null, linkLabel: "Forthcoming" },
    { type: "Article", title: "Retry Storms in Distributed Commerce Infrastructure", desc: "Analysis of cascading failure patterns in high-volume retail systems and architectural patterns for resilient distributed commerce infrastructure.", link: "#", linkLabel: "Read →" },
    { type: "Framework", title: "AI-Agent Governance Framework for Retail Platforms", desc: "Behavioral constraint specifications, audit trail standards, and explainability requirements for AI agents in U.S. retail commerce platforms.", link: null, linkLabel: "Forthcoming" },
  ];
  return (
    <section id="research" style={{ padding: "8rem 3rem", background: COLORS.paper }}>
      <SectionLabel>Research & Publications</SectionLabel>
      <Reveal>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "4rem", lineHeight: 1.05 }}>
          Intellectual Contributions{" "}
          <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: COLORS.accent }}>to the Field</em>
        </h2>
      </Reveal>
      <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}>
        {pubs.map((p, i) => (
          <Reveal key={i} delay={i * 80}>
            <div style={{ background: COLORS.paper, padding: "2rem 2.5rem", display: "grid", gridTemplateColumns: "6rem 1fr auto", gap: "2rem", alignItems: "center", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#ede9e0"}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.paper}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.accent }}>{p.type}</div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em", marginBottom: "0.3rem" }}>{p.title}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.73rem", color: COLORS.muted, lineHeight: 1.6, fontWeight: 300 }}>{p.desc}</div>
              </div>
              {p.link ? (
                <a href={p.link} target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.ink, textDecoration: "none", opacity: 0.5, whiteSpace: "nowrap", transition: "opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "0.5"}>{p.linkLabel}</a>
              ) : (
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: COLORS.muted, whiteSpace: "nowrap" }}>{p.linkLabel}</span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

// ── Team ─────────────────────────────────────────────────
const Team = () => {
  const achievements = [
    { val: "Open", desc: "Reference Architecture" },
    { val: "Real-time", desc: "Policy Enforcement" },
    { val: "Federated", desc: "Trust Network" },
    { val: "AI-Native", desc: "Governance Layer" },
  ];
  return (
    <section id="team" style={{ padding: "8rem 3rem", background: COLORS.paper }}>
      <SectionLabel>Founder</SectionLabel>
      <Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2.2fr", gap: "5rem", alignItems: "start", border: `1px solid ${COLORS.rule}`, padding: "4rem" }}>
          {/* Left */}
          <div>
            <div style={{ width: "100%", aspectRatio: "3/4", background: COLORS.ink, marginBottom: "1.5rem", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "4.5rem", fontWeight: 800, color: COLORS.paper, opacity: 0.15 }}>PS</span>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "4px", background: COLORS.accent }} />
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.3rem" }}>Pranesh Soma</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.accent }}>Founder & Chief Architect</div>
          </div>
          {/* Right */}
          <div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "2rem" }}>
              19 Years Building the{" "}
              <em style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>Infrastructure That Commerce Runs On</em>
            </h3>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", lineHeight: 1.85, color: COLORS.muted, fontWeight: 300, marginBottom: "1.4rem" }}>
              Pranesh Soma is a distributed systems architect and commerce infrastructure engineer with nearly two decades of hands-on experience designing the governance, compliance, and resilience layers that power national-scale retail operations. His work spans AI orchestration prototypes, regulatory rule-engine frameworks, traffic governance layers, and settlement architectures — all built for production environments processing at national scale annually.
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", lineHeight: 1.85, color: COLORS.muted, fontWeight: 300, marginBottom: "1.4rem" }}>
              As an engineering leader embedded within one of the United States' largest home improvement retailers, Pranesh designed and deployed systems that prevented significant regulatory exposure, stabilized mission-critical infrastructure under large-scale bot attacks, and built the foundational patterns now being formalized into Commerce Trust Labs' open governance framework.
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", lineHeight: 1.85, color: COLORS.muted, fontWeight: 300, marginBottom: "2.5rem" }}>
              His expertise is platform-agnostic and transferable: the governance architectures he has designed are as applicable to mid-market e-commerce platforms, government digital services, and financial infrastructure as they are to enterprise retail.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: COLORS.rule, border: `1px solid ${COLORS.rule}` }}>
              {achievements.map((a, i) => (
                <div key={i} style={{ background: COLORS.paper, padding: "1.2rem 1.4rem" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.04em", color: COLORS.accent }}>{a.val}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.muted, marginTop: "0.2rem" }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

// ── Footer ───────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: COLORS.ink, color: COLORS.paper, padding: "4rem 3rem", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "end", gap: "2rem" }}>
    <div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.6rem" }}>Commerce Trust Labs</div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "rgba(245,242,235,0.35)", marginBottom: "1.2rem" }}>AI-Governed Commerce Infrastructure — Cumming, Georgia, USA</div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "rgba(245,242,235,0.22)", lineHeight: 1.8, maxWidth: "44ch" }}>
        Commerce Trust Labs is an independent research and technology initiative focused on governance infrastructure for AI-driven commerce systems.
      </div>
    </div>
    <div style={{ textAlign: "right", fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", lineHeight: 2.2 }}>
      {[
        { label: "commercetrustlabs.org", href: "https://commercetrustlabs.org" },
        { label: "github.com/commerce-trust-labs", href: "https://github.com/commerce-trust-labs" },
        { label: "contact@commercetrustlabs.org", href: "mailto:contact@commercetrustlabs.org" },
      ].map(({ label, href }) => (
        <div key={label}>
          <a href={href} style={{ color: "rgba(245,242,235,0.35)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = COLORS.accent}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(245,242,235,0.35)"}>
            {label}
          </a>
        </div>
      ))}
      <div style={{ color: "rgba(245,242,235,0.15)", marginTop: "0.5rem", fontSize: "0.65rem" }}>© 2025 Commerce Trust Labs. All rights reserved.</div>
    </div>
  </footer>
);

// ── App ──────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["problem", "mission", "technology", "public-interest", "research", "team"];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'Syne', sans-serif", background: COLORS.paper, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${COLORS.paper}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.accent}; }
      `}</style>
      <Nav activeSection={activeSection} />
      <Hero />
      <Ticker />
      <Problem />
      <Mission />
      <Technology />
      <PublicInterest />
      <OpenArchitecture />
      <Research />
      <Team />
      <Footer />
    </div>
  );
}
