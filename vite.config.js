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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['..']
    }
  }
})

