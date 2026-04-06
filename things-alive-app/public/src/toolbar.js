import {TOOLS} from "./tools.js";

//Handles the UI and sets the user action state when a tool selected
export function initToolbar(user){
    const buttons = document.querySelectorAll(".tool");

    buttons.forEach(element => {
        element.addEventListener("click", () => {
            const toolName = element.dataset.tool;
            const toolConfig = TOOLS[toolName];

            // update user action state
            user.setTool(toolName);
            user.setBrushSize(toolConfig.size);
            user.setColor(toolConfig.color);
    

            //   // optional: update canvas ctx immediately if needed
            //   ctx.lineWidth = toolConfig.size;
            //   ctx.strokeStyle = toolConfig.color;
            //   ctx.lineCap = toolConfig.lineCap;
            //   ctx.lineJoin = toolConfig.lineJoin;
        })
    });





}