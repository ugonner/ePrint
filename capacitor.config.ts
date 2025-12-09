import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "ng.com.idigihub",
  appName: 'iDigiHub',
  webDir: 'dist',
  server: {
    allowNavigation: [
      "flexmedcare.vercel.app"
    ]
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
