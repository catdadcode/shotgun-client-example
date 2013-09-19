
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

// Get reference to the created server.
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// Require shotgun and shotgun-client then create a new shell.
var shotgun = require('shotgun'),
    shotgunClient = require('shotgun-client'),
    shell1 = new shotgun.Shell({
        namespace: 'shell1',
        cmdsDir: 'shell1',
        defaultCmds: {
            exit: false
        }
    }),
    shell2 = new shotgun.Shell({
        namespace: 'shell2',
        cmdsDir: 'shell2',
        defaultCmds: {
            exit: false
        }
    });

// Use shotgun-client to wire up the server and shell.
shotgunClient.debug = true;
shotgunClient.attach(server, shell1, shell2);