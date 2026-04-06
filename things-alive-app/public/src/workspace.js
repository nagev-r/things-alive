import {commandHandler} from "./command-handler.js";
import {User} from "./user.js";
import {createCanvas} from "./canvas.js"
import {initToolbar} from "./toolbar.js";
import {initSocket} from "./socket.js";

export function setupWorkspace(){
    const userId = crypto.randomUUID();
    const user = new User(userId); //new user on new workspace setup, future needs random gen
    
    const {canvas, ctx} = createCanvas(); 
    initToolbar(user);
    commandHandler(user, canvas, ctx); //default canvas is then sent for input usage
    initSocket(ctx);
}

