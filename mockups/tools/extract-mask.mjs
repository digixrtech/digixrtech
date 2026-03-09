import { readFileSync } from 'fs';
import { PNG } from 'pngjs';

// Load the logo
const data = readFileSync('image/logo/logo-dark-orig.png');
const png = PNG.sync.read(data);
const { width: iw, height: ih, data: d } = png;

console.error(`Image: ${iw}x${ih}`);

// 1. Find full bounding box of non-transparent pixels
let minX = iw, minY = ih, maxX = 0, maxY = 0;
for (let y = 0; y < ih; y++) {
  for (let x = 0; x < iw; x++) {
    const a = d[(y * iw + x) * 4 + 3];
    if (a > 30) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.error(`Full bounds: (${minX},${minY}) to (${maxX},${maxY})`);

// 2. Find where D symbol ends and text begins (scan for empty rows)
let dBottom = maxY;
for (let y = minY + Math.floor((maxY - minY) * 0.55); y < maxY; y++) {
  let rowPixels = 0;
  for (let x = minX; x <= maxX; x++) {
    if (d[(y * iw + x) * 4 + 3] > 30) rowPixels++;
  }
  if (rowPixels === 0) { dBottom = y; break; }
}

const dX = minX, dY = minY, dW = maxX - minX, dH = dBottom - minY;
console.error(`D symbol: x=${dX} y=${dY} w=${dW} h=${dH}`);

// 3. Sample at a grid
const gridSize = 120;  // 120x120 grid for good resolution
const mask = [];

for (let gy = 0; gy < gridSize; gy++) {
  for (let gx = 0; gx < gridSize; gx++) {
    const px = Math.round(dX + (gx / gridSize) * dW);
    const py = Math.round(dY + (gy / gridSize) * dH);

    // Sample area around this point
    const sampleR = Math.max(1, Math.round(dW / gridSize / 2));
    let filled = 0, total = 0;
    for (let sy = -sampleR; sy <= sampleR; sy++) {
      for (let sx = -sampleR; sx <= sampleR; sx++) {
        const spx = px + sx, spy = py + sy;
        if (spx >= 0 && spx < iw && spy >= 0 && spy < ih) {
          total++;
          if (d[(spy * iw + spx) * 4 + 3] > 30) filled++;
        }
      }
    }
    mask.push(filled / total > 0.35 ? 1 : 0);
  }
}

const maskStr = mask.join('');
const filledCount = mask.filter(v => v).length;
console.error(`Grid: ${gridSize}x${gridSize}, Filled: ${filledCount}/${mask.length}`);

// Output the mask
console.log(`const LOGO_MASK_SIZE = ${gridSize};`);
console.log(`const LOGO_MASK = '${maskStr}';`);
