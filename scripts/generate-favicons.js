/**
 * Generate favicon PNG and ICO files from SVG
 *
 * Usage:
 *   npm install sharp png-to-ico
 *   node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

async function generateFavicons() {
  console.log('Generating favicon files...\n');

  // Read the SVG files
  const faviconSvg = fs.readFileSync(path.join(publicDir, 'favicon.svg'));
  const appleSvg = fs.readFileSync(path.join(publicDir, 'apple-icon.svg'));

  // Generate favicon-16x16.png
  await sharp(faviconSvg)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));
  console.log('Created: favicon-16x16.png');

  // Generate favicon-32x32.png
  await sharp(faviconSvg)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Created: favicon-32x32.png');

  // Generate favicon-48x48.png (for ICO)
  await sharp(faviconSvg)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon-48x48.png'));
  console.log('Created: favicon-48x48.png');

  // Generate apple-touch-icon.png (180x180)
  await sharp(appleSvg)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created: apple-touch-icon.png');

  // Generate android-chrome-192x192.png
  await sharp(appleSvg)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  console.log('Created: android-chrome-192x192.png');

  // Generate android-chrome-512x512.png
  await sharp(appleSvg)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'android-chrome-512x512.png'));
  console.log('Created: android-chrome-512x512.png');

  // Generate favicon.ico from the PNG files
  const icoBuffer = await pngToIco([
    path.join(publicDir, 'favicon-16x16.png'),
    path.join(publicDir, 'favicon-32x32.png'),
    path.join(publicDir, 'favicon-48x48.png')
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Created: favicon.ico');

  console.log('\nAll favicon files generated successfully!');
}

generateFavicons().catch(console.error);
