const expect = require('expect.js');
const nock = require('nock');

const testUrl = require('./test-helpers');

const HIRES_ID = 'highres';
const HIRES_RESPONSE = require('./mocks/yandere-hires');
const UNCHANGED_ID = 'unchanged';
const UNCHANGED_RESPONSE = require('./mocks/yandere-unchanged');

describe('yande.re tests', function() {
  before(function() {
    nock('https://yande.re').get(`/post/show/${HIRES_ID}`).reply(200, HIRES_RESPONSE);
    nock('https://yande.re').get(`/post/show/${UNCHANGED_ID}`).reply(200, UNCHANGED_RESPONSE);
  });

  it('should get the unchanged path when available', function() {
    return testUrl(`https://yande.re/post/show/${UNCHANGED_ID}`, [
      'https://files.yande.re/image/a9f697b72e3d9c567805f8b24090df3c/yande.re%20356753%20bandaid%20gochuumon_wa_usagi_desu_ka%3F%20jouga_maya%20koi%20seifuku.png'
    ]);
  });

  it('should get the hires path when there is no unchanged', function() {
    return testUrl(`https://yande.re/post/show/${HIRES_ID}`, [
      'https://files.yande.re/image/1496be8f74a22c995bd59354485ed6fe/yande.re%20356750%20maid%20re_zero_kara_hajimeru_isekai_seikatsu%20rem_%28re_zero%29%20tagme.jpg'
    ]);
  });
});