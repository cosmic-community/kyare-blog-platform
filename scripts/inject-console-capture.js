const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../.next/server/app');
const scriptPath = path.join(__dirname, '../public/dashboard-console-capture.js');

function injectScript(htmlPath) {
  let html = fs.readFileSync(htmlPath, 'utf-8');
  const script = fs.readFileSync(scriptPath, 'utf-8');
  const scriptTag = `<script>${script}</script>`;
  
  if (!html.includes('dashboard-console-capture')) {
    html = html.replace('</head>', `${scriptTag}</head>`);
    fs.writeFileSync(htmlPath, html);
    console.log(`Injected console capture into ${htmlPath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

if (fs.existsSync(buildDir)) {
  walkDir(buildDir);
  console.log('Console capture script injection complete');
} else {
  console.log('Build directory not found. Run this after build.');
}