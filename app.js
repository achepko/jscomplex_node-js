const express = require("express");
const app = express();
const http = require("node:http");
const socketIO = require("socket.io");

const server = http.createServer(app);

const io = socketIO(server, {cors: {origin: "*"}});

io.on("connection", (socket) => {
    // console.log(socket);

    socket.on("message:create", (messageData) => {
        console.log(messageData, 'Message data')
        socket.emit("message:receive", {ok: true});
    })

    // socket.on("broadcast:all",()=>{
    //     io.emit("alert","Повітряна тривога");
    // })

    socket.on("broadcast:all",()=>{
        socket.broadcast.emit("alert","Повітряна тривога");
    })

    socket.on("room:joinUser",({roomId})=>{
        socket.join(roomId);
        io.to(roomId).emit("room:newUserAlert",socket.id);
    })
})



server.listen(3000, () => {
    console.log('Listen', 3000);
})