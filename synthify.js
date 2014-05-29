var path = require('path');

var handlersParser = require('./lib/handlersParser.js');
var handlers;

/* the main synthify function */
module.exports.resources = function (app, options) {
  options = options || {basedir: 'back/resources'};
  var resourceDir = options.resourceDir || path.join(process.cwd(), options.basedir);

  /* On startup, parse all the resource handling modules */
  handlers = handlersParser.parse(resourceDir);


  /* Tell the express app to listen for each API request handler */
  var registerHandler = function (handler) {
    app[handler.method]( handler.path, handler.func() );
  };
  /* Register the custom actions first */
  handlers.filter(function (handler) {
    return handler.isCustom;
  }).forEach(registerHandler);
  handlers.filter(function (handler) {
    return !handler.isCustom;
  }).forEach(registerHandler);

  /* Handle API requests */
  app.all('/api/*', function (req, res) {
    res.send(404, { error: 'Resource not found'});
  });
};
