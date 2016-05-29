const expect = require('expect.js');
const nock = require('nock');

const hostImageResolver = require('../index');

const TEST_ID = 'SolidLiquidSolidus';
const GIF_URL = 'SnakeSnakeSnake';

describe('gfycat tests', function() {

  before(function() {
    nock('https://gfycat.com')
      .get(`/cajax/get/${TEST_ID}`)
      .reply(200, {
        gfyItem: {
          gifUrl: GIF_URL
        }
      });
  });

  it('should return the GIF URL', function() {
    return hostImageResolver(`https://gfycat.com/${TEST_ID}`).then((urls) => {
      expect(urls).to.be.an('array');
      expect(urls).to.have.length(1);
      expect(urls[0]).to.be(GIF_URL);
    });
  });

});