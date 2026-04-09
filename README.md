# Chrono Wall

Chrono Wall is a premium 3D wall-calendar experience built with Next.js, blending skeuomorphic material design (paper, rings, shadows) with modern interactive motion and generative cosmic visuals.

Designed to feel tactile, cinematic, and alive.

## Live Preview

- **Production:** [chrono-wall.vercel.app](https://chrono-wall.vercel.app)
- **Repository:** [github.com/gativarshney/chrono-wall](https://github.com/gativarshney/chrono-wall)
- **Tech:** Next.js + Tailwind + Framer Motion + React Three Fiber + Zustand

## Quick Details

- **Challenge:** takeUforward Frontend Engineering Challenge
- **Focus Areas:** 3D interaction design, state architecture, premium UI polish, responsive UX
- **Status:** Production deployed on Vercel

---

## Experience

The interface recreates a hanging wall calendar in a dark room:

- a textured paper panel suspended in depth
- magnetic day cells that subtly respond to cursor movement
- aurora-glow range selection with fluid transitions
- page-flip inspired month navigation
- a dynamic top hero that renders procedural space scenes

This is not a flat date picker; it is a crafted interaction surface.

---

## What Makes It Special

### 1) Generative Monthly Cosmic Hero
- 12 month-aware scene presets
- layered near/far particle fields for depth parallax
- glowing animated nebula core with volumetric halo
- seasonal scene tuning:
  - denser/cooler winter star fields
  - calmer spring/summer drift profiles
  - meteor-comet bias in August (Leonid-style feel)

### 2) Tactile Calendar Physics
- desktop 3D tilt with responsive intensity scaling by viewport
- touch-safe behavior on mobile (no jitter, no accidental hover transforms)
- fixed 6-row monthly grid (42 cells) for layout stability across all months

### 3) Rich Range + Notes Workflow
- **Date Range Selection:** Click to select any date range (e.g., April 9–17)
- **Day-wise Notes:** Add, edit, and manage notes for specific days or date ranges
- **Note Storage:** All notes persist locally using Zustand storage middleware
- **Visual Organization:** Color-coded notes (yellow, blue, pink, green) with pinning capability
- **Edit & Delete:** Full CRUD operations on notes with real-time updates
- **Animated Aurora Highlight:** In-range days display animated glow for visual feedback
- **Desktop Notes Panel:** Dedicated side panel for desktop view (sticky headers, smooth scrolling)
- **Mobile Simplified:** Mobile view focused on calendar interaction (notes feature removed for clarity)

### 4) Responsive by Design
- desktop: hero + grid + notes side panel
- mobile: stacked flow + bottom sheet notes drawer
- keyboard focus styles on interactive controls for accessibility

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS
- **Motion:** Framer Motion
- **3D:** React Three Fiber + Drei + Three.js
- **State:** Zustand (persist middleware)
- **Date Utilities:** date-fns
- **Smooth Scrolling:** Lenis

---

## Project Highlights (Implemented)

- [x] custom skeuomorphic color tokens and shadows
- [x] paper texture overlay and ambient dark-wall composition
- [x] ring-binder top detail
- [x] month navigation with page-curl-like animation
- [x] stable 42-cell month grid
- [x] **date range selection** with multiple-day support (e.g., April 9–17)
- [x] **day-wise notes system** for capturing thoughts across date ranges
- [x] **persistent local storage** for all notes via Zustand
- [x] animated aurora-glow highlight for selected ranges
- [x] magnetic date hover (desktop) + mobile-safe interaction fallback
- [x] monthly procedural 3D hero tuning
- [x] **sticky notes with CRUD operations** (add, edit, delete, pin)
- [x] color-coded notes (4 colors) with visual organization
- [x] desktop notes side panel with rich interactions
- [x] mobile calendar-only experience (notes removed for UX clarity)
- [x] custom Chrono Wall favicon/icon

---

## Author

Built by **Gati Varshney** for a high-bar frontend engineering challenge, with a focus on interaction quality, visual craft, and production-ready code architecture.
