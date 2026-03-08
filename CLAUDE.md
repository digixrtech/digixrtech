# Digixr Technologies Platform

## Project Overview
Company website for Digixr Technologies — an AI services company specializing in Agentic AI, ERP, and Next-gen App Services. Based in Coimbatore, India.

## Tech Stack
- **Framework:** Next.js 15 (App Router, Server Components)
- **Runtime:** React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + CSS Modules (for complex animations)
- **Package Manager:** pnpm
- **Deployment:** Vercel

## Brand Identity
- **Name:** Always "Digixr" or "DIGIXR" — never "DIGI×R" or "DigixR"
- **Meaning:** Digixr = Digital Elixir
- **Tagline:** "Empowering Businesses with AI Powered Innovation"
- **Brand gradient:** Cyan #4CC9D0 → Teal #3BBFA6 → Emerald #42C68B (135deg)
- **4-pillar lifecycle:** Context → Build → Secure → Assure

## Color Tokens
```
--cyan: #4CC9D0 (rgb: 76, 201, 208)
--teal: #3BBFA6 (rgb: 59, 191, 166)
--emerald: #42C68B (rgb: 66, 198, 139)
--amber: #FFB84D (rgb: 255, 184, 77)
--dark-bg: #0a0a12
--dark-surface: #12121e
Hero background: #FAFCFD (light) transitioning to #0a0a12 (dark) on scroll
```

## Typography
- **Headings:** Plus Jakarta Sans (300-800)
- **Body:** Inter (400-600)
- **Display/Labels:** Outfit (300-700)
- All loaded via `next/font/google`

## Project Structure
```
src/
  app/
    layout.tsx          # Root layout (fonts, navbar, footer)
    page.tsx            # Homepage (composes section components)
    globals.css         # CSS variables, base styles, Tailwind
    insights/
      page.tsx          # Insights listing page
    blueprint-demo/
      healthcare/page.tsx
      education/page.tsx
  components/
    layout/
      Navbar.tsx        # Client component (scroll-aware)
      Footer.tsx        # Server component
    sections/           # Homepage sections (order matters)
      HeroSection.tsx
      ServicesSection.tsx
      BlueprintsSection.tsx
      PurposeSection.tsx
      InsightsTeaser.tsx
      DiscoverySection.tsx
    ui/                 # Reusable primitives
    ChatWidget.tsx      # Floating chat (client component)
  lib/
    canvas/
      agent-network.ts  # Hero canvas animation
      ripple-field.ts   # Purpose section canvas animation
    discovery-flow.ts   # Discovery agent conversation logic
    data/
      architecture-templates.ts
    utils.ts
public/
  images/logo/          # Logo assets
mockups/                # Source HTML mockups (reference only)
```

## Code Conventions
- Use `'use client'` only when the component needs browser APIs (event listeners, canvas, refs, state)
- Server components by default — only add `'use client'` when necessary
- Canvas animations: extract as pure JS/TS modules in `lib/canvas/`, mount via `useRef` + `useEffect`
- Component files: PascalCase (`HeroSection.tsx`)
- Utility files: camelCase (`utils.ts`)
- No `any` type — use proper TypeScript types
- No unnecessary comments — code should be self-documenting
- No console.log in production code (except discovery flow lead capture placeholder)

## Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint check
```

## Design Rules
- Light hero (#FAFCFD) → dark sections (#0a0a12) via scroll-driven bg interpolation
- No overlays — body bg-color driven directly by JS
- Glassmorphism cards with backdrop-filter blur
- Section headers: label (uppercase, teal) + title (gradient accent) + subtitle
- Navbar: color interpolated with scroll (dark text on light, light text on dark)
- Footer: symbol logo + "DIGIXR" / "TECHNOLOGIES" text (not full logo PNG)
- Mobile-first responsive design

## Source of Truth
- `mockups/services-section-mockup.html` — homepage mockup (all sections)
- `mockups/insights.html` — insights listing page
- `mockups/blueprint-demo-healthcare.html` — healthcare demo
- `mockups/blueprint-demo-education.html` — education demo
- `BRAND_DESIGN_GUIDE.md` — complete brand design system
- `tailwind.brand.config.ts` — Tailwind brand tokens

## Important
- The mockups are the visual source of truth. Every component must match the mockup pixel-for-pixel.
- Do not add features, animations, or UI elements that aren't in the mockups.
- Do not refactor or "improve" mockup code — reproduce it faithfully in React/Next.js.
- When in doubt, read the mockup HTML/CSS.
