// No defaults at this time, but the may happen
const DEFAULT_CONFIG = {};

var productConfig = {};

// Try to grab the config from the consuming app
try {
  productConfig = require.main.require('./hir-config');
} catch (exc) {}

module.exports = Object.assign(productConfig, productConfig);