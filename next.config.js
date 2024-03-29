/** @type {import('next').NextConfig} */
const withSerwist = require("@serwist/next").default({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

const nextConfig = {};

module.exports = withSerwist({
  nextConfig,
});
