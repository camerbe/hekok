
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
    'index.csr.html': {size: 22456, hash: '544db91cadd93c3215cada8dd52093c3ccc01b010e08d50617befbd1048c0efe', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7222, hash: '680f126121fe5cb48356287fe0abf847a4f2921ed151d134fbef3b68cee062c0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'accueil/index.html': {size: 136952, hash: 'd7fb2d389ee0b7f40e71db24420701dd966301923769d9ce221ee61a0134e3d9', text: () => import('./assets-chunks/accueil_index_html.mjs').then(m => m.default)},
    'styles-UUS4PSCM.css': {size: 77187, hash: 'csVurw3FT7g', text: () => import('./assets-chunks/styles-UUS4PSCM_css.mjs').then(m => m.default)}
  },
};
