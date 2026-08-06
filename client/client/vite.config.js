import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Copy screen.png and swirled_fabric.png to all sub-directories
const copyFileToDestinations = (srcFile, relativeDestinations) => {
  try {
    const source = path.resolve(srcFile);
    if (fs.existsSync(source)) {
      relativeDestinations.forEach(destRelative => {
        const dest = path.resolve(destRelative);
        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.copyFileSync(source, dest);
      });
      console.log(`Successfully copied ${path.basename(srcFile)} to all destinations`);
    } else {
      console.error(`Source file not found at: ${source}`);
    }
  } catch (err) {
    console.error(`Error copying ${path.basename(srcFile)}:`, err);
  }
};

copyFileToDestinations('../photos/screen.png', [
  'public/photos/screen.png',
  'photos/screen.png',
  '../client/public/photos/screen.png',
  '../client/photos/screen.png',
  '../client/client/public/photos/screen.png',
  '../client/client/photos/screen.png',
  '../client/client/client/public/photos/screen.png',
  '../client/client/client/photos/screen.png',
  '../client/client/client/client/public/photos/screen.png',
  '../client/client/client/client/photos/screen.png',
]);

copyFileToDestinations('public/photos/swirled_fabric.png', [
  '../photos/swirled_fabric.png',
  'photos/swirled_fabric.png',
  '../client/photos/swirled_fabric.png',
  '../client/client/public/photos/swirled_fabric.png',
  '../client/client/photos/swirled_fabric.png',
  '../client/client/client/public/photos/swirled_fabric.png',
  '../client/client/client/photos/swirled_fabric.png',
  '../client/client/client/client/public/photos/swirled_fabric.png',
  '../client/client/client/client/photos/swirled_fabric.png',
  '../client/client/client/client/client/public/photos/swirled_fabric.png',
  '../client/client/client/client/client/photos/swirled_fabric.png',
  '../public/photos/swirled_fabric.png',
]);

// Copy the Saree Styling Guide PDF to all public directories dynamically
const copyPdfToDestinations = () => {
  const filename = 'Trividha Kerala Saree Styling Guide 2026 (2).pdf';
  let srcPath = '';
  const searchPaths = [
    path.resolve(filename),
    path.resolve('..', filename),
    path.resolve('..', '..', filename),
    path.resolve('..', '..', '..', filename)
  ];
  for (const p of searchPaths) {
    if (fs.existsSync(p)) {
      srcPath = p;
      break;
    }
  }

  if (!srcPath) {
    console.warn(`[Vite Config] Styling Guide PDF source not found in search paths.`);
    return;
  }

  const relativeDests = [
    'public',
    '../public',
    '../client/public',
    '../client/client/public',
    '../client/client/client/public',
    '../client/client/client/client/public',
    'client/public',
    'client/client/public',
    'client/client/client/public'
  ];

  relativeDests.forEach(relDir => {
    const dirPath = path.resolve(relDir);
    if (fs.existsSync(dirPath)) {
      const destPath = path.join(dirPath, filename);
      try {
        fs.copyFileSync(srcPath, destPath);
        console.log(`[Vite Config] Automatically copied PDF to: ${destPath}`);
      } catch (err) {
        console.error(`[Vite Config] Failed to copy PDF to ${destPath}:`, err.message);
      }
    }
  });
};

copyPdfToDestinations();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['..']
    }
  }
})

