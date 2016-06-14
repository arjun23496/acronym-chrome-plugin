#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http       = require('http');

//Api routes
var api = require('./api/index.js');

var app     = express();

//  Set the environment variables we need.
var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof ipaddress === "undefined") {
    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
    //  allows us to run/test the app locally.
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    ipaddress = "127.0.0.1";
}

var terminator = function(sig){
    if (typeof sig === "string") {
       console.log('%s: Received %s - terminating sample app ...',
                   Date(Date.now()), sig);
       process.exit(1);
    }
    console.log('%s: Node server stopped.', Date(Date.now()) );
};


/**
 *  Setup termination handlers (for exit and a list of signals).
 */
var setupTerminationHandlers = function(){
    //  Process on exit and signals.
    process.on('exit', function() { terminator(); });

    // Removed 'SIGPIPE' from the list - bugz 852598.
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
     'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function(element, index, array) {
        process.on(element, function() { terminator(element); });
    });
};


setupTerminationHandlers();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var allowCrossDomain = function(req, res, next) {
    
  res.header("Access-Control-Allow-Origin", "*");    
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
};
app.use(allowCrossDomain);

//Routes here

app.get('/acronym',api.searchAcronym);
app.post('/acronym',api.createAcronym);

// app.get('/',function(req,res,next){

//     var query = req.query.q;
//     var request = require('request');
//     var parseString = require('xml2js').parseString;

//     console.log(query);

//     if(query!=undefined)
//     {
//       request("http://acronyms.silmaril.ie/cgi-bin/xaa?"+query,function(error,response,body){
//           if(error)
//           {
//             console.log(error);
//             res.send(error);
//           }
//           else
//           {
//             parseString(body,function(err,result){
//               if(err)
//               {
//                 res.send(err);
//               }
//               else
//               {
//                 console.log(result);
//                 res.send({ status:true, data:result });
//               }
//             });
//           }
//       });
//     }
//     else
//     {
//       res.status(500).json({ status:false, message: "Parameter Problem" });
//     }
// });

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('port', port);
var server = http.createServer(app);

server.listen(port, ipaddress, function(){
  console.log( "Listening on " + ipaddress + ", server_port " + port );
});
// server.on('error', function(error){
//     console.log(error);
// });
// server.on('listening', function(){
//     var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   console.log('Listening on ' + bind);
// });