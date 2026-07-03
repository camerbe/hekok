
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/accueil",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/accueil"
  },
  {
    "renderMode": 0,
    "route": "/actualites/*"
  },
  {
    "renderMode": 0,
    "route": "/communautes/*"
  },
  {
    "renderMode": 2,
    "redirectTo": "/accueil",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 22531, hash: 'fce2d7f14eb96863d00f25f03a27b09b10284eac645caf9f78f6cd36ff757607', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7297, hash: '2c51da514b733e8e7b7c0b9ba5c9fe35204512ef0c0ef63cc7eb97b090262e24', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'accueil/index.html': {size: 137027, hash: 'e5e0ca12738fdd8bb4edb6223c6416e6c2096f3648aa1f36ee269762cf4adec5', text: () => import('./assets-chunks/accueil_index_html.mjs').then(m => m.default)},
    'styles-UUS4PSCM.css': {size: 77187, hash: 'csVurw3FT7g', text: () => import('./assets-chunks/styles-UUS4PSCM_css.mjs').then(m => m.default)}
  },
};
