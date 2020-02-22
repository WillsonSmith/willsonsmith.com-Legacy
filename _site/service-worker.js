/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.setCacheNameDetails({prefix: "eleventy-plugin-pwa"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "css/main.css",
    "revision": "5acdb4f18993125d62c036161f8424cf"
  },
  {
    "url": "fonts/fredoka-one/fredokaone-regular-webfont.woff",
    "revision": "1b588aed7adc929116dd48335f2aaf25"
  },
  {
    "url": "fonts/fredoka-one/fredokaone-regular-webfont.woff2",
    "revision": "af21fa609052f9cf9839655e6948a162"
  },
  {
    "url": "fonts/fredoka-one/FredokaOne-Regular.ttf",
    "revision": "4a2f2ea45a0bb1abe81b47d0afde4aae"
  },
  {
    "url": "fonts/raleway/Raleway-Black.ttf",
    "revision": "46818ebd4f76c4e6fe9b030dbc74f5cf"
  },
  {
    "url": "fonts/raleway/Raleway-BlackItalic.ttf",
    "revision": "956d40aa9747deb39f8b93793803bc9d"
  },
  {
    "url": "fonts/raleway/Raleway-Bold.ttf",
    "revision": "f49f3d2d9df5013c9bfaab7e3d39ee57"
  },
  {
    "url": "fonts/raleway/Raleway-BoldItalic.ttf",
    "revision": "400d6e7c7df487961a0f1426a73fff68"
  },
  {
    "url": "fonts/raleway/Raleway-ExtraBold.ttf",
    "revision": "be3bf63a30b4523ae221bd4358b13e8f"
  },
  {
    "url": "fonts/raleway/Raleway-ExtraBoldItalic.ttf",
    "revision": "05c7000a5498523bbd184902d124c382"
  },
  {
    "url": "fonts/raleway/Raleway-ExtraLight.ttf",
    "revision": "d2a8929f630cba5875d97a5f34da6162"
  },
  {
    "url": "fonts/raleway/Raleway-ExtraLightItalic.ttf",
    "revision": "c8c27816a4b4b6fdfd4a8c944bd2c8ff"
  },
  {
    "url": "fonts/raleway/Raleway-Italic.ttf",
    "revision": "b43297391b7d5d5d7b135958668c1876"
  },
  {
    "url": "fonts/raleway/Raleway-Light.ttf",
    "revision": "466d154fedd98f85c9deb363ccf859a7"
  },
  {
    "url": "fonts/raleway/Raleway-LightItalic.ttf",
    "revision": "e2a70086178378a6165ad7b032ee1077"
  },
  {
    "url": "fonts/raleway/Raleway-Medium.ttf",
    "revision": "bb5ae98e4ce1a64042093dc235c305ed"
  },
  {
    "url": "fonts/raleway/Raleway-MediumItalic.ttf",
    "revision": "d3aded9f5da961c952a9c6c41d77f681"
  },
  {
    "url": "fonts/raleway/raleway-regular-webfont.woff",
    "revision": "696ae23d29dd4743267c7f41a4648d66"
  },
  {
    "url": "fonts/raleway/raleway-regular-webfont.woff2",
    "revision": "4170f6bb6562213e00cfba7b22e5eaff"
  },
  {
    "url": "fonts/raleway/Raleway-Regular.ttf",
    "revision": "9942588a6c84f959132556d99e83ded6"
  },
  {
    "url": "fonts/raleway/Raleway-SemiBold.ttf",
    "revision": "5a25c50b181b07279489ce5bb6a9545c"
  },
  {
    "url": "fonts/raleway/Raleway-SemiBoldItalic.ttf",
    "revision": "b8ea2e82df9aeaf774c081dffb3b46e8"
  },
  {
    "url": "fonts/raleway/Raleway-Thin.ttf",
    "revision": "5faedfece17998f456bf5b32b100b597"
  },
  {
    "url": "fonts/raleway/Raleway-ThinItalic.ttf",
    "revision": "b4fdd9b19ccaa454c97e1ba2b1364815"
  },
  {
    "url": "fonts/toronto-subway/toronto_subway_bold-web-subset.ttf",
    "revision": "427543d0decfbde21cdf6ab7c65cec1f"
  },
  {
    "url": "fonts/toronto-subway/toronto_subway_bold-web-subset.woff2",
    "revision": "d980c83647999f30533ecb804bbfd051"
  },
  {
    "url": "fonts/toronto-subway/toronto_subway_bold-web-subset.zopfli.woff",
    "revision": "57fd1e140377170e0ab7798e61bd13c8"
  },
  {
    "url": "fonts/toronto-subway/toronto_subway_bold-web.ttf",
    "revision": "3e7c653eb854f719bb23d95755171620"
  },
  {
    "url": "fonts/toronto-subway/toronto_subway_bold-web.woff",
    "revision": "9e731180620d8ddbbdd9b1bd556bc4e7"
  },
  {
    "url": "fonts/toronto-subway/toronto_subway_bold-web.woff2",
    "revision": "cf6000ee94feb978adbd6d1f4efc82d5"
  },
  {
    "url": "fonts/toronto-subway/toronto_subway_regular-web.ttf",
    "revision": "0645e255f6d4ec6c3ca52077535d3f1b"
  },
  {
    "url": "fonts/toronto-subway/toronto_subway_regular-web.woff",
    "revision": "86942620cd476bad26df90633ca62bc2"
  },
  {
    "url": "fonts/toronto-subway/toronto_subway_regular-web.woff2",
    "revision": "9c7e43bedf6302908140d72acd3efdbf"
  },
  {
    "url": "index.html",
    "revision": "5e543256c480ac577d30f76f9120eb74"
  },
  {
    "url": "js/index.js",
    "revision": "63fad512789efbb09d722eea29821f37"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https?:\/\/fonts\.googleapis\.com\/css/, new workbox.strategies.StaleWhileRevalidate(), 'GET');
