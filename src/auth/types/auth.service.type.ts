export type AuthService = {
  getInitialUrl: () => string;
  getProfile: (...args: any) => Promise<any>;
}