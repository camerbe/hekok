export interface AppConfig {
    apiUrl: string;
    baseUrl: string;
    featureFlags: {
        enableNewDashboard: boolean;
        enableBetaFeatures: boolean;
    };
    adsenseConfig : {
      adClient: string,
      adSlot: string,
      adFormat: string,
      fullWidthResponsive: boolean
    };
  version: string;
}
