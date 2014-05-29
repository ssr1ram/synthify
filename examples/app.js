var express = require('express');
var synthify = require('../synthify')

var app = express();

var synthoptions = {
    basedir: "back/resources"
};

synthify.resources(app, synthoptions);

var server = app.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
});
