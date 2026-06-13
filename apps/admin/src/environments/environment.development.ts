import { AppConfig } from '@org/config';

export const environment: AppConfig = {
    apiUrl: 'http://localhost:8000/api',
    baseUrl: 'http://localhost:8000',
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
    version: 'development'
};
