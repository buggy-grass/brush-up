import React, { ReactNode } from 'react';
import {
  makeStyles,
  tokens,
  Button,
  Title1,
  Body1,
  Divider,
} from '@fluentui/react-components';
import {
  HomeRegular,
  SettingsRegular,
  InfoRegular,
} from '@fluentui/react-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: 'calc(100vh - 32px)', // Custom title bar yüksekliğini çıkar
    backgroundColor: tokens.colorNeutralBackground1,
  },
  sidebar: {
    width: '250px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: tokens.spacingVerticalM,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    padding: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: tokens.spacingVerticalM,
  },
  navButton: {
    width: '100%',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  activeNavButton: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
  },
});

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Ana Sayfa', icon: HomeRegular },
    { path: '/settings', label: 'Ayarlar', icon: SettingsRegular },
    { path: '/about', label: 'Hakkında', icon: InfoRegular },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Title1>Electron App</Title1>
        <Divider />
        
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Button
              key={item.path}
              appearance="subtle"
              icon={<Icon />}
              className={isActive ? styles.activeNavButton : styles.navButton}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          );
        })}
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <Title1>Hoş Geldiniz!321</Title1>
          <Body1>Electron + React + Fluent UI v9 Desktop Uygulaması</Body1>
        </div>
        
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;