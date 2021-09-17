# webpack-dev-mock-server

A simple mock server for webpack dev server.

```
npm install webpack-dev-mock-server --save-dev
```

webpack.config.js

```javascript
// Require our mock server first
const Mocker = require('webpack-dev-mock-server');

module.exports = {
  // ...
  devServer: {
    // ...
    // Then use it in this function
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      Mocker(devServer.app);
    }
  },
};
```