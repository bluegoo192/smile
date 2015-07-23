var http = require('http');
var WebSocketServer = require('websocket').server;
var run = require('./RunModule');

var count = 0;
var clients = {};



var mainserver = http.createServer(function callback (request, response) {});
var wsServer = new WebSocketServer({
  httpServer: mainserver
});

mainserver.listen(2000, function() {console.log("Listening on port 2000")});

wsServer.on('request', function(r) {
  var connection = r.accept('echo-protocol', r.origin);
  var id = count++;
  clients[id] = connection;
  console.log("New connection accepted from Client " + id);
  connection.on('message', function(m) {
    run(m, connection);
  });
  connection.on('close', function(reasonCode, description) {
    delete clients[id];
    console.log("Peer " + connection.remoteAddress + " disconnected.");
  });
});
//var server = http.createServer(function callback (r, q) {serverCallback(r, q)});
/*
function serverCallback(r, q) {
  var command = r.toString().split(';')[0];
}

v----for handling form POSTs---v
function (req, res) {
        if (req.method == 'POST') {
            var jsonString = '';
            req.on('data', function (data) {
                jsonString += data;
            });
            req.on('end', function () {
                 console.log(JSON.parse(jsonString));
            });
        }
    }
*/
