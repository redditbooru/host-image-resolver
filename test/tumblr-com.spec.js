const expect = require('expect.js');
const nock = require('nock');

const testUrl = require('./test-helpers');

const TEST_ID = 123456789;
const PHOTO1 = 'this_photo.jpg';
const PHOTO2 = 'that_photo.jpg';

describe('tumblr tests', function() {

  before(function() {
    nock('http://api.tumblr.com')
      .get(`/v2/blog/test.tumblr.com/posts?id=${TEST_ID}&api_key=NO_KEY`)
      .reply(200, {
        response: {
          posts: [
            {
              photos: [
                {
                  original_size: {
                    url: PHOTO1
                  }
                },
                {
                  original_size: {
                    url: PHOTO2
                  }
                }
              ]
            },
            {
              photos: [
                {
                  original_size: {
                    url: 'should not be in return'
                  }
                }
              ]
            }
          ]
        }
      });
  });

  it('should return all pictures in a tumblr post', function() {
    return testUrl(`http://test.tumblr.com/post/${TEST_ID}/this-is-a-test`, [
      PHOTO1,
      PHOTO2
    ]);
  });

});