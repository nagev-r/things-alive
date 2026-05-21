import {beginDrawing, continueDrawing} from "./renderer.js";
import {copyToClipboard, showCreateCard, updateUI} from "./ui.js";

export function initSocket(user, ctx){
    const socket = io();

    socket.on("connect", () =>{
        // console.log("connected to server", socket.id);
    })

    socket.on("connect_error", (err) =>{
        console.log("connection error", err.message);
    })

    socket.on("initUser", (data) =>{
        console.log("user init: ", data.id );
        user.id = data.id;

    })

    //-----outgoing-----//
    window.addEventListener("createRoom", () => {
        socket.emit("createRoom", (res) => {
            if(!res.ok){
                console.log(res.error)
                return;
            }
            console.log("Room created successfully")
            user.isHost = true;
            user.room = res.roomId;
            showCreateCard(res.roomId);
            updateUI(user.isHost);

        })
    })

    window.addEventListener("joinRoom", (e) => {
        
        console.log("client says code", e.detail);
        socket.emit("joinRoom", e.detail, (res) => {

            if(!res.ok){
                console.log(res.error)
                return;
            }
            user.isHost = res.isHost;
            user.room = e.detail;
            updateUI(user.isHost, user.room);
            
        })
    })

    window.addEventListener("leaveRoom", () => {
        socket.emit("leaveRoom", user.room, (res) => {
            if(!res.ok){
                console.log(res.error)
                return;
            }
            console.log("Left room");
            user.isHost = false;
            user.room = null;
            updateUI(user.isHost, user.room);

        })
    })

    window.addEventListener("inviteCode", async () => {
        return copyToClipboard(user.room);
    })

    // listen for the local drawing history from inputHandler, broadcast outgoing
    window.addEventListener("startStroke", (e) => {
        console.log("2: socket heard startStroke", e.detail);
        socket.emit("startStroke", e.detail, user.room);
    })

    window.addEventListener("updateStroke", (e) => {
        socket.emit("updateStroke", e.detail, user.room);
    })

    window.addEventListener("endStroke", () => {
        socket.emit("endStroke");
    })


    //---incoming--- remote history coming from server, draw on local
    // socket.on("roomCreated", (room) => {
    //     showCreateCard(room.id);
    //     user.isHost = true;
    // })

    socket.on("startStroke", (stroke) => {
        //draw remote user's stroke 
        console.log("3: received remote strokeStart", stroke);
        beginDrawing(stroke, ctx);
        
    })

    socket.on("updateStroke", (points) => {
        continueDrawing(points, ctx);
    })

     socket.on("endStroke", () => {
        //nothing sent to renderer...
    })
}