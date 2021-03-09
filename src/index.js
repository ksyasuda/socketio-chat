"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var PORT = process.env.PORT || 8000;
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
io.on("connection", function (socket) {
    console.log("a user connected");
});
server.listen(PORT, function () {
    console.log("Listening on *:" + PORT);
});
