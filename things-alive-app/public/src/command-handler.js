import { beginDrawing, continueDrawing } from "./renderer.js";


//need to add undo, redo, and a clear
export function commandHandler(user, canvas, ctx) {
    console.log("command handler called");
    let drawing = false;
    canvas.addEventListener("mousedown", (e) => {
        drawing = true;

        const newStroke = {
            userId: user.getUserId(),
            tool: user.getTool(),
            currentColor: user.getColor(),
            brushSize: user.getBrushSize(),
            points: []
        }
        const {x, y} = getMouseCoords(e);
        
        user.setCurrentStroke(newStroke);
        user.addPoints({x: x, y: y})
        beginDrawing(user.getCurrentStroke(), ctx);

        window.dispatchEvent(new CustomEvent("startStroke", {
            detail: user.getCurrentStroke()
        }))
        console.log("1: dispatched startStroke", user.getCurrentStroke());
        
    })

    canvas.addEventListener("mousemove", (e) =>{
        if(!drawing) return;

        const {x, y} = getMouseCoords(e);

        user.addPoints({ x: x, y: y });
        continueDrawing(user.getPoints(),ctx);

        window.dispatchEvent(new CustomEvent("updateStroke", {
            detail: {x: x, y: y}
        }))
        

        // temp draw
        // ctx.lineTo(e.offsetX, e.offsetY);
        // ctx.stroke();
    })

    //stop drawing
    canvas.addEventListener("mouseup", () => {
        if(!drawing) return;
        drawing = false;

        user.addStrokes(user.getCurrentStroke());
        user.setCurrentStroke(null);
        
        window.dispatchEvent(new CustomEvent("endStroke"));
       

    })
     canvas.addEventListener( "mouseleave", () => {
        if(!drawing) return;
        drawing = false;

        user.addStrokes(user.getCurrentStroke());
        user.setCurrentStroke(null);

        window.dispatchEvent(new CustomEvent("endStroke"));
    })

    //Undo and Redo Functions
    document.addEventListener("keydown", function(event){
        const isShortcut = event.ctrlKey || event.metaKey;
        
        if (isShortcut && event.key ==='z'){
            // event.preventDefault();
            console.log("Undooooo");
        }
    })

    document.addEventListener("keydown", function(event){
        const isShortcut = event.ctrlKey || event.metaKey;
        
        if (isShortcut && event.key ==='y'){
            // event.preventDefault();
            console.log("Redooo");
        }
    })

    function getMouseCoords(e){
        return{
            x: (e.offsetX )*(canvas.width / canvas.clientWidth),
            y: (e.offsetY)*(canvas.height / canvas.clientHeight),
        }
    }
}