import { AppConfig } from "@org/config";

export const environment: AppConfig = {
    apiUrl: "https://api.hekok.org/api",
    baseUrl: "https://www.hekok.org",
    featureFlags: {
        enableNewDashboard: true,
        enableBetaFeatures: false
    },
    adsenseConfig:{
        adClient: 'ca-pub-8638642715460968',
        adSlot: '6927429462',
        adFormat: 'auto',
        fullWidthResponsive: true
    },
    version: "1.0.0"
};
