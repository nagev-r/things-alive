/** The User class stores user specific actions and tools 
 * so that users don't affect eachother while drawing */

export class User {
    constructor(userId){
        this.userId = userId;
        this.drawingHistory = { //drawingHistory is an object with the array of the strokes prev done and the currentStroke
            currentStroke: null,
            strokes: []            
         } 

        this.actionState = { //an object of the default state of user, starts on the pen tool
            tool: "pen",
            currentColor: "#000",
            brushSize: 2,
        }

    }

    
    setCurrentStroke(currentStroke){
        this.drawingHistory.currentStroke = currentStroke;
    }
    getCurrentStroke(){
        return this.drawingHistory.currentStroke;
    }


    addPoints(points){ //adds the coordinate points within the current stroke object (can be multiple)
        this.drawingHistory.currentStroke.points.push(points);
    }
    getPoints(){
        return this.drawingHistory.currentStroke.points.pop();
    }


    addStrokes(currentStroke){
        this.drawingHistory.strokes.push(currentStroke);
    }
    getStrokes(){
        return this.drawingHistory.strokes;
    }
    undoStroke(){
        this.drawingHistory.strokes.pop();
    }


    setColor(currentColor){
        this.actionState.currentColor = currentColor;
    }
    getColor(){
        return this.actionState.currentColor;
    }


    setBrushSize(brushSize){
        this.actionState.brushSize = brushSize;
    }
    getBrushSize(){
        return this.actionState.brushSize;
    }

    
    setTool(tool){
        this.actionState.tool = tool;
    }
    getTool(){
        return this.actionState.tool;
    }

}