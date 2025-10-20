import React, { useState, useEffect } from 'react';
import {
  Title1,
  Title2,
  Body1,
  Card,
  CardHeader,
  Button,
  makeStyles,
  tokens,
  Divider,
  Badge,
  Link,
  Avatar,
} from '@fluentui/react-components';
import {
  InfoRegular,
  CodeRegular,
  HeartRegular,
  GlobeRegular,
  MailRegular,
  CallRegular,
  LocationRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingVerticalL,
  },
  hero: {
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalXL,
    padding: tokens.spacingVerticalXXL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
  },
  avatar: {
    width: '80px',
    height: '80px',
    margin: '0 auto',
    marginBottom: tokens.spacingVerticalM,
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalXL,
  },
  featureCard: {
    textAlign: 'center',
    padding: tokens.spacingVerticalL,
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalS,
    justifyContent: 'center',
    marginTop: tokens.spacingVerticalM,
  },
  techBadge: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    borderRadius: tokens.borderRadiusSmall,
    fontSize: tokens.fontSizeBase200,
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: tokens.spacingVerticalM,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
});

const About: React.FC = () => {
  const styles = useStyles();
  const [appInfo, setAppInfo] = useState<{
    version: string;
    platform: string;
  } | null>(null);

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
    };

    fetchAppInfo();
  }, []);

  const techStack = [
    'Electron',
    'React 18',
    'TypeScript',
    'Fluent UI v9',
    'Webpack 5',
    'Babel',
    'ESLint',
  ];

  const features = [
    {
      title: 'Modern UI',
      description: 'Fluent UI v9 ile modern ve tutarlı kullanıcı arayüzü',
      icon: <InfoRegular style={{ fontSize: '32px' }} />,
    },
    {
      title: 'TypeScript',
      description: 'Tip güvenliği ve gelişmiş geliştirici deneyimi',
      icon: <CodeRegular style={{ fontSize: '32px' }} />,
    },
    {
      title: 'Dark Mode',
      description: 'Koyu ve açık tema desteği ile kullanıcı tercihi',
      icon: <HeartRegular style={{ fontSize: '32px' }} />,
    },
    {
      title: 'Cross Platform',
      description: 'Windows, macOS ve Linux desteği',
      icon: <GlobeRegular style={{ fontSize: '32px' }} />,
    },
  ];

  const handleOpenExternal = async (url: string) => {
    if (window.electronAPI) {
      await window.electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <Avatar
          className={styles.avatar}
          name="Electron React App"
          size={96}
        />
        <Title1>Electron React Fluent Boilerplate</Title1>
        <Body1 style={{ marginBottom: tokens.spacingVerticalM }}>
          Modern, performanslı ve kullanıcı dostu desktop uygulaması
        </Body1>
        {appInfo && (
          <Badge appearance="filled" color="brand">
            v{appInfo.version} - {appInfo.platform}
          </Badge>
        )}
      </div>

      {/* Features */}
      <Title2 style={{ textAlign: 'center', marginBottom: tokens.spacingVerticalL }}>
        Özellikler
      </Title2>
      <div className={styles.featureGrid}>
        {features.map((feature, index) => (
          <Card key={index} className={styles.featureCard}>
            <div style={{ marginBottom: tokens.spacingVerticalM }}>
              {feature.icon}
            </div>
            <Title2 style={{ marginBottom: tokens.spacingVerticalS }}>
              {feature.title}
            </Title2>
            <Body1>{feature.description}</Body1>
          </Card>
        ))}
      </div>

      {/* Tech Stack */}
      <Title2 style={{ textAlign: 'center', marginBottom: tokens.spacingVerticalL }}>
        Teknoloji Yığını
      </Title2>
      <Card>
        <CardHeader header="Kullanılan Teknolojiler" />
        <div className={styles.techStack}>
          {techStack.map((tech, index) => (
            <span key={index} className={styles.techBadge}>
              {tech}
            </span>
          ))}
        </div>
      </Card>

      {/* App Info */}
      <Title2 style={{ marginTop: tokens.spacingVerticalXL, marginBottom: tokens.spacingVerticalL }}>
        Uygulama Bilgileri
      </Title2>
      <Card>
        <CardHeader header="Sistem Bilgileri" />
        <div style={{ padding: tokens.spacingVerticalM }}>
          <Body1><strong>Uygulama Adı:</strong> Electron React Fluent Boilerplate</Body1>
          <Body1><strong>Versiyon:</strong> {appInfo?.version || 'Yükleniyor...'}</Body1>
          <Body1><strong>Platform:</strong> {appInfo?.platform || 'Yükleniyor...'}</Body1>
          <Body1><strong>Node.js:</strong> {process.versions.node}</Body1>
          <Body1><strong>Chrome:</strong> {process.versions.chrome}</Body1>
          <Body1><strong>Electron:</strong> {process.versions.electron}</Body1>
        </div>
      </Card>

      {/* Contact */}
      <Title2 style={{ marginTop: tokens.spacingVerticalXL, marginBottom: tokens.spacingVerticalL }}>
        İletişim
      </Title2>
      <div className={styles.contactGrid}>
        <div className={styles.contactItem}>
          <MailRegular />
          <Link
            onClick={() => handleOpenExternal('mailto:info@example.com')}
            style={{ cursor: 'pointer' }}
          >
            info@example.com
          </Link>
        </div>
        <div className={styles.contactItem}>
          <GlobeRegular />
          <Link
            onClick={() => handleOpenExternal('https://example.com')}
            style={{ cursor: 'pointer' }}
          >
            example.com
          </Link>
        </div>
        <div className={styles.contactItem}>
          <CallRegular />
          <Body1>+90 (555) 123-4567</Body1>
        </div>
        <div className={styles.contactItem}>
          <LocationRegular />
          <Body1>İstanbul, Türkiye</Body1>
        </div>
      </div>

      {/* Footer */}
      <Divider style={{ margin: `${tokens.spacingVerticalXL} 0` }} />
      <div style={{ textAlign: 'center', color: tokens.colorNeutralForeground3 }}>
        <Body1>
          © 2024 Electron React Fluent Boilerplate. Tüm hakları saklıdır.
        </Body1>
        <Body1 style={{ marginTop: tokens.spacingVerticalS }}>
          ❤️ ile yapılmıştır
        </Body1>
      </div>
    </div>
  );
};

export default About;
