import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Copy screen.png from root photos to all sub-directories
try {
  const source = path.resolve('../photos/screen.png');
  const destinations = [
    path.resolve('public/photos/screen.png'),
    path.resolve('photos/screen.png'),
    path.resolve('../client/public/photos/screen.png'),
    path.resolve('../client/photos/screen.png'),
    path.resolve('../client/client/public/photos/screen.png'),
    path.resolve('../client/client/photos/screen.png'),
    path.resolve('../client/client/client/public/photos/screen.png'),
    path.resolve('../client/client/client/photos/screen.png'),
    path.resolve('../client/client/client/client/public/photos/screen.png'),
    path.resolve('../client/client/client/client/photos/screen.png'),
  ];
  if (fs.existsSync(source)) {
    destinations.forEach(dest => {
      const dir = path.dirname(dest);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.copyFileSync(source, dest);
    });
    console.log('Successfully copied screen.png to all destinations');
  } else {
    console.error('Source screen.png not found at:', source);
  }
} catch (err) {
  console.error('Error copying screen.png:', err);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['..']
    }
  }
})

