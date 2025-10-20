import React, { ReactNode } from 'react';
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  tokens,
  Button,
  Title1,
  Title2,
  Body1,
  Caption1,
  Divider,
  Spinner,
} from '@fluentui/react-components';
import {
  HomeRegular,
  SettingsRegular,
  InfoRegular,
  DarkThemeRegular,
  LightbulbRegular,
  SubtractRegular,
  MaximizeRegular,
  DismissRegular,
} from '@fluentui/react-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  sidebar: {
    width: '250px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    flexDirection: 'column',
    padding: tokens.spacingVerticalM,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  titleBar: {
    height: '40px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${tokens.spacingHorizontalM}`,
    WebkitAppRegion: 'drag',
  },
  titleBarButtons: {
    display: 'flex',
    gap: tokens.spacingHorizontalXS,
    WebkitAppRegion: 'no-drag',
  },
  content: {
    flex: 1,
    padding: tokens.spacingVerticalL,
    overflow: 'auto',
  },
  navItem: {
    marginBottom: tokens.spacingVerticalXS,
    justifyContent: 'flex-start',
  },
  navItemActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: tokens.spacingVerticalM,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
});

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const styles = useStyles();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Ana Sayfa', icon: HomeRegular },
    { path: '/settings', label: 'Ayarlar', icon: SettingsRegular },
    { path: '/about', label: 'Hakkında', icon: InfoRegular },
  ];

  const handleWindowAction = async (action: string) => {
    if (window.electronAPI) {
      switch (action) {
        case 'minimize':
          await window.electronAPI.minimizeWindow();
          break;
        case 'maximize':
          await window.electronAPI.maximizeWindow();
          break;
        case 'close':
          await window.electronAPI.closeWindow();
          break;
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <Title2 style={{ marginBottom: tokens.spacingVerticalL }}>
          Electron App
        </Title2>
        
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                appearance="transparent"
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                icon={<Icon />}
                onClick={() => navigate(item.path)}
                style={{ width: '100%' }}
              >
                {item.label}
              </Button>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <Button
            appearance="transparent"
            icon={isDark ? <LightbulbRegular /> : <DarkThemeRegular />}
            onClick={toggleTheme}
            style={{ width: '100%', marginBottom: tokens.spacingVerticalS }}
          >
            {isDark ? 'Açık Tema' : 'Koyu Tema'}
          </Button>
          
          <Caption1 style={{ color: tokens.colorNeutralForeground3 }}>
            v1.0.0
          </Caption1>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        {/* Title Bar */}
        <div className={styles.titleBar}>
          <Body1>Electron React Fluent App</Body1>
          <div className={styles.titleBarButtons}>
            <Button
              appearance="subtle"
              size="small"
              icon={<SubtractRegular />}
              onClick={() => handleWindowAction('minimize')}
            />
            <Button
              appearance="subtle"
              size="small"
              icon={<MaximizeRegular />}
              onClick={() => handleWindowAction('maximize')}
            />
            <Button
              appearance="subtle"
              size="small"
              icon={<DismissRegular />}
              onClick={() => handleWindowAction('close')}
            />
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
