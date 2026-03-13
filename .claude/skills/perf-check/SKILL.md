---
name: perf-check
description: Audit canvas animation modules in src/lib/canvas/ for performance issues. Run after building or modifying any canvas module.
---

# Canvas Performance Audit

Scan canvas animation modules for common performance anti-patterns. Run this after creating or modifying any file in `src/lib/canvas/`.

## What to Check

Audit all `.ts` files in `src/lib/canvas/` for the following issues:

### 1. Per-Frame Object Allocations
**Bad:** Creating objects/arrays inside the animation loop
```ts
// BAD — allocates every frame
function animate() {
  const particles = nodes.map(n => ({ x: n.x, y: n.y }));
}
```
**Fix:** Pre-allocate and reuse. Use object pools or typed arrays for hot paths.

### 2. Missing `isInView()` Guard
**Bad:** Running full animation when canvas is scrolled off-screen
```ts
// BAD — burns CPU when not visible
function animate() {
  ctx.clearRect(0, 0, W, H);
  drawEverything();
  requestAnimationFrame(animate);
}
```
**Fix:** Import `isInView` from `./utils` and skip drawing when canvas is not visible:
```ts
if (!isInView(canvas)) { rafId = requestAnimationFrame(animate); return; }
```

### 3. Unconditional RAF Loop
**Bad:** `requestAnimationFrame` running continuously with no pause mechanism
**Fix:** Consider event-driven updates (scroll/resize listeners) or visibility-based pausing.

### 4. Gradient Creation in Hot Paths
**Bad:** `createRadialGradient()` or `createLinearGradient()` called every frame
**Fix:** Cache gradients and only recreate on resize.

### 5. Font String Rebuilds
**Bad:** Template literals for font strings inside draw loops
```ts
// BAD — string allocation every frame per item
ctx.font = `${size}px Inter`;
```
**Fix:** Pre-compute font strings and cache them.

### 6. Color String Allocations
**Bad:** `rgba()` helper called per-frame for static colors
**Fix:** Cache color strings that don't change. Use the `rgba()` helper from `./utils` only for dynamic opacity.

### 7. Unbounded Arrays
**Bad:** Particle/trail arrays that grow without limit
```ts
// BAD — grows forever
particles.push(newParticle());
```
**Fix:** Use a fixed-size pool with a MAX constant. Reuse dead particles.

### 8. Missing Resize Cleanup
**Bad:** Adding `resize` listener without removing it in cleanup
**Fix:** Ensure the cleanup function returned by `init*()` removes all event listeners.

### 9. Expensive Math in Loops
**Bad:** `Math.sqrt`, `Math.atan2`, trig functions called unnecessarily
**Fix:** Use squared distances for comparisons. Cache trig values where possible.

### 10. Canvas Context State Thrashing
**Bad:** Repeatedly setting the same `ctx.fillStyle`, `ctx.strokeStyle`, `ctx.lineWidth`
**Fix:** Batch draws by style — draw all items of one style, then switch.

## Output Format

For each file audited:
```
## [filename]
- ✅ isInView guard: present
- ⚠️ Per-frame allocation: line 45 — `nodes.map()` inside animate()
- ✅ Bounded particles: MAX_PARTICLES = 30
- ❌ Gradient in hot path: line 78 — createRadialGradient in drawNode()
```

Summary table at the end:
```
| File | Issues | Severity |
|------|--------|----------|
| viz-context.ts | 0 | ✅ Clean |
| viz-build.ts | 2 | ⚠️ Minor |
```

## Rules
- Only flag real performance issues — don't nitpick readability
- Reference line numbers for each finding
- Suggest specific fixes, not generic advice
- Check `src/lib/canvas/utils.ts` for shared helpers that should be used
