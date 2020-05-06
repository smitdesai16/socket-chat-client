var socket = io.connect('http://' + window.location.hostname + ':4000');

var stringToColour = function(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

$(function() {
	$("#message-form").on('submit', function(event) {
		event.preventDefault();
		socket.emit('chat', {
			message: $("#message").val()
		});
		$("#message").val('');
	});

	socket.on('chat', function(data) {
		$("#output").append('<div class="card mt-3"><div class="card-body"><strong style="color:' + stringToColour(data.userId) + '">' + data.userId + '</strong>: ' + data.message +'</div></div>');
	})

	socket.on('init', function(data) {
		$("#output").append('<div class="col-12"><p>' + data + ' joined</p></div>');
	})

	socket.on('disconnect', function(data) {
		$("#output").append('<div class="col-12"><p>' + data + ' left</p></div>');
	})
});