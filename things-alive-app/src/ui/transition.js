
export function openDoors(){
  return new Promise((resolve) => {
    const panels = document.querySelector('.door-panels');
    resolve();
    panels.classList.add('open');
  })
   
  }