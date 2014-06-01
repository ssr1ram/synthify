var path = require('path');

var apiParser = require('./lib/apiParser.js');
var pagesParser = require('./lib/pagesParser.js');

var defaultoptions = {
    apidir: 'api',
    pagesdir: "pages"
};

var getApihandlers = function(options) {
  options = options || {};
  options.apidir = options.apidir || defaultoptions.apidir;
  var resourceDir = options.resourceDir || path.join(process.cwd(), options.apidir);

  /* On startup, parse all the resource handling modules */
  handlers = apiParser.parse(resourceDir);
  return handlers;
};
var getPageshandlers = function(options) {
  options = options || {};
  options.pagesdir = options.pagesdir || defaultoptions.pagesdir;
  var resourceDir = options.resourceDir || path.join(process.cwd(), options.pagesdir);

  /* On startup, parse all the resource handling modules */
  handlers = pagesParser.parse(resourceDir);
  return handlers;
};

/* the synthify doapi function */
module.exports.doapi = function (app, options) {
   var apihandlers = getApihandlers(options);

  /* Tell the express app to listen for each API request handler */
  var registerHandler = function (handler) {
    app[handler.method]( handler.path, handler.func() );
  };
  /* Register the custom actions first */
  apihandlers.filter(function (handler) {
    return handler.isCustom;
  }).forEach(registerHandler);
  apihandlers.filter(function (handler) {
    return !handler.isCustom;
  }).forEach(registerHandler);

  /* Handle API requests */
  app.all('/api/*', function (req, res) {
    res.send(404, { error: 'Resource not found'});
  });
};

module.exports.dopages = function(app, options) {
  options = options || {};
  options.pagesdir = options.pagesdir || defaultoptions.pagesdir;
  var resourceDir = options.resourceDir || path.join(process.cwd(), options.pagesdir);
  pagesParser.parse(app, resourceDir);
};
