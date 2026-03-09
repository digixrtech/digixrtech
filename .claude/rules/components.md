---
globs: src/components/**/*.tsx
---

# Component Rules

- Every component must match the mockup pixel-for-pixel. Read the corresponding section in `mockups/services-section-mockup.html` before writing any component.
- Use `'use client'` only when the component needs browser APIs (event listeners, canvas, refs, state). Server components by default.
- Component files use PascalCase: `HeroSection.tsx`, `ServicesSection.tsx`.
- Section components go in `src/components/sections/`. Layout components go in `src/components/layout/`. Reusable primitives go in `src/components/ui/`.
- No `any` type. No unnecessary comments. No console.log in production code.
- Do not add features, animations, or UI elements that aren't in the mockups.
- Do not refactor or "improve" mockup code — reproduce it faithfully in React/Next.js.
