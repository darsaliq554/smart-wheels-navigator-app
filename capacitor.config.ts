import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bff9990784c445638db9b69f4d6b8835',
  appName: 'Smart Car Dashboard',
  webDir: 'dist',
  server: {
    url: 'https://bff99907-84c4-4563-8db9-b69f4d6b8835.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a202c',
      showSpinner: true,
      spinnerColor: '#00d4ff'
    }
  }
};

export default config;