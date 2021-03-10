import express from 'express';
import http from 'http';
const socketIo = require('socket.io');

import index from './routes/index';

const port = process.env.PORT || 8001;

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval: any;

io.on('connection', (socket: SocketIO.Socket) => {
	console.log('New client connected');
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 1000);
	socket.on('disconnect', () => {
		console.log('Client disconnected');
		clearInterval(interval);
	});
});

const getApiAndEmit = (socket: SocketIO.Socket) => {
	const res = new Date();
	socket.emit('FromAPI', res);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
