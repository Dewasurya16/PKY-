const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const dirsToScan = [path.join(rootDir, 'components'), path.join(rootDir, 'app')];

function toPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Replace imports starting with "@/components/ui/" or "@/components/sections/" followed by a lowercase letter
      content = content.replace(/(import\s+.*?\s+from\s*['"])@\/components\/(ui|sections)\/([a-z][a-zA-Z0-9_-]*)(['"])/g, (match, p1, p2, p3, p4) => {
        if (p3 === 'theme-provider') return match; // exclude theme-provider
        changed = true;
        return `${p1}@/components/${p2}/${toPascalCase(p3)}${p4}`;
      });

      // Also replace relative imports like "./button"
      content = content.replace(/(import\s+.*?\s+from\s*['"])\.\/([a-z][a-zA-Z0-9_-]*)(['"])/g, (match, p1, p2, p3) => {
        if (p2 === 'theme-provider' || p2 === 'globals.css') return match;
        changed = true;
        return `${p1}./${toPascalCase(p2)}${p3}`;
      });

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Fixed imports in ${file}`);
      }
    }
  }
}

dirsToScan.forEach(processDir);
console.log("Cleanup complete.");
