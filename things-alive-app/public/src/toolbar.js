import {TOOLS} from "./tools.js";

//Handles the UI and sets the user action state when a tool selected
export function initToolbar(user){
    const buttons = document.querySelectorAll(".tool");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const toolName = button.dataset.tool;
            const toolConfig = TOOLS[toolName];

            // update user action state
            user.setTool(toolName);
            user.setBrushSize(toolConfig.size);
            user.setColor(toolConfig.color);

            
            buttons.forEach(b => b.classList.remove("active"));
            button.classList.add("active");
    

          
        })
    });





}