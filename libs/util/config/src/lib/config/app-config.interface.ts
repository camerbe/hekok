export interface AppConfig {
    apiUrl: string;
    baseUrl: string;
    featureFlags: {
        enableNewDashboard: boolean;
        enableBetaFeatures: boolean;
    };
  version: string;
}
