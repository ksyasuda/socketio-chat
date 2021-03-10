import express from "express";
import { Socket } from "socket.io";

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 8000;

app.get("/", (req: express.Request, res: express.Response) => {
	const directory = __dirname;
	const view = directory.substring(0, directory.lastIndexOf("/")) + "/views";
	res.sendFile(view + "/index.html");
});

io.on("connection", (socket: Socket) => {
	console.log("a user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

	socket.on("chat message", (msg) => {
		io.emit("chat message", msg);
	});
});

server.listen(PORT, () => {
	console.log(`Listening on *:${PORT}`);
});
