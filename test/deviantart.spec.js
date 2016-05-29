const expect = require('expect.js');
const nock = require('nock');
const hostImageResolver = require('../index');

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
    return hostImageResolver(url).then((urls) => {
      expect(urls).to.be.an('array');
      expect(urls).to.have.length(1);
      expect(urls[0]).to.be(RESPONSE_URL);
    });
  });
};