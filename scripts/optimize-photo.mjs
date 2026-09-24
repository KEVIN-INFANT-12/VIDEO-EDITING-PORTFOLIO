import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'public/photos/kevin-original.jpg');
const outDir = path.join(root, 'public/photos');

// Wide landscape (hero) — full frame, subject on the right.
await sharp(src)
  .rotate()
  .resize(1800)
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(outDir, 'kevin.jpg'));
console.log('wrote kevin.jpg');

// Portrait — tight 4:5 crop centered on the subject (right-of-centre in frame).
const meta = await sharp(src).rotate().metadata();
const W = meta.width;
const H = meta.height;
const cropW = Math.round((H * 4) / 5);
const cx = Math.round(W * 0.57); // subject sits right-of-centre
const left = Math.max(0, Math.min(cx - Math.round(cropW / 2), W - cropW));

await sharp(src)
  .rotate()
  .extract({ left, top: 0, width: cropW, height: H })
  .resize(1100)
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(outDir, 'kevin-portrait.jpg'));
console.log('wrote kevin-portrait.jpg', { W, H, left, cropW });

console.log('done');
