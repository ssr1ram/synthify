# SYNTHIFY

A minimalist component-ized fork of Jon Abrams synth. The easiest web framework for synthesizing API-first web apps that also have web front-ends.

## Documentation

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

For complete up-to-date documentation, tutorials, and example apps, check out [synthjs.com](http://www.synthjs.com).

## License

[MIT](https://github.com/ssr1ram/synthify/blob/master/LICENSE)

## Credit

- Original Creators
- This project was created by Jon Abrams ([Twitter](https://twitter.com/JonathanAbrams) | [GitHub](https://github.com/JonAbrams)).
- Special thanks to Stephen Ausman (aka [stackd](https://github.com/stackd)) for handing over control of the 'synth' package on NPM.
