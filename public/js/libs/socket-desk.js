//start connection
var socket = io();


var params = new URLSearchParams(window.location.search);

if (!params.has('desk')){
    window.location = 'index.html';
    throw new Error('Desk needed!');
}

var desk = params.get('desk');
$('h1').text('Desk ' + desk);

$('#attendButton').on('click', function(){

    socket.emit('attendTicket', {desk: desk}, function(response){
        
        if (response.ok === true){
            $('small').text(response.attendingTicket);

        } else {
            console.log(response);
        }
    })

});

