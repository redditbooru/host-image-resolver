const parse = require('url').parse;

// Set up a global for module caching
const cache = global._hostImageResolver = global._hostImageResolver || {};

/**
 * Returns an array of resolved image URLs from a passed in URL
 *
 * @param {String} url The URL to resolve the images from
 * @returns {Promise}  An promise that resolves with an array of
 *                     image URLs. If the URL does not resolve to
 *                     a host, returns the original URL in the array.
 */
module.exports = function(url) {
  return new Promise((resolve, reject) => {
    const urlPieces = parse(url);

    if (urlPieces.host) {
      // We're going to throw away the subdomain
      const domainPieces = urlPieces.host.split('.');
      if (domainPieces.length === 3) {
        domainPieces.shift();
      }

      // The service name is host-tld. Ex: imgur-com. Because
      // you never know when imgur-jp will show up and ruin the party...
      const serviceName = domainPieces.join('-').toLowerCase();
      try {
        const service = cache[serviceName] || require(`./service-connectors/${serviceName}`);
        cache[serviceName] = service;
        service(urlPieces).then((urls) => {
          // Covnvert to an array if we weren't passed one
          resolve(Array.isArray(urls) ? urls : [ urls ]);
        }).catch(reject);
      } catch (exc) {
        if (exc.code && exc.code === 'MODULE_NOT_FOUND') {
          console.error(`Unable to find service connector for ${urlPieces.host}`);
        } else {
          console.error(exc);
        }
        resolve([ url ]);
      }
    }
  });
};
