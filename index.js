var express = require('express');

var app = express();

var server = app.listen(4001, function(){
	console.log('listening to port 4001');
});

app.use(express.static('public'));
app.use('/bootstrap_css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/socket_io', express.static(__dirname + '/node_modules/socket.io-client/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
