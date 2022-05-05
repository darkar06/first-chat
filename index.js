require("dotenv").config()
const { on } = require("events");
const express = require("express");
const app = express();
const path = require("path")

app.use((req,res,next)=>{
    console.log(req.method)
    console.log(req.path)
    console.log(req.body)
    console.log("--------------------------")

    next()
})


app.use((req,res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"))
})

const port = process.env.PORT || 3000

const server = app.listen(port,()=>{
    console.log("server on port 300")
})

const socketIO = require("socket.io")
const io = socketIO(server)

io.on("connection",(socket)=>{
    console.log("conected")
    console.log(socket.id)

    socket.on("New:message", (data) =>{
        io.sockets.emit("New:message", data)
    })
})