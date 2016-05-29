
const request = require('request');

const ID_REGEX = /\/([^\/#]+)(\w#]+)?$/;

module.exports = function(urlPieces) {
  return new Promise((resolve, reject) => {
    if (ID_REGEX.test(urlPieces.path)) {
      const id = ID_REGEX.exec(urlPieces.path)[1];
      const apiCall = `https://gfycat.com/cajax/get/${id}`;
      request(apiCall, (err, res, body) => {
        try {
          const data = JSON.parse(body);
          resolve(data.gfyItem.gifUrl);
        } catch (exc) {
          reject(`Server returned an invalid response [HTTP ${res.code}]`);
        }
      });
    }
  });
};