let http = require('http');
let fs = require('fs');

// Chargement du fichier index.html affiché au client
let server = http.createServer(function(req, res) {
  fs.readFile('./index.html', 'utf-8', function(error, content) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(content);
  });
});

// Chargement de socket.io
let io = require("socket.io").listen(server);
let users = [];
let connections = [];

io.sockets.on("connection", function (socket) {
  connections.push(socket);
  console.log("Nouvelle connexion : %s sockets connectés", connections.length);

  socket.on("deconnexion", function(data){
    connections.pop(connections.indexOf(socket), 1);
    console.log("Nouvelle déconnexion : %s socket conectés", connections.length);
  });

  //Send Message
  socket.on("send", function(data){
    console.log(data);
    io.sockets.emit('new message', {msg: data});
  });
});

server.listen(3000);
