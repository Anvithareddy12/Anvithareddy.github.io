# anvitha.ai — Portfolio

Portfolio website for **Anvitha Reddy**, AI Engineer at AMD — built with Three.js, GSAP, and vanilla JS. No frameworks, no build step.

**Live site → anvithareddy12.github.io/Anvithareddy.github.io**

---

## What's inside

| File | Purpose |
|---|---|
| `index.html` | All markup — hero, experience, projects, skills, resume viewer, education, contact |
| `style.css` | Full stylesheet — dark theme, CSS variables, responsive grid |
| `sphere.js` | Three.js r128 — 1,800-particle interactive 3D sphere |
| `main.js` | GSAP animations, neural network canvas, typewriter, scroll reveals, counters |
| `chat.js` | Client-side AI chatbot twin — keyword-matching, no API key required |
| `Anvitha_Resume.pdf` | Downloadable resume |

---

## Built with

- **Three.js r128** — Fibonacci-distributed particle sphere with mouse-reactive rotation, IcosahedronGeometry + OctahedronGeometry wireframes, vertex colours
- **GSAP 3.12.2 + ScrollTrigger** — hero entrance timeline, staggered scroll animations on experience and project cards
- **Canvas API** — 90-node neural network background animation with proximity-based connections
- **Vanilla JS** — zero frameworks, zero build step, deploys as static files
- **CSS custom properties** — full dark theme with cyan, violet, coral, and mint accent palette

---

## Features

- Interactive 3D particle sphere that reacts to mouse movement
- AI chatbot twin — ask it anything about Anvitha's experience, stack, or availability
- Typewriter hero animation cycling through role descriptions
- Animated counter strip (accuracy %, languages, test coverage)
- Scroll-triggered card reveals with GSAP
- Embedded resume viewer with one-click PDF download
- Custom cursor with mix-blend-mode inversion effect
- Fully responsive down to mobile

---

## Run locally

No build step needed — just open `index.html` in a browser, or serve with any static server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

---

## Deploy (GitHub Pages)

1. Push all files to the `main` branch of your repo
2. Go to **Settings → Pages → Source → Deploy from branch → main / root**
3. Your site will be live at `https://<username>.github.io/<repo-name>`

---

*Built with Three.js, GSAP, and obsessive attention to latency.*
