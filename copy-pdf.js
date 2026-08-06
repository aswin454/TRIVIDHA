const fs = require('fs');
const path = require('path');

const filename = 'trividha-guide.pdf';
const src = path.join(__dirname, filename);

if (!fs.existsSync(src)) {
  console.error(`Source PDF not found at: ${src}`);
  process.exit(1);
}

const destinations = [
  path.join(__dirname, 'public', filename),
  path.join(__dirname, 'client', 'public', filename),
  path.join(__dirname, 'client', 'client', 'public', filename)
];

destinations.forEach(dest => {
  const dir = path.dirname(dest);
  if (fs.existsSync(dir)) {
    try {
      fs.copyFileSync(src, dest);
      console.log(`Successfully copied to: ${dest}`);
    } catch (err) {
      console.error(`Failed to copy to ${dest}:`, err.message);
    }
  }
});

console.log('PDF copy task completed.');
