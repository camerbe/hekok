import { AppConfig } from '@org/config';

export const environment: AppConfig = {
    apiUrl: 'http://localhost:8000/api',
    baseUrl: 'http://localhost:8000',
    featureFlags: {
        enableNewDashboard: true,
        enableBetaFeatures: false
    },
    version: 'development'
};
