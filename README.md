[![Build Status](https://travis-ci.org/dxprog/anime-bracket.svg)](https://travis-ci.org/dxprog/host-image-resolver)

#Host Image Resolver

Talks to various image hosting services to resolve a URL into all pictures associated with said URL.

## Currently Supported Services

- imgur (auth required for albums)
- deviantArt (including fav.me URLs)
- gfycat
- tumblr (auth required)
- yande.re

## Installation

`npm install host-image-resolver`

## Configuration

Some services require authentication tokens. To set these values, you can create a `hir-config.js` file in the root of your project.

```javascript
module.exports = {
  IMGUR_CLIENT_SECRET: 'the-secret',
  TUMBLER_KEY: 'tumbl-tumbl'
};
```

## How to Use

HIR is simple to use, exposing only one public method:

```javascript
const hostImageResolver = require('host-image-resolver');

hostImageResolver('http://imgur.com/a/an-album').then((urls) => {
  console.log(urls);
  // [ 'https://i.imgur.com/image1.jpg', 'https://i.imgur.com/image2.jpg' ]
  // urls will always be an array
});
```