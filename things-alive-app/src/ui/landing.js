
export function initLanding(onEnter){
    const landing = document.getElementById("landing");
    const app = document.getElementById("app");
    const enterBtn = document.getElementById("enterBtn");
    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        landing.classList.remove("hidden");
    })

    enterBtn.addEventListener("click", async () => {
        enterBtn.disabled = true;
        loader.classList.add("show");
    
        landing.classList.remove("is-active");
        app.classList.add("is-active");
        
        await onEnter();
        console.log("test2");    
    
    })

}