import './style.css'

const landing = document.getElementById("landing");
const app = document.getElementById("app");
const enterBtn = document.getElementById("enterBtn");
const loader = document.getElementById("loader");

/**Pre-load class is removed from body */
document.documentElement.classList.remove('preload');

window.addEventListener("load", () => {
    landing.classList.remove("hidden");
})

enterBtn.addEventListener("click", () => {

    enterBtn.disabled = true;
    loader.classList.add("show");

    setTimeout(() => {
        landing.classList.add("hidden");
        app.classList.remove("hidden");    
    }, 2000);
    
  })