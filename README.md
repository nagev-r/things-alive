# Notes on Project Building
*-----3/6/26-----* 
One of the most interesting things concerning my project is how much it has forced me to think of drawing programs not as drawing programs but as little collections of data handlers that are reading, writing, and sharing values.

The first big shift for me was understanding how the canvas API worked to actually lay down strokes in accordance to the mouse actions of the user. In a way, I had to think like the program itself and:

Determine what user inputs I would need and listen for them (eg. mousedown, mousemove).
Then take the details of the event object, such as mouse coordinates in this case, to allow me to draw the line path.
Once this concept was grasped in a basic implementation I then had to really think about how this data would extend beyond one user's canvas due to the nature of this being a collaborative drawing program.

As the user draws, more and more points will accure. By tracking these points in an array we can basically replay these steps to recreate the drawing sequntially. This is the data that will be sent over websockets and update other users in real time.

For now, I've reasoned that storing this info in the User class would be a decent way to keep each state of the application contained with its own state. I will go over the other structures and data handling methods I am using later!

*-----4/5/26-----*
Finished some basic implementation of a websocket connection. I decided to use socket.io to handle all the ground work as well as the added benefit of having logic for private rooms. After flipping back and forth through the socket.io docs and some tutorial information, I believe I have a decent understanding on how websockets work and so I will run thorugh it briefly now (to help me solidify it)!

In the ever-so-exciting world of networking protocols, websockets were my choice for achieving a real-time application due to it bidirectional and persistence features. I reasoned that my collab web-app would be an event driven system, meaning with every user action/event there would be a reaction by the system.
So the program pretty much needs the server and the client to request and respond back and forth so that the each user is updated with the data from another user on their canvas.

:root {
  --text-default: #000000;
  --bg-color: #ffffff;
  --light-blue: #8FABD4;
  --dark-blue: #4A70A9;
  --padding-sm: 1rem;
  --padding-md: 2rem;
}

body {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  margin: 0;
  background-color: var(--bg-color);
  /* min-width: 1024px; */
  height: 100vh;
  overflow: hidden;
}

main {
  flex: 1;
  display: flex;
  flex-direction: row;
  min-height: 0;
  overflow: hidden;
  
}

footer {
  background-color: #00000056;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

p{
  font-size:1em;
}

.hidden {
  opacity: 0;
  pointer-events: none;
}



button {
  border-radius: 100px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover { border-color: #646cff; }
button:focus,
button:focus-visible { outline: 4px auto -webkit-focus-ring-color; }

#pen    { background-color: #94366d; }
#brush  { background-color: #3380be; }
#marker { background-color: #a7892a; }
#eraser { background-color: #6edf64; }

.nav {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  width: 22vw;
  flex-shrink: 0;
  padding: 24px;
}

.nav-links {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  background-color: #f334a39a;
  font-size: 1.5rem;
}



#workspace-container {
  flex: 1;
  min-width: calc(78vw);
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  z-index: 1;
  overflow: auto;
}

#canvasLayout {
  display: block;
  border: 1px dotted black;
  background-color: white;
  min-width: 900px;
  min-height: 585px;
  z-index: 4;
}

.toolbar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: fit-content; 
  min-width: 80px;
  z-index: 2;
  border: 1px dotted black;
}

.tool {
  width: 50px;
  height: 50px;
  background-color: #e3e6eb;
  margin: 2px;
  z-index: 3;
}

/* Small screen gate */
#small-screen-warning {
  display: none;
}

/* @media (max-width: 1023px) {
  .app-shell {
    display: none;
  }
  #small-screen-warning {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    padding: 2rem;
    color: var(--text-default);
  }
} */