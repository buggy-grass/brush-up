import React, { useState, useEffect } from 'react';
import {
  Title1,
  Title2,
  Body1,
  Card,
  CardHeader,
  Switch,
  Input,
  Label,
  Button,
  makeStyles,
  tokens,
  Divider,
  Field,
  Textarea,
  Slider,
  RadioGroup,
  Radio,
  Checkbox,
} from '@fluentui/react-components';
import {
  SettingsRegular,
  DarkThemeRegular,
  DesktopRegular,
  Speaker0Regular,
  ShieldRegular,
  InfoRegular,
} from '@fluentui/react-icons';
import { useTheme } from '../contexts/ThemeContext';

const useStyles = makeStyles({
  container: {
    padding: tokens.spacingVerticalL,
  },
  section: {
    marginBottom: tokens.spacingVerticalXL,
  },
  card: {
    marginBottom: tokens.spacingVerticalM,
  },
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  settingContent: {
    flex: 1,
    marginRight: tokens.spacingHorizontalM,
  },
  settingControl: {
    minWidth: '120px',
  },
  sliderContainer: {
    padding: tokens.spacingVerticalM,
  },
  radioGroup: {
    padding: tokens.spacingVerticalM,
  },
  checkboxGroup: {
    padding: tokens.spacingVerticalM,
  },
});

const Settings: React.FC = () => {
  const styles = useStyles();
  const { theme, toggleTheme, isDark } = useTheme();
  
  const [settings, setSettings] = useState({
    notifications: true,
    autoStart: false,
    minimizeToTray: true,
    soundEnabled: true,
    volume: 50,
    language: 'tr',
    fontSize: 'medium',
    autoUpdate: true,
    analytics: false,
    crashReports: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    // Ayarları kaydetme işlemi
    console.log('Ayarlar kaydedildi:', settings);
    // Burada localStorage veya Electron store kullanılabilir
  };

  const handleReset = () => {
    // Varsayılan ayarlara dön
    setSettings({
      notifications: true,
      autoStart: false,
      minimizeToTray: true,
      soundEnabled: true,
      volume: 50,
      language: 'tr',
      fontSize: 'medium',
      autoUpdate: true,
      analytics: false,
      crashReports: true,
    });
  };

  return (
    <div className={styles.container}>
      <Title1>Ayarlar ⚙️</Title1>
      <Body1 style={{ marginBottom: tokens.spacingVerticalXL }}>
        Uygulamanızın davranışını ve görünümünü özelleştirin.
      </Body1>

      {/* Görünüm Ayarları */}
      <div className={styles.section}>
        <Title2>
          <DesktopRegular style={{ marginRight: tokens.spacingHorizontalS }} />
          Görünüm
        </Title2>
        <Card className={styles.card}>
          <CardHeader header="Tema Ayarları" />
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <Label>Koyu Tema</Label>
              <Body1>Koyu tema kullan</Body1>
            </div>
            <div className={styles.settingControl}>
              <Switch
                checked={isDark}
                onChange={toggleTheme}
              />
            </div>
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <Label>Font Boyutu</Label>
              <Body1>Metin boyutunu ayarla</Body1>
            </div>
            <div className={styles.settingControl}>
              <RadioGroup
                value={settings.fontSize}
                onChange={(_, data) => handleSettingChange('fontSize', data.value)}
                className={styles.radioGroup}
              >
                <Radio value="small" label="Küçük" />
                <Radio value="medium" label="Orta" />
                <Radio value="large" label="Büyük" />
              </RadioGroup>
            </div>
          </div>
        </Card>
      </div>

      {/* Genel Ayarlar */}
      <div className={styles.section}>
        <Title2>
          <SettingsRegular style={{ marginRight: tokens.spacingHorizontalS }} />
          Genel
        </Title2>
        <Card className={styles.card}>
          <CardHeader header="Uygulama Davranışı" />
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <Label>Bildirimler</Label>
              <Body1>Sistem bildirimlerini göster</Body1>
            </div>
            <div className={styles.settingControl}>
              <Switch
                checked={settings.notifications}
                onChange={(_, data) => handleSettingChange('notifications', data.checked)}
              />
            </div>
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <Label>Otomatik Başlat</Label>
              <Body1>Sistem başlangıcında uygulamayı başlat</Body1>
            </div>
            <div className={styles.settingControl}>
              <Switch
                checked={settings.autoStart}
                onChange={(_, data) => handleSettingChange('autoStart', data.checked)}
              />
            </div>
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <Label>Sistem Tepsisine Küçült</Label>
              <Body1>Kapatma butonuna tıklandığında uygulamayı kapatma</Body1>
            </div>
            <div className={styles.settingControl}>
              <Switch
                checked={settings.minimizeToTray}
                onChange={(_, data) => handleSettingChange('minimizeToTray', data.checked)}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Ses Ayarları */}
      <div className={styles.section}>
        <Title2>
          <Speaker0Regular style={{ marginRight: tokens.spacingHorizontalS }} />
          Ses
        </Title2>
        <Card className={styles.card}>
          <CardHeader header="Ses Ayarları" />
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <Label>Ses Efektleri</Label>
              <Body1>Uygulama seslerini etkinleştir</Body1>
            </div>
            <div className={styles.settingControl}>
              <Switch
                checked={settings.soundEnabled}
                onChange={(_, data) => handleSettingChange('soundEnabled', data.checked)}
              />
            </div>
          </div>
          {settings.soundEnabled && (
            <div className={styles.sliderContainer}>
              <Label>Ses Seviyesi: {settings.volume}%</Label>
              <Slider
                min={0}
                max={100}
                step={5}
                value={settings.volume}
                onChange={(_, data) => handleSettingChange('volume', data.value)}
              />
            </div>
          )}
        </Card>
      </div>

      {/* Gizlilik Ayarları */}
      <div className={styles.section}>
        <Title2>
          <ShieldRegular style={{ marginRight: tokens.spacingHorizontalS }} />
          Gizlilik
        </Title2>
        <Card className={styles.card}>
          <CardHeader header="Veri Toplama" />
          <div className={styles.checkboxGroup}>
            <Checkbox
              checked={settings.analytics}
              onChange={(_, data) => handleSettingChange('analytics', data.checked)}
              label="Kullanım analitiklerini paylaş"
            />
            <Checkbox
              checked={settings.crashReports}
              onChange={(_, data) => handleSettingChange('crashReports', data.checked)}
              label="Hata raporlarını gönder"
            />
          </div>
        </Card>
      </div>

      {/* Dil Ayarları */}
      <div className={styles.section}>
        <Title2>
          <InfoRegular style={{ marginRight: tokens.spacingHorizontalS }} />
          Dil ve Bölge
        </Title2>
        <Card className={styles.card}>
          <CardHeader header="Dil Seçimi" />
          <div className={styles.settingRow}>
            <div className={styles.settingContent}>
              <Label>Dil</Label>
              <Body1>Uygulama dilini seçin</Body1>
            </div>
            <div className={styles.settingControl}>
              <RadioGroup
                value={settings.language}
                onChange={(_, data) => handleSettingChange('language', data.value)}
                className={styles.radioGroup}
              >
                <Radio value="tr" label="Türkçe" />
                <Radio value="en" label="English" />
              </RadioGroup>
            </div>
          </div>
        </Card>
      </div>

      {/* Kaydetme Butonları */}
      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL }}>
        <Button appearance="primary" onClick={handleSave}>
          Ayarları Kaydet
        </Button>
        <Button appearance="secondary" onClick={handleReset}>
          Varsayılanlara Dön
        </Button>
      </div>
    </div>
  );
};

export default Settings;
