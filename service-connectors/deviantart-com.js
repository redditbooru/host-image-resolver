const format = require('url').format;
const request = require('request');

module.exports = function(urlPieces) {
  return new Promise((resolve, reject) => {
    const apiCall = `http://backend.deviantart.com/oembed?url=${encodeURIComponent(format(urlPieces))}`;
    request(apiCall, (err, res, body) => {
      try {
        const data = JSON.parse(body);
        !!data.url ? resolve(data.url) : reject();
      } catch (exc) {
        reject(`Server returned an invalid response [HTTP ${res.code}]`);
      }
    });
  });
};