const express = require('express');
const userroutes = require('./routes/userRoutes'); 
const db = require('./config/db');
require("dotenv").config();
const app = express();
db();
const http = require('http');
var cors = require('cors');
const User = require('./models/userModel');
app.use(cors());
app.use(express.json());

app.post("/api/user/create", async function(req, res){
    udata = req.body;
    if(!udata.name && !udata.email && !udata.age && !udata.occupation && !udata.address){
        res.status(400).json({
            status:"error",
            "message":"Please fill all the fields!"
        })
    }else{
        let userupdated = await User.create(udata);
        res.status(200).json({
            "status":"success",
            "added_user":userupdated
        })
    }
})


app.get("/api/user/getall", async function(req, res){
    let founduser = await (await User.find({})).reverse();
    res.status(200).json({
        "status":"success",
        total_user:founduser
    })
    
})



const port=  process.env.port || 3000;
app.use("/", function(req, res){
    res.status(404).json({
        "message":`No routes with url http://loclahost:5000${req.url} exists!`,
        "request":"Sorry"
    })
})


const server = http.createServer(app);

const {Server} = require('socket.io')
const io = new Server(server,{
    cors:{
        origin:"*"
    }
});
server.listen(port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`${port} started!`);
    }
})


io.on('connection', (socket)=>{
    console.log('User connected on: ', socket.id);
    socket.on('sent_data', function(data){
        // console.log(data);
        io.emit("recieve", data);
    })
})