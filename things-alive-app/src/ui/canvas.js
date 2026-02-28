
export function initCanvas() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    //setting pixel size
    canvas.width = 400;
    canvas.height = 400;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    let drawing = false;

    //start drawing
    canvas.addEventListener("mousedown", (e) => {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        console.log("this thing be drawing");
    })

    canvas.addEventListener("mousemove", (e) =>{
        if(!drawing) return;

        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    })

    //stop drawing
    canvas.addEventListener("mouseup", (e) => {
        drawing = false;
    })
     canvas.addEventListener( "mouseleave", (e) => {
        drawing = false;
    })

}