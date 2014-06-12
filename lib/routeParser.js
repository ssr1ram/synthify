var fs = require('fs');
require('coffee-script/register');

var rootDir;
var resourceStack = [];

function productionMode () {
  return process.env.NODE_ENV === 'production';
}

function Handler (file, method, path, isCustom, funcName) {
  this.file = file;
  this.method = method;
  this.path = path;
  this.isCustom = isCustom;
  this.funcName = funcName;
  this.resources = resourceStack.slice();
}

Handler.prototype.func = function (direct) {
  var func = require(this.file)[this.funcName];
  return func;
}

function parseFile (file) {
  var method;
  var module = require(file);
  var handlers = [];
  var methods = ['get', 'put', 'post', 'delete'];
  var parsed;

  for (var funcName in module) {
    if (funcName == 'synthup') {
        for (var i=0; i<module[funcName].length; i++) {
            var m = module[funcName][i];
            handlers.push(
              new Handler(
                file,
                m.method,
                m.route,
                false,
                m.fn
              )
            );
        }
    }
  }
  return handlers;
}

var handlers = [];
exports.parse = function (rootDirParam) {
  handlers = [];
  rootDir = rootDirParam;

  (function parseDir (dir) {
    var contents = fs.readdirSync(dir).sort();
    contents.forEach(function (file) {
      if ( /_back\.(js|coffee)$/.test(file) ) {
        handlers = handlers.concat(
          parseFile(dir + '/' + file)
        );
      } else {
          if (fs.statSync(dir + '/' + file).isDirectory()) {
                resourceStack.push(file);
                parseDir(dir + '/' + file);
                resourceStack.pop();
          }
      }
    });
  })(rootDir);

  return handlers;
};

exports.routeHandlers = function () { return handlers; };
