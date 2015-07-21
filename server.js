var http = require ('http');
var WebSocketServer = require('websocket').server;
var server = http.createServer(function(req, res){});
var count = 0;
var clients = {};
server.listen(1234, function(){
  console.log((new Date()) + 'Listening');
});
wsServer = new WebSocketServer({
  httpServer: server
});
wsServer.on('request', function(r){
  var connection = r.accept('echo-protocol', r.origin);
  var id = count++;
  clients[id] = connection;
  console.log((new Date()) + 'Connection accepted [' + id + ']');
  connection.on('message', function(message){
    var check = message.utf8Data;
    switch(check){
      case "id":
        clients[id].sendUTF("id;" +id);
        break;
      default:
        var msgString = "User " + id + ": " + message.utf8Data;
        //message.utf8Data.split(';')[0];
        for(var i in clients){
            clients[i].sendUTF(msgString);
          }
        }
  });
  connection.on('close', function(reasonCode, description){
    delete clients[id];
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});
