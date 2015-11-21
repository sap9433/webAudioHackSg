var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
  console.log(req.url);

  var pageUrl = __dirname + '/index.html';

  if(req.url == '/geoloc') {
    pageUrl = __dirname + '/geoloc.html';
  }

  fs.readFile(pageUrl,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.of('mynsp').on('connection', function (socket) {
  socket.on('clientMovement', function (data) {
    socket.emit('movement', { location: data.delta });
  });
});