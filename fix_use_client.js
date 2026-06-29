const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, 'components');
const appDir = path.join(rootDir, 'app');

function fixUseClient(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fixUseClient(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      if (content.includes('"use client"') || content.includes("'use client'")) {
         const lines = content.split('\n');
         let useClientLine = -1;
         
         // Find use client
         for (let i = 0; i < lines.length; i++) {
             if (lines[i].includes('"use client"') || lines[i].includes("'use client'")) {
                 useClientLine = i;
                 break;
             }
         }
         
         if (useClientLine > 0) {
             // Move it to the first line
             const useClientStr = lines.splice(useClientLine, 1)[0];
             lines.unshift(useClientStr);
             fs.writeFileSync(fullPath, lines.join('\n'));
             console.log(`Fixed use client in ${file}`);
         }
      }
    }
  }
}

fixUseClient(componentsDir);
fixUseClient(appDir);
