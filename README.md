# Commerce Trust Labs

The official website for **Commerce Trust Labs** — an independent research and technology initiative building governance infrastructure for AI-driven commerce systems.

Live site: [commercetrustlabs.org](https://commercetrustlabs.org)

---

## About

Commerce Trust Labs pioneers the governance infrastructure that enables AI-driven commerce to operate with regulatory compliance, transactional integrity, and national-scale resilience. This repo is the source for the public-facing website.

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite |
| Styling | Inline React styles + injected `<style>` tags |
| Fonts | Google Fonts — Syne, DM Mono, Instrument Serif |
| Animations | IntersectionObserver API (scroll-reveal) |
| Hosting | GitHub Pages |

No Tailwind. No CSS framework. No component library. Just React + Vite.

---

## Running Locally

### Prerequisites

- Node.js 18+ ([download](https://nodejs.org))
- npm 9+ (comes with Node)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/commerce-trust-labs/commerce-trust-labs.github.io.git
cd commerce-trust-labs.github.io

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## Project Structure

```
commerce-trust-labs.github.io/
├── src/
│   ├── main.jsx              # App entry point
│   ├── CommerceTrustLabs.jsx # Entire site — all sections in one component
│   └── index.css             # Minimal global reset
├── public/                   # Static assets
├── index.html                # HTML shell
├── vite.config.js            # Vite configuration
└── package.json
```

The entire site lives in `src/CommerceTrustLabs.jsx`. Each section (Hero, Problem, Mission, Technology, Impact, Research, Team, Footer) is a self-contained React component in that file.

---

## Sections

| Section | ID | Description |
|---|---|---|
| Hero | — | Landing with network diagram |
| Problem | `#problem` | The governance gap in AI commerce |
| Mission | `#mission` | Vision and three pillars |
| Technology | `#technology` | Reference architecture layers |
| Impact | `#interest` | Why this matters nationally |
| Research | `#research` | Publications and frameworks |
| Team | `#team` | Founder — Pranesh Soma |

---

## Deployment

The site deploys automatically to GitHub Pages from the `main` branch.

```bash
npm run build
# dist/ is served via GitHub Pages
```

---

## Contact

- Website: [commercetrustlabs.org](https://commercetrustlabs.org)
- GitHub: [github.com/commerce-trust-labs](https://github.com/commerce-trust-labs)
- Email: contact@commercetrustlabs.org
