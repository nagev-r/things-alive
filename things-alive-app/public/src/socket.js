import {beginDrawing, continueDrawing} from "./renderer.js";
import {showCreateCard, updateUI} from "./ui.js";

export function initSocket(user, ctx){
    const socket = io();

    socket.on("connect", () =>{
        console.log("connected to server", socket.id);
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
            showCreateCard(res.roomId);
            user.isHost = true;
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
            updateUI(user.isHost);
        })
    })

    // listen for the local drawing history from inputHandler, broadcast outgoing
    window.addEventListener("startStroke", (e) => {
        console.log("2: socket heard startStroke", e.detail);
        socket.emit("startStroke", e.detail);
    })

    window.addEventListener("updateStroke", (e) => {
        socket.emit("updateStroke", e.detail);
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