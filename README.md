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
