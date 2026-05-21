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


    socket.on("leaveRoom", (room, callback) => {
        try{
            console.log("room user is leaving...", room );
            socket.leave(room);
            callback({ ok: true })
        } catch (err){
            callback({ ok: false, error: "problem joining server"})
        }
    })

    socket.on("joinRoom", (inputVal, callback) => {
        try{
            console.log("server says: ", inputVal);
            const validKey = /^[A-Z0-9]{6}$/.test(inputVal);            

            if(validKey){
                const roomExists = activeRooms.has(inputVal);
                if(roomExists){
                  console.log("server says room exists");
                    socket.join(inputVal);
                    callback({ ok: true, inputVal})  
                }else{ callback ({ ok: false, error: "Invalid Room Key"})}
            }else{
                callback ({ ok: false, error: "Invalid Room Key"})
            }
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
            if(activeRooms.has(roomId)){
                console.log("the room is in");
            }

            callback({ok: true, roomId})

        } catch (err){
            console.log(err);
            callback({ ok: false, error: "problem creating room try again"})
        }
        
        
    })

    socket.on("startStroke", (stroke, room) => {
        // listening for any client data to broadcast to everyone
        // console.log("4: server received strokeStart from ", socket.id);
        socket.to(room).emit("startStroke", stroke);
    })

    socket.on("updateStroke", (points, room) => {
        socket.to(room).emit("updateStroke", points);
    })

    socket.on("endStroke", () => {
        //nothing happens rendering wise
    })
})

httpServer.listen(3000);

