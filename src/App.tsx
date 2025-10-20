import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import Layout from './components/Layout';
import Home from './pages/Home';
import Settings from './pages/Settings';
import About from './pages/About';
import CustomWindowTitleBar from './components/window/CustomWindowTitleBar';

const App: React.FC = () => {
  return (
    <FluentProvider theme={webDarkTheme}>
      <CustomWindowTitleBar />
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

export default App;
