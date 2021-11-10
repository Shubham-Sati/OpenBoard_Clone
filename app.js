const express = require("express");
const socket = require("socket.io");

const app = express(); // initialize app and server ready

app.use(express.static("public"));  // display index.html

let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
     console.log("listining to port ", port );
});

let io = socket(server);
io.on("connection", (socket) => {
    console.log("made socket connection");

    // received data from frontend to server
    socket.on("beginPath", (data) => {
        // Now transfer data to all connnected computers
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})


