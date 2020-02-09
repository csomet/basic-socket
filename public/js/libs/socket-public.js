//start connection
var socket = io();

var ticket1 = $('#lblTicket1');
var ticket2 = $('#lblTicket2');
var ticket3 = $('#lblTicket3');
var ticket4 = $('#lblTicket4');

var desk1 = $('#lblDesk1');
var desk2 = $('#lblDesk2');
var desk3 = $('#lblDesk3');
var desk4 = $('#lblDesk4');

var tickets = [ticket1,ticket2,ticket3,ticket4];
var desks   = [desk1,desk2,desk3,desk4];

socket.on('connect', function(){
    console.log('Connected to server');
})

socket.on('disconnect', function(){
    console.log('disconnect to server');
})

socket.on('currentState', function(data){
    
    updateHTML(data.last4Tickets);

   
})

socket.on('currentState', function(data){
    
    updateHTML(data.last4Tickets);

})


socket.on('last4Tickets', async function(data){
    const audio = new Audio(`audio/desk${data.last4Tickets[0].desk}.mp3`);
    await audio.play()
    updateHTML(data.last4Tickets);

})

function updateHTML( last4Tickets){

    var index = 0;

    last4Tickets.forEach(element => {
        
        tickets[index].text('Ticket ' + element.ticketNumber);
        desks[index].text('Desk ' + element.desk);
        index++;
    });
}