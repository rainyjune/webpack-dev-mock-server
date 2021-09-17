/**
 * Get mocked API endpoint content.
 * @param {*} path - 
 * @param {*} controller 
 * @param {*} timeout - Mocked API response delay, in milliseconds.
 * @returns 
 */
function getApi(path, controller, timeout) {
  return async (req, res) => {
    let common = {}, special = {}, innerConfig = {};

    let referer = req.headers.referer;
    let match = /(\/[^/]+){2}\.html/.exec(referer);
    if (match) innerConfig.__pagename = match[1];

    Object.keys(controller).forEach((key) => {
      let pageName = key.substr(1);
      if (/^(?!#)/.test(key)) {
        common[key] = controller[key];
      } else if (RegExp(`/${pageName}.html`).test(referer)) {
          special = controller[key];
          innerConfig.__pagename = pageName;
      }
    });
    let ctrler = Object.assign({ normal: true }, common, special, innerConfig);
    const data = await requireUncached(path)(req, { ...ctrler, ...res });
    return new Promise((resovle) => {
      setTimeout(() => resovle(data), timeout || 500);
    });
  };
}

/**
 * Requires file content without cache
 * @param {*} path - A file path
 * @returns exported module content
 */
function requireUncached(path) {
  delete require.cache[require.resolve(path)];
  return require(path);
}

/**
 * Get Mock configuration
 * @returns An object
 */
function getMockConfig() {
  const mockConfig = requireUncached("./mock.config.js");
  Object.keys(mockConfig.api).forEach(key => {
    let controller = mockConfig.api[key];
    if (controller) {
      mockConfig.api[key] = getApi(`.${key}`, controller);
    }
  });
  return mockConfig;
}

module.exports = {
  requireUncached,
  getApi,
  getMockConfig,
  asyncData: function asyncData(time, data) {
    return new Promise((resovle) => {
      setTimeout(() => resovle(data), time);
    });
  }
};

module.exports.default = module.exports;
