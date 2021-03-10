import express from 'express';
import http from 'http';
import * as socketIo from 'socket.io';

import index from './routes/index';

const port = process.env.PORT || 8001;

const app = express();
app.use(index);

const server = http.createServer(app);

//const io = socketIo(server);
const io = new socketIo.Server(server);

let interval: any;

io.on('connection', (socket: socketIo.Socket) => {
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

const getApiAndEmit = (socket: socketIo.Socket) => {
	const res = new Date();
	socket.emit('FromAPI', res);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
