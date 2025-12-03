const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔨 Electron build başlatılıyor...');

// TypeScript'i derle
console.log('📝 TypeScript derleniyor...');
execSync('npx tsc', { stdio: 'inherit' });

// Webpack ile renderer'ı build et
console.log('⚛️ React uygulaması build ediliyor...');
execSync('npm run build', { stdio: 'inherit' });

// Electron main dosyasını dist'e kopyala
console.log('📦 Electron dosyaları kopyalanıyor...');
const distPath = path.join(__dirname, '../dist');
const mainPath = path.join(__dirname, '../src/main');

// Main electron.js dosyasını kopyala
if (fs.existsSync(path.join(mainPath, 'electron.js'))) {
  fs.copyFileSync(
    path.join(mainPath, 'electron.js'),
    path.join(distPath, 'electron.js')
  );
}

// Preload dosyasını kopyala
if (fs.existsSync(path.join(mainPath, 'preload.js'))) {
  fs.copyFileSync(
    path.join(mainPath, 'preload.js'),
    path.join(distPath, 'preload.js')
  );
}

console.log('✅ Electron build tamamlandı!');
console.log('🚀 Uygulamayı başlatmak için: npm run electron');






