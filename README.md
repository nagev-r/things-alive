# things-alive

npm install socket.io express
```

For the docs I'd read in this order since it maps to what you're building:
```
server side:
1. installation + basic setup
2. emitting events
3. rooms

client side:
1. installation
2. emitting events
3. listening for events
```

You don't need to read everything — a lot of the docs cover edge cases you won't hit yet. The core is just:
```
server                          client
io.on("connection")             io()
socket.join(roomId)             socket.emit()
socket.to(roomId).emit()        socket.on()
socket.on()


//Thought process for the command-handler to client socket: A custom window event is made and dispatched,
the client socket listens for this and emits that data to the server socket
