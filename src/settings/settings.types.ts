export abstract class SettingsService {
  abstract getEnv: () => 'DEV' | 'PROD';

  abstract getBackAppUrl: () => string;
  abstract getFrontAppUrl: () => string;

  abstract getDbVars: () => {
    name: string;
    password: string;
    host: string;
    port: number;
  }

  abstract getTwitchVars: () => {
    clientId: string;
    clientSecret: string;
  }
}