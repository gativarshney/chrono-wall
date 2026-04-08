# Chrono Wall

A 3D interactive wall calendar built for the takeUforward Frontend Engineering Challenge.

## Design Concept

Chrono Wall reimagines a physical wall calendar in 3D space. The experience is skeuomorphic yet modern — a cream paper calendar hanging in a dark room, with a generative cosmic scene that changes each month using Three.js particles. Interactions have physical weight: the calendar tilts with your mouse, dates lift magnetically toward the cursor, and months flip like real calendar pages.

## Features

- **3D Perspective** — Full canvas 3D tilt on the calendar body using Framer Motion spring physics
- **Cosmic Hero** — 12 unique generative particle systems via React Three Fiber, one per month
- **Page-Curl Month Transition** — Framer Motion `AnimatePresence` with rotateY for a physical flip
- **Date Range Selector** — Click start -> end with aurora gradient highlighting in between
- **Magnetic Date Cells** — Pointer-position math lifts cells toward the cursor
- **Notes Panel** — Color-coded sticky notes per date range, persisted in localStorage via Zustand
- **Holiday Markers** — Indian public holidays marked with accent dots
- **Fully Responsive** — Desktop side-by-side layout, mobile stacked with bottom sheet for notes

## Stack

- Next.js 14 (App Router)
- Tailwind CSS v3
- Framer Motion
- React Three Fiber + Drei
- Zustand (with localStorage persistence)
- date-fns

## Run Locally

```bash
git clone https://github.com/gativarshney/chrono-wall
cd chrono-wall
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy

Deployed on Vercel: [chrono-wall.vercel.app](https://chrono-wall.vercel.app)
