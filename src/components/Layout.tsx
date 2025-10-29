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
import { Stack } from '@fluentui/react';
import RibbonMenu from './toolbar/RibbonMenu';
import ToolbarMenu from './toolbar/ToolbarMenu';
import StatusBar from './toolbar/StatusBar';
import PaintArea from './paint/PaintArea';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: "column",
    height: 'calc(100vh - 32px)', // Custom title bar yüksekliğini çıkar
    backgroundColor: tokens.colorNeutralBackground1,
  },
  
});

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const styles = useStyles();

  return (
    <Stack className={styles.container}>
      <ToolbarMenu />
      <RibbonMenu />
      <PaintArea />
      <StatusBar />
    </Stack>
  );
};

export default Layout;