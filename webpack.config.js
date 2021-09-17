const path = require('path');

// Require our mock server first
const Mocker = require('./index');

module.exports = {
  //...
  devServer: {
    allowedHosts: 'all',
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 9000,
    // Then register our mock server in `onBeforeSetupMiddleware` function
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      Mocker(devServer.app);
    }
  },
};