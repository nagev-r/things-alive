
export function inputHandler(user, canvas, ctx) {
    let drawing = false;

    canvas.addEventListener("mousedown", (e) => {
        drawing = true;

        const newStroke = {
            tool: user.getTool(),
            currentColor: user.getColor(),
            brushSize: user.getBrushSize(),
            points: []
        }

        user.setCurrentStroke(newStroke);
        user.addPoints({x: e.offsetX, y: e.offsetY})
         
        ctx.strokeStyle = user.getColor();
        ctx.lineWidth = user.getBrushSize();
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    })

    canvas.addEventListener("mousemove", (e) =>{
        if(!drawing) return;

        user.addPoints({ x: e.offsetX, y: e.offsetY });

        // temp draw
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    })

    //stop drawing
    canvas.addEventListener("mouseup", (e) => {
        if(!drawing) return;
        drawing = false;

        user.addStrokes(user.getCurrentStroke());
        user.setCurrentStroke(null);

       console.log(JSON.stringify(user.getStrokes(), null, 2));

    })
     canvas.addEventListener( "mouseleave", (e) => {
        if(!drawing) return;
        drawing = false;

        user.addStrokes(user.getCurrentStroke());
        user.setCurrentStroke(null);
    })

}