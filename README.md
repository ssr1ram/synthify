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

Given a base directory structure like

```
back/
    resources/
        tweets/
            getIndex.js
        memoes/
            blah.js

options.basedir = "back/resources";
```

You can then declare a request handler for a specific HTTP method in any file that is in the resources directory by assigning a function to exports.<method><optional: ActionName>.

```
Possible function names:

exports.get:
    Creates a get method that will expect the resources ID.
    It will handle a request of this form, for example: /api/memoes/124
exports.getIndex:
    Special version of get that won't expect a resource ID.
    e.g. GET /api/memoes. Use this for getting a list of resources.
exports.post:
    Handles post requests, does not expect a resource ID.
    e.g. POST /api/memoes. Use this for created new resources.
exports.put:
    Similar to exports.get but will respond to requests using the put method.
    Use this for making changes to the specified resource.
exports.delete:
    Similar to exports.get but will respond to requests using the delete method.
    Use this to delete the specified resource.
exports.getAnything_else:
    Create custom actions for a resource by using one of the four methods
    followed by a custom name. e.g.
    exports.postPublish responds to POST /api/memoes/publish?id=124.
```

For a more full featured product and the source of inspiration for this please see [synthjs.com](http://www.synthjs.com).

## License

[MIT](https://github.com/ssr1ram/synthify/blob/master/LICENSE)

## Credit

- Original Creators
- This project was inspired by synthjs created by Jon Abrams ([Twitter](https://twitter.com/JonathanAbrams) | [GitHub](https://github.com/JonAbrams)).
