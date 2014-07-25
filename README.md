# SYNTHIFY

A minimalist component-ized way of automating an api and routes within an expressjs node app.

## Dependencies

```bash
$ npm install yo -g
$ npm install gulp -g
```

## Install

```bash
$ npm install synthify
```

## Yeoman generator

The easiest way to get started is to generate an app using the
generator-synthify module see:
http://github.com/ssr1ram/generator-synthify

```bash
$ npm install -g generator-synthify
$ mkdir myproject
$ cd myproject
$ yo synthify
```

## Example Usage


```js
var express = require('express');
var synthify = require('synthify')

var app = express();

var synthoptions = {
};

synthify.doapi(app, synthoptions);
synthify.doroutes(app, synthoptions);

app.set('views', __dirname + '/pages');

var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
});
```

## api

Base directory structure

```
api/
   foo/
       getIndex.js
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
        foo_front.coffee
        route.coffee
    index.jade
    pages.coffee
    route.coffee

```

## special file names

* foo_front.js or foo_front.coffee is the entry browserify file  used by
  gulp and the resulting file is placed in public/js/..(relative
  path)/foo.js (and foo.min.js)
* route.coffee is used by synthify to set routes
* foo.less and foo.css files are processed by gulp and resulting files placed
  in public/css/..(relative path)/foo.css

## synthify api

pages.coffee having

```
synthify = require('synthify')

getIndex = (req, res) ->
    res.render("index.jade")

getFoo = (req, res) ->
    synthify.apiPreload(req, res, "/api/foo", (data) ->
        res.render("foo/foo.jade", {preloadData: data})
    )

getBar = (req, res) ->
    res.render("bar.jade")

```


## License

[MIT](https://github.com/ssr1ram/synthify/blob/master/LICENSE)

## Credit

- Original Creators
- This project was inspired by synthjs created by Jon Abrams ([Twitter](https://twitter.com/JonathanAbrams) | [GitHub](https://github.com/JonAbrams)).
