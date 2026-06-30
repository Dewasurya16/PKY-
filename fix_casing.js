const fs = require('fs');
const path = require('path');

const dirs = [
  'components/sections',
  'components/ui',
  'app',
];

const replacements = [
  ['@/components/ui/badge', '@/components/ui/Badge'],
  ['@/components/ui/button', '@/components/ui/Button'],
  ['@/components/ui/motion', '@/components/ui/Motion'],
];

function processDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      for (const [from, to] of replacements) {
        if (content.includes(from)) {
          // Only replace the import path, not the PascalCase ones
          content = content.split(from).join(to);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed:', path.relative('.', fullPath));
      }
    }
  }
}

const root = path.resolve('.');
for (const dir of dirs) {
  const fullDir = path.join(root, dir);
  if (fs.existsSync(fullDir)) {
    processDir(fullDir);
  }
}
console.log('Done!');
