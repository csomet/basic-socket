//start connection
var socket = io();

socket.on('connect', function(){
    console.log('Connected to server');
})

socket.on('disconnect', function(){
    console.log('disconnect to server');
})


socket.on('currentState', function(data){
    $('#lblNewTicket').text(data.state);
});

$('#newTicket').on('click', function() {
    
    socket.emit('nextTicket', null, function(nextTicket){
        
        $('#lblNewTicket').text(nextTicket);
    });
})