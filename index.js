const express = require('express');
const app = express();

// Running express server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server listening on port ${port}`));


// Setting up socket
const io = require('socket.io')(server);

var clients = {};
var totalClient = 0;

// Listening for if socket connection is made  
io.on('connection', socket => {

	// Maintaining Clients list in memory to have their socket based on their email
	// Notifying each user for new client list (Their emails)
	clients[socket.handshake.query.email] = socket;
	totalClient++;
	console.log(`New socket connected with id ${socket.id} total clients ${totalClient}`);
	io.sockets.emit('clients', {clients: Object.keys(clients)});

	// Listening for if socket disconnects
	socket.on('disconnect', sock => {
		delete clients[socket.handshake.query.email];
		totalClient--;
		io.sockets.emit('clients', {clients: Object.keys(clients)});
		console.log(`Socket disconnected total clients ${totalClient}`);
	});

	// Listeing for messages if send from any client
	socket.on('message', message => console.log('Message received', message));
});
