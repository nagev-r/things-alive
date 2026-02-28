import {initLanding} from "./ui/landing.js";
import {openDoors} from "./ui/transition.js";
import {initCanvas} from "./ui/canvas.js";

console.log("this works");
initLanding(async () => {
  await openDoors();
  console.log("test");
  initCanvas();
})

  


