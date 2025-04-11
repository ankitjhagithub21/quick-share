const { Server } = require('socket.io');
const {files} = require("../db.js")

let io = null;

exports.initIO = (server) => {
    io = new Server(server);

    io.on('connection',(socket)=>{
        console.log("User connected : ",socket.id)

        
        io.emit("updateFileList",files)

        socket.on('disconnect',()=>{
            console.log("User disconnected : ", socket.id)
        })
    })
}

exports.io = () => io
