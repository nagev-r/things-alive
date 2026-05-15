import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import { customAlphabet} from "nanoid";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const activeRooms = new Map();

app.use(express.static("public")); //pers notes: express used to serve the hmtl and src files

io.on("connection", (socket) => {
    // socket.join("default-room");
    socket.emit("initUser", {
        id: socket.id
    })

    socket.on("joinRoom", (inputVal, callback) => {
        try{
            console.log(inputVal); //just to test
        } catch (err){
            callback({ ok: false, error: "problem joining server"})
        }
    })
    
    socket.on("createRoom", (callback) => {
        try {
            const nanoid = customAlphabet('ACDEFGHJKLMNOPQRSTUVWXYZ23456789',6);
            const roomId = nanoid();

            const room = {
                id: roomId,
                host: socket.id,
                users: [socket.id],
                strokes: []
            }

            socket.join(roomId);
            activeRooms.set(roomId, room); //set in the map BUT NEED TO CHECK IF HOST ALR IN ROOM

            callback({ok: true, roomId})

        } catch (err){
            console.log(err);
            callback({ ok: false, error: "problem creating room try again"})
        }
        
        
    })

    socket.on("startStroke", (stroke) => {
        // listening for any client data to broadcast to everyone
        // console.log("4: server received strokeStart from ", socket.id);
        // socket.to("default-room").emit("startStroke", stroke);
    })

    socket.on("updateStroke", (points) => {
        // socket.to("default-room").emit("updateStroke", points);
    })

    socket.on("endStroke", () => {
        //nothing happens rendering wise
    })
})

httpServer.listen(3000);

