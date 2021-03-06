var fs = require('fs');
var synthify = require("../synthify");

var rootDir;
var resourceStack = [];


exports.parse = function (app, rootDirParam, options) {
  handlers = [];
  rootDir = rootDirParam;
  options = options || {};
  var viewDir = options.viewDir || rootDirParam;
  var viewEngine = options.viewEngine || 'jade';
  app.set( "views", viewDir );
  app.set('view engine', viewEngine);

  (function parseDir (dir) {
    var contents = fs.readdirSync(dir).sort();
    contents.forEach(function (file) {
      if ( /\.(json)$/.test(file) ) {
        var pajson = require(dir + '/' +file);
        pajson.pages.forEach(function(page) {
            var viewFile = page.viewFile || file.replace('.json', '.' + viewEngine);
            app.get(page.route, function(req, res) {
                if (page.preload) {
                    var preloadData = {};
                    var i = 0;
                    var done = function(data) {
                        for (var k in data) {
                            preloadData[k] = data[k];
                        }
                        i += 1;
                        if (i == page.preload.length) {
                            res.render(dir + '/' + viewFile, {preloadData: preloadData});
                        }
                    }
                    page.preload.forEach(function(preloadRoute) {
                        synthify.apiPreload(req, res, preloadRoute, done);
                    });
                } else {
                    res.render(dir + '/' + viewFile);
                }
            });
        })
      } else {
          fs.stat(dir + '/' + file, function(err, stats) {
              if (err) {
                  console.log(file);
                  console.log(err);
              } else {
                if (stats.isDirectory()) {
                    resourceStack.push(file);
                    parseDir(dir + '/' + file);
                    resourceStack.pop();
                }
              }
          });
      }
    });
  })(rootDir);

  return;
};
