if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,t,c)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const i={uri:location.origin+s.slice(1)};return Promise.all(t.map((s=>{switch(s){case"exports":return n;case"module":return i;default:return e(s)}}))).then((e=>{const s=c(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-4a677df8"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0c428ae2-ee69a9c6dc20a74d42ca.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/148-734bb1a5944589e5eadc.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/1bfc9850-cc51bb0a77ebfa1deb79.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/352-3a5845a691c985d46898.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/482-543b6977b0b253b6579e.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/545f34e4-471965c363b2221008d2.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/6728d85a-dabe4f5f06d7a529711d.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/675-b5c9499f253bf5e8de00.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/framework-2191d16384373197bc0a.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/main-da1bc8f8d312ca485cee.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/pages/_app-6967ed659b13f92386e7.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/pages/blog-411efd92285ecd3a18af.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/pages/blog/%5Bslug%5D-ff26d0a9a7d34c8af4c2.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/pages/category/%5Bslug%5D-1f23c31388d2f8ee05d1.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/pages/index-b9d059311652cde9c116.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/pages/sitemap.xml-b128c6a21aa6858222ca.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/pages/tag/%5Bslug%5D-137fb28478dc32787d34.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/chunks/webpack-0e3c274fd8419109d37b.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/css/2e61e08874c5d527c8c9.css",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/css/55cee978e8031d5a7563.css",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/css/bdc2f9e67160d9285eec.css",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/css/c3992fd1530cc643ec6b.css",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/css/cdcb3627db791cd96106.css",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/css/ff069d0f62c15f3b1014.css",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/mLCfqYfQQKfksTwkZE0oW/_buildManifest.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/_next/static/mLCfqYfQQKfksTwkZE0oW/_ssgManifest.js",revision:"mLCfqYfQQKfksTwkZE0oW"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icons/icon-128x128.png",revision:"d626cfe7c65e6e5403bcbb9d13aa5053"},{url:"/icons/icon-512x512.png",revision:"93d6e8e15cfa78dfee55446f607d9a28"},{url:"/manifest.json",revision:"9049648459733a8c5025e2fec692765c"},{url:"/robot.txt",revision:"4eb8a64c45c86201b0e5b0b17602d26c"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));