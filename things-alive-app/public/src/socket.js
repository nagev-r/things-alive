import {beginDrawing, continueDrawing} from "./renderer.js";
import {copyToClipboard, showCreateCard, hideJoinCard, updateUI, showToast} from "./ui.js";

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
        user.userId = data.id;

    })

    //-----outgoing-----//
    window.addEventListener("createRoom", () => {
        socket.emit("createRoom", (res) => {
            if(!res.ok){
                showToast(res.error)
                return;
            }
            showToast("Room created successfully :)")
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
                showToast(res.error)
                return;
            }
            user.isHost = res.isHost;
            user.room = e.detail;

            showToast(`You have joined the room`);
            hideJoinCard();
            updateUI(user.isHost, user.room);
            
        })
    })

    window.addEventListener("leaveRoom", () => {
        socket.emit("leaveRoom", user.room, (res) => {
            if(!res.ok){
                showToast(res.error)
                return;
            }
            
            showToast(`User ${user.userId} has left the room`);
           
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