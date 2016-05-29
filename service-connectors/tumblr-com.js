const request = require('request');

const ID_REGEX = /\/post\/([\d]+)\//;
const TUMBLR_KEY = require('../hir-config').TUMBLR_KEY;

module.exports = function(urlPieces) {
  return new Promise((resolve, reject) => {
    if (ID_REGEX.test(urlPieces.path)) {
      const idResult = ID_REGEX.exec(urlPieces.path);
      const id = idResult[1];
      const apiCall = `http://api.tumblr.com/v2/blog/${urlPieces.host}/posts?id=${id}&api_key=${TUMBLR_KEY}`;

      request(apiCall, (err, res, body) => {
        try {
          const data = JSON.parse(body);
          const retVal = data.response.posts[0].photos.map((photo) => photo.original_size.url);
          resolve(retVal);
        } catch (exc) {
          reject(`Server returned an invalid response`);
        }
      });
    } else {
      resolve([]);
    }
  });
};