# Canvas Animation Rules

## File Structure
- All canvas animations live in `src/lib/canvas/` as pure TypeScript modules.
- Shared utilities (colors, math, viewport checks) live in `src/lib/canvas/utils.ts`.
- One exported `init*` function per module. No default exports.

## init Function Contract
- Signature: `export function initXyz(canvas: HTMLCanvasElement, ...args): () => void`
- Accepts the canvas element as the first argument.
- Returns a cleanup function that cancels `requestAnimationFrame` and removes event listeners.
- Handles DPR scaling (`window.devicePixelRatio`) internally.
- Adds its own `resize` listener and cleans it up on teardown.

## Mounting in React
- Mount via `useRef<HTMLCanvasElement>` + `useEffect`.
- Call `init*` inside `useEffect`, return the cleanup function directly.
- The component must have `'use client'` directive.
```tsx
useEffect(() => {
  if (!canvasRef.current) return;
  return initXyz(canvasRef.current);
}, []);
```

## Performance
- Use `isInView()` from utils to skip rendering when off-screen.
- Prefer `requestAnimationFrame` over `setInterval`.
- Limit particle/entity counts — profile on low-end devices.
- Avoid allocations inside the animation loop (pre-allocate arrays, reuse objects).
- Use offscreen canvases for compositing when mixing multiple layers.

## Colors
- Import brand colors from `utils.ts`: `CYAN`, `TEAL`, `EMERALD`, `AMBER`, `WHITE`.
- Use `rgba()` helper for color strings. Use `lerpColor()` for gradients.
- Do not hardcode RGB values — always reference the shared constants.

## Conventions
- No `console.log` in production canvas code.
- No `any` types.
- Canvas CSS sizing is set via the parent component's stylesheet, not inline styles.
- Animation modules must be self-contained — no React imports, no DOM queries beyond the canvas element.
