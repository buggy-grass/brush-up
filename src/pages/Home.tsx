import React from 'react';
import {
  Title1,
  Title2,
  Body1,
  Card,
  CardHeader,
  Button,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import {
  DocumentRegular,
  FolderRegular,
  ImageRegular,
  VideoRegular,
  MusicNote1Regular,
  ArchiveRegular,
} from '@fluentui/react-icons';
import BrushIcon from '../components/icons/BrushIcon';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingVerticalL,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalM,
  },
  card: {
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  welcome: {
    marginBottom: tokens.spacingVerticalXL,
  },
});

const Home: React.FC = () => {
  const styles = useStyles();

  const quickActions = [
    { title: 'Dosyalar', icon: DocumentRegular, description: 'Belgelerinizi yönetin' },
    { title: 'Klasörler', icon: FolderRegular, description: 'Klasör yapınızı düzenleyin' },
    { title: 'Resimler', icon: ImageRegular, description: 'Fotoğraflarınızı görüntüleyin' },
    { title: 'Videolar', icon: VideoRegular, description: 'Video dosyalarınızı izleyin' },
    { title: 'Müzik', icon: MusicNote1Regular, description: 'Müzik koleksiyonunuz' },
    { title: 'Arşiv', icon: ArchiveRegular, description: 'Sıkıştırılmış dosyalar' },
  ];

  const handleQuickAction = (action: string) => {
    console.log(`${action} tıklandı`);
    alert(`${action} tıklandı!`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <BrushIcon size={48} />
          <Title1>Hoş Geldiniz! 🎨</Title1>
        </div>
        <Body1>
          Electron + React + Fluent UI v9 ile oluşturulmuş yaratıcı desktop uygulamasına hoş geldiniz.
        </Body1>
      </div>

      <Title2>Hızlı Erişim</Title2>
      <div className={styles.grid}>
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card
              key={index}
              className={styles.card}
              onClick={() => handleQuickAction(action.title)}
            >
              <CardHeader
                image={<Icon style={{ fontSize: '24px' }} />}
                header={<Title2>{action.title}</Title2>}
                description={action.description}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;