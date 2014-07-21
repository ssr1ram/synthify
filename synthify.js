var path = require('path');
var request = require('request');
var fs = require('fs');

var apiParser = require('./lib/apiParser.js');
var pagesParser = require('./lib/pagesParser.js');

var defaultoptions = {
    apidir: 'api',
    pagesdir: "pages"
};

var getApihandlers = function(options) {
  var options = options || {};
  options.apidir = options.apidir || defaultoptions.apidir;
  var resourceDir = options.resourceDir || path.join(process.cwd(), options.apidir);

  /* On startup, parse all the resource handling modules */
  var handlers = apiParser.parse(resourceDir);
  return handlers;
};
var getPageshandlers = function(options) {
  var options = options || {};
  options.pagesdir = options.pagesdir || defaultoptions.pagesdir;
  var resourceDir = options.resourceDir || path.join(process.cwd(), options.pagesdir);

  /* On startup, parse all the resource handling modules */
  var handlers = pagesParser.parse(resourceDir);
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
  var options = options || {};
  options.pagesdir = options.pagesdir || defaultoptions.pagesdir;
  var resourceDir = options.resourceDir || path.join(process.cwd(), options.pagesdir);
  pagesParser.parse(app, resourceDir);
};

module.exports.doroutes = function(app, options) {
  var options = options || {};
  options.pagesdir = options.pagesdir || defaultoptions.pagesdir;
  var resourceDir = options.resourceDir || path.join(process.cwd(), options.pagesdir);
  var resourceStack = [];
  (function parseDir (dir) {
    var contents = fs.readdirSync(dir).sort();
    contents.forEach(function (file) {
      if ( /route\.(js|coffee)$/.test(file) ) {
          var module = require(dir + '/' + file);
          module.route(app)
      } else {
          if (fs.statSync(dir + '/' + file).isDirectory()) {
                resourceStack.push(file);
                parseDir(dir + '/' + file);
                resourceStack.pop();
          }
      }
    });
  })(resourceDir);
};

module.exports.apiPreload = function(req, res, preloadRoute, cb) {
    var preloadData = {};
    request.get(req.protocol + "://0.0.0.0" + ":" + req.socket.localPort + preloadRoute, function(err, response, body) {
        if (typeof(body) == 'string') {
            preloadData[preloadRoute] = JSON.parse(body);
        } else {
            preloadData[preloadRoute] = body;
        }
        cb(preloadData);
    });
}
