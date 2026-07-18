
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
    'index.csr.html': {size: 23054, hash: '0d6b95cef6536c7ea1882e88459410da758ee9df5961f942d6012ea60b82cb02', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7824, hash: '6b667982837a66e3e5cfce8423e54b48613b33395977da3e700e0c7c9f4d8d2f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'accueil/index.html': {size: 137550, hash: '3198e313347e8bfb8617d2f09531e023ca0b311179cf39dceac31e1ae3664aa5', text: () => import('./assets-chunks/accueil_index_html.mjs').then(m => m.default)},
    'styles-BBW7HH2K.css': {size: 76301, hash: 'MkGWO5fDqjE', text: () => import('./assets-chunks/styles-BBW7HH2K_css.mjs').then(m => m.default)}
  },
};
