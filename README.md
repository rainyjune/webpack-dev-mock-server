# webpack-dev-mock-server

A simple mock server for webpack dev server.

You need to install this package first.

```
npm install webpack-dev-mock-server --save-dev
```

Then update your `webpack.config.js`:

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

Create a file called `mock.config.js` in your project root folder:

```javascript
module.exports = {
  enable: true, // Enable the mock feature or not.
  api: { // Your API endpoints
    "/api/me": true, // They key specifies the endpoint URL, also denotes your mock file path is `/api/me.js`.
    "/api/users/list": true, // Set the value to true if you want enable this API.
  }
};
```

For example, your `/api/me.js` should have something like this:

```javascript
module.exports = function (params) {
  return {
    name: 'rainyjune',
    email: 'rainyjune@live.cn'
  }
}
```