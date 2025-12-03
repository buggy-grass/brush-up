# Electron React Fluent UI v9 Boilerplate

Modern, performanslı ve kullanıcı dostu desktop uygulaması için hazırlanmış boilerplate. TypeScript, Webpack 5 ve Fluent UI v9 ile güçlendirilmiş.

## 🚀 Özellikler

- ⚛️ **React 18** - En güncel React sürümü
- 🎨 **Fluent UI v9** - Microsoft'un modern tasarım sistemi
- 📘 **TypeScript** - Tip güvenliği ve gelişmiş DX
- ⚡ **Webpack 5** - Hızlı ve optimize build sistemi
- 🌙 **Dark/Light Mode** - Otomatik tema değiştirme
- 🛣️ **React Router** - SPA routing sistemi
- 🌉 **Context Bridge** - Main-renderer güvenli iletişim
- 📱 **Responsive Design** - Tüm ekran boyutları için optimize
- 🔧 **ESLint + Prettier** - Kod kalitesi ve formatlama
- 📦 **Electron Builder** - Cross-platform paketleme

## 🛠️ Teknoloji Yığını

- **Frontend**: React 18, TypeScript, Fluent UI v9
- **Build**: Webpack 5, Babel, ESLint
- **Desktop**: Electron 27
- **Styling**: Fluent UI Components, CSS-in-JS
- **Routing**: React Router v6
- **State**: React Context API

## 📦 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme modunda çalıştır
npm run electron-dev

# Production build
npm run build:electron

# Uygulamayı paketle
npm run build:pack
```

## 🚀 Hızlı Başlangıç

### Geliştirme Modu

```bash
# Webpack dev server + Electron
npm run electron-dev
```

### Production Build

```bash
# Tüm uygulamayı build et
npm run build:electron

# Electron uygulamasını çalıştır
npm run electron
```

### Paketleme

```bash
# Platform-specific installer oluştur
npm run build:pack
```

## 📁 Proje Yapısı

```
├── public/
│   ├── index.html          # HTML template
│   └── electron.js         # Electron main process
├── src/
│   ├── components/         # React bileşenleri
│   ├── pages/             # Sayfa bileşenleri
│   ├── contexts/          # React Context'ler
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript tip tanımları
│   ├── utils/             # Yardımcı fonksiyonlar
│   ├── main/              # Electron main process
│   ├── App.tsx            # Ana uygulama
│   └── index.tsx          # Entry point
├── scripts/               # Build scriptleri
├── webpack.config.js      # Webpack konfigürasyonu
├── tsconfig.json          # TypeScript konfigürasyonu
└── package.json
```

## 🎨 Tema Sistemi

Uygulama otomatik dark/light mode desteği ile gelir:

```tsx
import { useTheme } from '@/contexts/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <Button onClick={toggleTheme}>
      {isDark ? 'Açık Tema' : 'Koyu Tema'}
    </Button>
  );
};
```

## 🌉 Context Bridge

Main ve renderer process arasında güvenli iletişim:

```tsx
// Renderer process'te
const version = await window.electronAPI.getVersion();
const platform = await window.electronAPI.getPlatform();
await window.electronAPI.openExternal('https://example.com');
```

## 🛣️ Routing

React Router v6 ile SPA routing:

```tsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="/about" element={<About />} />
</Routes>
```

## 📱 Responsive Design

Fluent UI v9 bileşenleri ile responsive tasarım:

```tsx
import { 
  Button, 
  Card, 
  makeStyles,
  tokens 
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingVerticalM,
  },
});
```

## 🔧 Geliştirme

### Kod Kalitesi

```bash
# Linting
npm run lint

# Linting + otomatik düzeltme
npm run lint:fix

# Type checking
npm run type-check
```

### Build Optimizasyonları

- **Code Splitting**: Otomatik chunk bölme
- **Tree Shaking**: Kullanılmayan kod temizleme
- **Minification**: CSS ve JS sıkıştırma
- **Source Maps**: Debug için kaynak haritaları
- **Hot Reload**: Geliştirme sırasında hızlı yenileme

## 📦 Paketleme

Electron Builder ile cross-platform paketleme:

```bash
# Windows
npm run build:pack -- --win

# macOS
npm run build:pack -- --mac

# Linux
npm run build:pack -- --linux
```

## 🚀 Performans

- **Lazy Loading**: Route bazlı kod bölme
- **Memoization**: React.memo ve useMemo optimizasyonları
- **Bundle Analysis**: Webpack bundle analyzer
- **Tree Shaking**: Kullanılmayan kod temizleme
- **Compression**: Gzip ve Brotli sıkıştırma

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

- **Email**: info@example.com
- **Website**: https://example.com
- **GitHub**: https://github.com/example/electron-react-fluent-boilerplate

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!






