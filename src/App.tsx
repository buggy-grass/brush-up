import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Settings from './pages/Settings';
import About from './pages/About';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <FluentProvider theme={theme === 'dark' ? webDarkTheme : webLightTheme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </FluentProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
