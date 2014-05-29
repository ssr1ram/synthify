# SYNTHIFY

A minimalist component-ized fork of Jon Abrams synth. The easiest web framework for synthesizing API-first web apps that also have web front-ends.

## Install

`npm install git+https://github.com/ssr1ram/synthify.git`

## Example

```js
var express = require('express');
var synthify = require('synthify')

var app = express();

var synthoptions = {
    basedir: "back/resources"
};

synthify.resources(app, synthoptions);

var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
});
```

For a more full featured product and the source of inspiration for this please see [synthjs.com](http://www.synthjs.com).

## License

[MIT](https://github.com/ssr1ram/synthify/blob/master/LICENSE)

## Credit

- Original Creators
- This project was inspired by synthjs created by Jon Abrams ([Twitter](https://twitter.com/JonathanAbrams) | [GitHub](https://github.com/JonAbrams)).
