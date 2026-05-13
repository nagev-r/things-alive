import {beginDrawing, continueDrawing} from "./renderer.js";

export function initSocket(user, ctx){
    const socket = io();

    socket.on("connect", () =>{
        console.log("connected to server", socket.id);
    })

    socket.on("connect_error", (err) =>{
        console.log("connection error", err.message);
    })

    socket.on("init-user", (data) =>{
        console.log("user init: ", data.id );
        user.id = data.id;

    })

    //-----outgoing-----//
    window.addEventListener("createRoom", () => {
        socket.emit("createRoom");
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