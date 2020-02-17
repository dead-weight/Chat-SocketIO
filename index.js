// var app = require('express')();
// var http = require('http').createServer(app);
// const socket = io.connect('https://localhost:3000')
var express = require('express');
const app = require('express')();
var http = require('http').createServer(app);

const ejs = require('ejs')


//template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

//routes
app.get('/', (req, res) => {
	res.render('index')
})


//listening on port 3000

// server.listen(3000, function(){
//   console.log('listening on *:3000');
// });



server = app.listen(3000)
var io = require('socket.io')(http);




//listening on every connection
io.on('connection', (socket)=>{
    console.log('New user connected')


    //default.username
    socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data)=>{
        io.socket.emit('new message', {message : data.message, username : socket.username});
    })

    //listening on every disconnect
    socket.on('disconnect', function(){
        console.log('user disconnected');
    })
    //listening on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username})
    })
    //listening on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username : socket.username})
    })
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});



const history = []
const client = []
// //Telling Express+Socket.io App To Listen To Port
io.sockets.on("connection",function(socket){

        client.push({id : socket.client.id})
//         console.log(client)

        var getClientID = client.find(e => (e.id === socket.client.id))
//        console.log("the Client", getClientID)
       if(getClientID){
        io.sockets.emit("msg",history);
        socket.emit("msg",history);

       }

    socket.emit("Start_Chat");
//     //On Event Registar_Name
    socket.on("Register_Name",function(data){
//             console.log(data)
       io.sockets.emit("r_name","<strong>"+data+"</strong> Has Joined The Chat");

//        //Now Listening To A Chat Message
       socket.on("Send_msg",function(data){

               history.push(data)
               console.log(history)
               io.sockets.emit("msg",data);

        })
    })
})



