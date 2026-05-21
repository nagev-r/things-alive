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
    socket.emit("initUser", {
        id: socket.id
    })


    socket.on("leaveRoom", (roomKey, callback) => {
        try{
            const room = activeRooms.get(roomKey);

            console.log("room user is leaving...", roomKey );
            socket.leave(roomKey);
            room.users.delete(socket.id);

            const currUsers = room?.users || [];
            console.log(currUsers);

            if(currUsers.size === 0){ activeRooms.delete(roomKey)}
            callback({ ok: true })
        } catch (err){
            callback({ ok: false, error: "problem joining server"})
        }
    })

    socket.on("joinRoom", (inputVal, callback) => {
        try{
            console.log("server says: ", inputVal);
            const validKey = /^[A-Z0-9]{6}$/.test(inputVal);            

            if(!validKey){
                return callback({ok: false, error: "Invalid room key"})
            }
            
            const room = activeRooms.get(inputVal);
                
            if(!room){
                console.log("room does not exist");
                return callback ({ ok: false, error: "Invalid Room Key"})
            }
            
            console.log("server says room exists");
            
            socket.join(inputVal);
            room.users.add(socket.id); 
            
            const currUsers = activeRooms.get(inputVal)?.users || [];
            console.log(currUsers);
            const isHost = room.host === socket.id;
            callback ({ok: true, isHost: isHost})
          
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
                users: new Set([socket.id]),
                strokes: []
            }

            socket.join(roomId);
            activeRooms.set(roomId, room); //set in the map BUT NEED TO CHECK IF HOST ALR IN ROOM
            const currUsers = activeRooms.get(roomId)?.users || [];
            if(activeRooms.has(roomId)){
                console.log("the room is in...users:", currUsers);
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

