
const landing = document.getElementById("landing");
const app = document.getElementById("app");
const enterBtn = document.getElementById("enterBtn");
const loader = document.getElementById("loader");
const panels = document.querySelector('.door-panels');

window.addEventListener("load", () => {
    landing.classList.remove("hidden");
})

  function openDoors(){
    panels.classList.add('open');
  }
  
enterBtn.addEventListener("click", () => {

    enterBtn.disabled = true;
    loader.classList.add("show");
    
  
    setTimeout(() => {
      landing.classList.remove("is-active");
      app.classList.add("is-active");
      
      setTimeout(() => {
        openDoors()
    
      
      }, 500)
  }, 600);
    
  })

