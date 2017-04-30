var express = require('express'),
	app = express();
app.use(express.static('public'));

var http = require('http').Server(app),
	io = require('socket.io')(http),
	port = process.env.PORT || 3000;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/default.html');
});

// Called when the client calls socket.emit('move')
io.on('connection', function(socket){
	socket.on('move', function(msg){
	    io.emit('move', msg);
	});
});

http.listen(port, function() {
    console.log('listening on *: ' + port);
});