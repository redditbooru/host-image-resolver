const expect = require('expect.js');
const nock = require('nock');

const testUrl = require('./test-helpers');

const GENERIC_ID = '777777';
const PHOTO1 = 'before';
const PHOTO2 = 'after';
const GALLERY_RESPONSE = function(uri, requestBody) {
  const RESPONSE = {
    data: {
      images: [
        {
          link: PHOTO1
        },
        {
          link: PHOTO2
        }
      ]
    }
  };

  if (this.req.headers.authorization === 'Client-ID NO_KEY') {
    return [ 200, RESPONSE ];
  } else {
    return [ 403 ];
  }

};

describe('imgur tests', function() {
  beforeEach(function() {
    nock('https://api.imgur.com').get(`/3/album/${GENERIC_ID}.json`).reply(GALLERY_RESPONSE);
  });

  it('should fix URLs for single images', function() {
    return testUrl(`https://imgur.com/${GENERIC_ID}`, [ `https://i.imgur.com/${GENERIC_ID}.jpg` ]);
  });

  it('should return individual links for a comma delimited list', function() {
    const ID1 = 'first';
    const ID2 = 'second';
    return testUrl(`https://imgur.com/${ID1},${ID2}`, [ `https://i.imgur.com/${ID1}.jpg`, `https://i.imgur.com/${ID2}.jpg` ])
  });

  it('should return the images in an /a/ album URL', function() {
    return testUrl(`https://imgur.com/a/${GENERIC_ID}#${PHOTO1}`, [ PHOTO1, PHOTO2 ]);
  });

  it('should return the images in an /gallery/ album URL', function() {
    return testUrl(`https://imgur.com/gallery/${GENERIC_ID}`, [ PHOTO1, PHOTO2 ]);
  });
});