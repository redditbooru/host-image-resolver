const format = require('url').format;
const request = require('request');

const IMGUR_CLIENT_ID = require('../hir-config').IMGUR_CLIENT_ID;
const GALLERY_ID_REGEX = /^\/(gallery|a)\/([\w]+)$/i;

function getImagesFromCSV(path) {
  return path.replace('/', '').split(',').map((id) => `https://i.imgur.com/${id}.jpg`);
}

function getImagesFromAlbum(path) {
  return new Promise((resolve, reject) => {
    if (GALLERY_ID_REGEX.test(path)) {
      const id = GALLERY_ID_REGEX.exec(path)[2];
      request({
        url: `https://api.imgur.com/3/album/${id}.json`,
        headers: {
          'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`
        }
      }, (err, res, body) => {
        try {
          const data = JSON.parse(body);
          resolve(data.data.images.map((image) => image.link));
        } catch (exc) {
          reject(`Error retrieving album information from imgur: ${exc.message}`);
        }
      });
    }
  });
}

module.exports = function(urlPieces) {
  return new Promise((resolve, reject) => {
    const path = urlPieces.path;

    // Comma delimited list of image IDs
    if (path.indexOf(',') > -1) {
      resolve(getImagesFromCSV(path));

    // Albums
    } else if (path.indexOf('/a/') === 0 || path.indexOf('/gallery/') === 0) {
      resolve(getImagesFromAlbum(path));

    // Change the domain/ext so that we get a real path to the image
    } else if (path.indexOf('.') === -1) {
      resolve(`https://i.imgur.com${path}.jpg`);

    // Otherwise, pass-thru
    } else {
      resolve(format(urlPieces));
    }

  });
};