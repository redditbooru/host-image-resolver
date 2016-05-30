const jsdom = require('jsdom');
const format = require('url').format;

module.exports = function(urlPieces) {
  return new Promise((resolve, reject) => {
    const pageUrl = format(urlPieces);
    jsdom.env(pageUrl, [], (err, window) => {
      const document = window.document;

      // Check for an unchange image first
      const original = document.querySelector('.original-file-unchanged');
      const hires = document.getElementById('highres');
      if (original) {
        resolve(original.getAttribute('href'));
      } else if (hires) {
        resolve(hires.getAttribute('href'));
      } else {
        resolve([]);
      }
    });
  });
};