$(function(){
    // make some connection
    var socket = io.connect('http://localhost:3000')

    //buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")
    
    //emit message
    send_message.click(function(){
        console.log('message emitted')
        socket.emit('new_message', {message : message.val()})
    })

    //liste on new_message
    socket.on("new_message", (data) => {
        feedback.gtml('');
        message.val('');
        // console.log(data)
        chatroom.append("<p class='message'>" + data.username + ":" + data.message + "</p>")
    })

    //emit a username
    send_username.click(function(){
        // console.log(username.val())
        socket.emit('change_username', {username : username.val()})
    })
})