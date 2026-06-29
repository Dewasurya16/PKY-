const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const componentsDir = path.join(rootDir, 'components');
const appDir = path.join(rootDir, 'app');

function toPascalCase(str) {
  const name = str.replace(/\.tsx$/, '');
  return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + '.tsx';
}

const componentMap = {};

function processComponents(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processComponents(fullPath);
    } else if (file.endsWith('.tsx') && !file.match(/^[A-Z]/)) {
      if (file === 'theme-provider.tsx') continue;

      const pascalName = toPascalCase(file);
      const newPath = path.join(dir, pascalName);
      
      componentMap[file.replace('.tsx', '')] = pascalName.replace('.tsx', '');

      // Just rename the file, do not change export syntax!
      fs.renameSync(fullPath, newPath);
      console.log(`Renamed ${file} to ${pascalName}`);
    }
  }
}

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

      // Update the path but preserve the import style (named or default)
      for (const [kebab, pascal] of Object.entries(componentMap)) {
         // This regex matches import { ... } from "@/components/.../kebab"
         // or import ... from "@/components/.../kebab"
         const regexStr = `(import\\s+.*?\\s+from\\s*['"]@\\/components\\/(?:[a-zA-Z0-9_\\-/]*?)\\/)${kebab}(['"])`;
         const regex = new RegExp(regexStr, 'g');
         
         content = content.replace(regex, (match, prefix, suffix) => {
             changed = true;
             return `${prefix}${pascal}${suffix}`;
         });
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

// Ensure clean state before running
console.log("Starting refactor...");
processComponents(componentsDir);
updateImports(componentsDir);
updateImports(appDir);
console.log("Path refactoring complete. No export styles were changed.");
