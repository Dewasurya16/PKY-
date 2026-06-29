const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, 'components');
const appDir = path.join(rootDir, 'app');

// 1. Rename files and update exports
function toPascalCase(str) {
  const name = str.replace(/\.tsx$/, '');
  return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + '.tsx';
}

const componentMap = {}; // mapping from old kebab to new Pascal

function processComponents(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processComponents(fullPath);
    } else if (file.endsWith('.tsx') && !file.match(/^[A-Z]/)) {
      if (file === 'theme-provider.tsx') continue; // ThemeProvider is often kept as-is, but let's change it too if we want. Wait, I'll leave it as is if it's not a pure component, but actually it is. Let's rename it too: ThemeProvider.tsx

      const pascalName = toPascalCase(file);
      const newPath = path.join(dir, pascalName);
      
      componentMap[file.replace('.tsx', '')] = pascalName.replace('.tsx', '');

      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Convert `export function Foo` to `export default function Foo`
      // But only if there is exactly one exported component, or we make the main one default.
      // For cards.tsx, it exports multiple cards. The rule says "default export UserCard".
      // Let's print out what exports are in each file to be safe.
      const exports = [...content.matchAll(/export\s+function\s+([A-Z][a-zA-Z0-9_]*)/g)].map(m => m[1]);
      
      if (exports.length === 1) {
         content = content.replace(new RegExp(`export\\s+function\\s+${exports[0]}`), `export default function ${exports[0]}`);
      } else {
         console.log(`WARNING: Multiple exports in ${file}: ${exports.join(', ')}`);
      }

      fs.writeFileSync(fullPath, content);
      fs.renameSync(fullPath, newPath);
      console.log(`Renamed ${file} to ${pascalName}`);
    }
  }
}

// 2. Update imports across all files
function updateImports(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      updateImports(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Replace import { Component } from "@/components/.../kebab-case"
      // with import Component from "@/components/.../PascalCase"
      for (const [kebab, pascal] of Object.entries(componentMap)) {
         const regexStr = `import\\s*\\{\\s*([a-zA-Z0-9_\\s,]*?)\\s*\\}\\s*from\\s*['"]@\\/components\\/(.*?)\\/${kebab}['"]`;
         const regex = new RegExp(regexStr, 'g');
         
         content = content.replace(regex, (match, importsStr, subPath) => {
             changed = true;
             // If there are multiple imports like import { Card1, Card2 } from '...', 
             // changing to default export will break.
             // We only changed to default export if there was exactly 1 export.
             // Let's assume the script handles the single export case perfectly.
             const imports = importsStr.split(',').map(s => s.trim()).filter(Boolean);
             if (imports.length === 1) {
                 return `import ${imports[0]} from "@/components/${subPath}/${pascal}"`;
             } else {
                 return `import { ${imports.join(', ')} } from "@/components/${subPath}/${pascal}"`;
             }
         });

         // Also replace if it was already default import but wrong path
         const regexStr2 = `import\\s+([a-zA-Z0-9_]+)\\s+from\\s*['"]@\\/components\\/(.*?)\\/${kebab}['"]`;
         const regex2 = new RegExp(regexStr2, 'g');
         content = content.replace(regex2, (match, importName, subPath) => {
             changed = true;
             return `import ${importName} from "@/components/${subPath}/${pascal}"`;
         });
      }

      // Also fix React import order
      // Move any import containing 'react' to the top (after "use client")
      if (content.includes("from 'react'") || content.includes('from "react"')) {
         const lines = content.split('\n');
         let reactImports = [];
         let otherLines = [];
         let useClientLine = -1;

         for (let i = 0; i < lines.length; i++) {
             if (lines[i].trim() === '"use client"' || lines[i].trim() === "'use client'") {
                 useClientLine = i;
                 otherLines.push(lines[i]);
             } else if (lines[i].startsWith('import ') && (lines[i].includes('"react"') || lines[i].includes("'react'"))) {
                 reactImports.push(lines[i]);
             } else {
                 otherLines.push(lines[i]);
             }
         }

         if (reactImports.length > 0) {
             const insertPos = useClientLine >= 0 ? useClientLine + 1 : 0;
             otherLines.splice(insertPos, 0, ...reactImports);
             const newContent = otherLines.join('\n');
             if (newContent !== content) {
                 content = newContent;
                 changed = true;
             }
         }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processComponents(componentsDir);
updateImports(componentsDir);
updateImports(appDir);
console.log("Refactoring complete.");
