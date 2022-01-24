// const nodeExternals = require('webpack-node-externals');
module.exports = {
  reactStrictMode: true,
  // externals: [nodeExternals()],
  // webpack5: true,
  // webpack: (config) => {
  //   config.resolve.fallback = {
  //     fs: false,
  //     // querystring : false,
  //     path : false,
  //     os : false,
  //     zlib : false
  //    };

  //   return config;
  // },
  // resolve: {
  //   extensions: ['.ts', '.js'],
  // },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
