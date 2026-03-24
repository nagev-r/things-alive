import {commandHandler} from "./command-handler.js";
import {User} from "./user.js";
import {createCanvas} from "./canvas.js"
import {initToolbar} from "./toolbar.js";

export function setupWorkspace(){
    
    const user = new User(1); //new user on new workspace setup, future needs random gen
    
    const {canvas, ctx} = createCanvas(); 
    initToolbar(user);
    commandHandler(user, canvas, ctx); //default canvas is then sent for input usage

}

