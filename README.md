# SYNTHIFY

A minimalist component-ized fork of Jon Abrams synth. The easiest web framework for synthesizing API-first web apps that also have web front-ends.

## Dependencies

```
npm install yo -g
npm install gulp -g
```

## Install

The easiest way to get started is to use the yeoman generator

```
# yo install git+https://github.com/ssr1ram/generator-synthify.git -g`
# mkdir project
# cd project
# yo synthify

## Example Usage


```js
var express = require('express');
var synthify = require('synthify')

var app = express();

var synthoptions = {
};

synthify.doapi(app, synthoptions);
synthify.dopages(app, synthoptions);

var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
});
```

## api

Base directory structure

```
api/
   tweets/
       getIndex.js
   memoes/
       blah.js

options.apidir = "api";
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

## pages

base directory structure

```
pages/
    bar.jade
    defaults/
        layout.jade
    foo/
        foo.jade
        foo.coffee
    index.jade
    pages.json

options.pagesdir = "pages";
```

And a pages.json having

```
{
    "pages": [
        {
            "route": "/",
            "viewFile": "index.jade"
        },
        {
            "route": "/foo",
            "viewFile": "foo/foo.jade",
            "preload": ["/api/foo"]
        },
        {
            "route": "/bar",
            "viewFile": "bar.jade"
        }
    ]
}
```

You get the following routes

```
http://localhost:3000/ - serves pages/index.jade
http://localhost:3000/foo - preloads /api/foo and serves
pages/foo/foo.jade
http://localhost:3000/bar - serves pages/bar.jade
http://localhost:3000/api/tweets - serves
api/tweets/[getIndex.js:getIndex()]
```


## License

[MIT](https://github.com/ssr1ram/synthify/blob/master/LICENSE)

## Credit

- Original Creators
- This project was inspired by synthjs created by Jon Abrams ([Twitter](https://twitter.com/JonathanAbrams) | [GitHub](https://github.com/JonAbrams)).
