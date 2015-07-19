var http = require('http');
var SocketServer = require('websocket').server;
var run = require('./RunModule');

function serverCallback(r, q) {
  var command = r.toString().split(';')[0];
}

var server = new SocketServer()
//var server = http.createServer(function callback (r, q) {serverCallback(r, q)});
