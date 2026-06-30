
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
    'index.csr.html': {size: 20954, hash: '38f1e01e2cbceecb1907b27da9a4fe21ee9d3908c95e6f32073468f306ee080f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7222, hash: '491fded5a925b7dbef4324aa3ed33cd911c380376b1e25749f93ea8cbd6082a1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'accueil/index.html': {size: 135381, hash: 'cbb6c1e1c77c352293fbaa558a5177dc5ec2a14c75f8b13c10566daecd7ef69d', text: () => import('./assets-chunks/accueil_index_html.mjs').then(m => m.default)},
    'styles-B7N2QQUU.css': {size: 71714, hash: '8ihlek3YjwY', text: () => import('./assets-chunks/styles-B7N2QQUU_css.mjs').then(m => m.default)}
  },
};
