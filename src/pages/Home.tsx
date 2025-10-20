import React, { useEffect, useState } from 'react';
import {
  Title1,
  Title2,
  Body1,
  Card,
  CardHeader,
  CardPreview,
  Button,
  makeStyles,
  tokens,
  Spinner,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-components';
import {
  DocumentRegular,
  FolderRegular,
  ImageRegular,
  VideoRegular,
  MusicNote1Regular,
  ArchiveRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingVerticalL,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: tokens.spacingVerticalM,
    marginTop: tokens.spacingVerticalL,
  },
  card: {
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalL,
  },
  statCard: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    textAlign: 'center',
  },
  welcome: {
    marginBottom: tokens.spacingVerticalXL,
  },
});

const Home: React.FC = () => {
  const styles = useStyles();
  const [appInfo, setAppInfo] = useState<{
    version: string;
    platform: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppInfo = async () => {
      if (window.electronAPI) {
        try {
          const [version, platform] = await Promise.all([
            window.electronAPI.getVersion(),
            window.electronAPI.getPlatform(),
          ]);
          setAppInfo({ version, platform });
        } catch (error) {
          console.error('App bilgileri alınamadı:', error);
        }
      }
      setLoading(false);
    };

    fetchAppInfo();
  }, []);

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
    // Burada ilgili işlemler yapılabilir
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <Title1>Hoş Geldiniz! 👋</Title1>
        <Body1>
          Electron + React + Fluent UI v9 ile oluşturulmuş modern desktop uygulamanıza hoş geldiniz.
        </Body1>
      </div>

      {appInfo && (
        <MessageBar intent="info" style={{ marginBottom: tokens.spacingVerticalL }}>
          <MessageBarTitle>Uygulama Bilgileri</MessageBarTitle>
          <MessageBarBody>
            Versiyon: {appInfo.version} | Platform: {appInfo.platform}
          </MessageBarBody>
        </MessageBar>
      )}

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

      <Title2 style={{ marginTop: tokens.spacingVerticalXL }}>İstatistikler</Title2>
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <Title2>12</Title2>
          <Body1>Toplam Dosya</Body1>
        </div>
        <div className={styles.statCard}>
          <Title2>5</Title2>
          <Body1>Klasör</Body1>
        </div>
        <div className={styles.statCard}>
          <Title2>2.4 GB</Title2>
          <Body1>Kullanılan Alan</Body1>
        </div>
        <div className={styles.statCard}>
          <Title2>85%</Title2>
          <Body1>Boş Alan</Body1>
        </div>
      </div>
    </div>
  );
};

export default Home;
