const {io} = require('../server');
const { TicketManager } = require('../classes/ticket');

let ticket = new TicketManager();


io.on('connection', (client)=>{
    console.log('Client connected');

    client.on('disconnect', (client)=>{
        console.log('Client disconnected!');
    })
    
    //listen to client
    client.on('nextTicket', (data, callback)=>{
        
        let nextTicket = ticket.nextTicket();
        callback(nextTicket);
       
    })

    //send to client current state
    client.emit('currentState', {
        state: ticket.getCurrentTicket(),
        last4Tickets: ticket.getLast4Tickets()
    });


    client.on('attendTicket', (data, callback)=> {
        
        if (!data.desk){
            return callback({
                ok: false,
                message: 'Error: Needed desk number!'
            })
        }else {
            let number = ticket.attendTicket(data);
            callback({
                ok: true,
                attendingTicket: number
            })

            client.broadcast.emit('last4Tickets', {
                last4Tickets: ticket.getLast4Tickets()
            })
        }

       
    });
    
})