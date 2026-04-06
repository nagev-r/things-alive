export function beginDrawing(stroke, ctx){
    ctx.strokeStyle = stroke.currentColor;
    ctx.lineWidth = stroke.brushSize;
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

}

export function continueDrawing (points, ctx){
    ctx.lineTo(points.x, points.y);
    ctx.stroke()

}
    //add more
    //render all strokes so it can be sent to via socket, undo, redo, clear