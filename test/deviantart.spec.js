const expect = require('expect.js');
const nock = require('nock');
const testUrl = require('./test-helpers');

const RESPONSE_URL = 'this is the "URL"';

module.exports = function(url) {
  before(function() {
    nock('http://backend.deviantart.com')
      .get(`/oembed?url=${encodeURIComponent(url)}`)
      .reply(200, {
        url: RESPONSE_URL
      });
  });

  it('should resolve to an image', function() {
    return testUrl(url, [
      RESPONSE_URL
    ]);
  });
};