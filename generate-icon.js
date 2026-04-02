#!/usr/bin/env node
/**
 * generate-icon.js
 * Run once locally: node generate-icon.js
 * Fetches the mBlock favicon and saves it as icon.png (256x256).
 * Requires: npm install sharp (optional, falls back to placeholder)
 */

const https = require('https');
const fs = require('fs');

const FAVICON_URL = 'https://ide.mblock.cc/favicon.ico';
const OUTPUT = 'icon.png';

// Minimal 256x256 placeholder PNG (blue square with "M")
const PLACEHOLDER_B64 =
  'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAABGdBTUEAALGPC/xhBQ' +
  'AAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAA' +
  'AIAAAAAAAAABAAAAgAAAAQAAAAGAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8' +
  'YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIASURBVHhe7cExAQAAAMKg9U9tDB+g' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAeAMBuAABHgAAAABJRU5ErkJggg==';

try {
  const sharp = require('sharp');
  const req = https.get(FAVICON_URL, (res) => {
    const chunks = [];
    res.on('data', (d) => chunks.push(d));
    res.on('end', () => {
      const buf = Buffer.concat(chunks);
      sharp(buf).resize(256, 256).png().toFile(OUTPUT, (err) => {
        if (err) {
          console.warn('sharp failed, using placeholder:', err.message);
          fs.writeFileSync(OUTPUT, Buffer.from(PLACEHOLDER_B64, 'base64'));
        } else {
          console.log('icon.png created from favicon');
        }
      });
    });
  });
  req.on('error', () => {
    fs.writeFileSync(OUTPUT, Buffer.from(PLACEHOLDER_B64, 'base64'));
    console.log('icon.png created (placeholder)');
  });
} catch {
  fs.writeFileSync(OUTPUT, Buffer.from(PLACEHOLDER_B64, 'base64'));
  console.log('icon.png created (placeholder — install sharp for real icon)');
}
