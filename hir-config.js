const DEFAULT_CONFIG = {
  TUMBLR_KEY: 'NO_KEY'
};

var productConfig = {};

// Try to grab the config from the consuming app
try {
  productConfig = require.main.require('./hir-config');
} catch (exc) {}

module.exports = Object.assign(productConfig, DEFAULT_CONFIG);