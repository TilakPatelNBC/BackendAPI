var nodeExternals = require('webpack-node-externals');

module.exports = {
  webpack: (config) => {
    config.node = {
      fs: 'empty'
    }
    return config
  },
  externals: [nodeExternals()]
};
