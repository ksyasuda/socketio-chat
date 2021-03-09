import express from "express";
import { Socket } from "socket.io";

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 8000;

app.get("/", (req: express.Request, res: express.Response) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket: Socket) => {
	console.log("a user connected");
});

server.listen(PORT, () => {
	console.log(`Listening on *:${PORT}`);
});
