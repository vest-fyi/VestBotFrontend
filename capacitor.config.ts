import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fyi.vest.app',
  appName: 'Vest',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
