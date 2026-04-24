
//will initialize the default canvas for all users
export function createCanvas(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    //setting pixel size of canvas and brush style basic implementation
    canvas.width = 1280;
    canvas.height = 768;
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height); 

    //need to add infinite canvas where one can zoom in and out

    return{canvas, ctx};
}