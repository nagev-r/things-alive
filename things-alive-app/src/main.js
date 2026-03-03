import {initLanding} from "./ui/landing.js";
import {openDoors} from "./ui/transition.js";
import { initWorkspace } from "./worskpspace.js";


initLanding(async () => {
  await openDoors();
  console.log("test");
  initWorkspace();
})

  


