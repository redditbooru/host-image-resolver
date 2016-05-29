const expect = require('expect.js');
const nock = require('nock');

const testUrl = require('./test-helpers');

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
    return testUrl(`https://gfycat.com/${TEST_ID}`, [
      GIF_URL
    ]);
  });

});