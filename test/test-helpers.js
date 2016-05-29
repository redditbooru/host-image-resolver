const expect = require('expect.js');
const hostImageResolver = require('../index');

module.exports = function(url, expectedUrls) {
  return hostImageResolver(url).then((urls) => {
    expect(urls).to.eql(expectedUrls);
  });
};