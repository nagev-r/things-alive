import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static("public")); //express used to serve the hmtl and src files

io.on("connection", (socket) => {
    socket.join("default-room");
    socket.on("startStroke", (stroke) => {
        // listening for any client data to broadcast to everyone
        console.log("4: server received strokeStart from ", socket.id);
        socket.to("default-room").emit("startStroke", stroke);
    })

    socket.on("updateStroke", (points) => {
        socket.to("default-room").emit("updateStroke", points);
    })

    socket.on("endStroke", () => {
        //nothing happens rendering wise
    })
})

httpServer.listen(3000);