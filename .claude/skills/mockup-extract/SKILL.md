---
name: mockup-extract
description: Extract all behavior from a mockup HTML section before building a React component. Enforces the 7-category extraction checklist from .claude/rules/components.md.
---

# Mockup Section Extraction

Given a section name (e.g., "Purpose", "Discovery", "Insights Teaser"), systematically extract ALL behavior from the mockup HTML before writing any JSX.

## Steps

1. **Find the section** in the mockup file. The primary mockup is `mockups/services-section-mockup.html`. For other pages check `mockups/insights.html`, `mockups/blueprint-demo-healthcare.html`, `mockups/blueprint-demo-education.html`.

2. **Extract all 7 categories** — output each as a structured section. Missing any category leads to incomplete implementations.

### Category 1: CSS
- Every class used by this section
- All CSS properties (inline styles, `<style>` blocks, media queries)
- Pseudo-elements (::before, ::after)
- CSS custom properties / variables referenced

### Category 2: Content
- All text content (headings, paragraphs, labels, buttons)
- Data attributes
- ARIA attributes
- Image/icon references

### Category 3: Structure
- Full HTML hierarchy (element types, nesting depth)
- Class names on each element
- IDs and anchors

### Category 4: Animations
- Canvas code (look for `<canvas>` elements and their initialization in `<script>`)
- CSS transitions and keyframes
- `requestAnimationFrame` loops
- Animation timing and easing functions

### Category 5: Interactions
- Click handlers and their behavior
- Hover effects (CSS `:hover` and JS mouseover/mouseout)
- Scroll observers (IntersectionObserver)
- Tab switching, accordion expand/collapse
- Focus/blur handlers

### Category 6: Scroll Effects
- Scroll-driven behavior (background transitions, parallax)
- Sticky elements
- Scroll-triggered reveal animations (fade-in, slide-up)
- Scroll position calculations

### Category 7: Cross-Section Effects
- Behavior that spans multiple sections (e.g., body background interpolation)
- Shared scroll listeners
- Navbar state changes triggered by this section
- Transitions into/out of this section

## Output Format

```
## Section: [Name]

### 1. CSS
[list all classes, properties, media queries]

### 2. Content
[all text, data attributes, aria attributes]

### 3. Structure
[HTML hierarchy with class names]

### 4. Animations
[canvas code, CSS animations, RAF loops]

### 5. Interactions
[click, hover, scroll observers, tabs]

### 6. Scroll Effects
[scroll-driven behavior]

### 7. Cross-Section Effects
[behavior spanning multiple sections]

### Implementation Notes
[any gotchas, dependencies on other sections, shared state]
```

## Rules
- Do NOT start writing JSX until all 7 categories are documented
- Do NOT skip a category — write "None" if nothing found
- Do NOT add behavior that isn't in the mockup
- Reference line numbers from the mockup for traceability
