const pjson = require('./package');

const DEFAULT_CONFIG = {
  TUMBLR_KEY: 'NO_KEY',
  USER_AGENT: `Host Image Resolver ${pjson.version}, nodejs`,
  IMGUR_CLIENT_ID: 'NO_KEY'
};

var productConfig = {};

// Try to grab the config from the consuming app
try {
  productConfig = require.main.require('./hir-config');
} catch (exc) {}

module.exports = Object.assign({}, DEFAULT_CONFIG, productConfig);