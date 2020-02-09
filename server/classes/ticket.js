
/**
 * Class containing a specific ticket
 */
class Ticket {

    constructor(ticketNumber, desk){
        this.ticketNumber = ticketNumber;
        this.desk = desk;
    }
}


/**
 * Class to manage the ticket system.
 * It controls ticket count per day. Everyday new day is reset
 * the ticket count to 0 or else it will be resume the count
 * from saved data.
 */
class TicketManager {

    saveToFile = require('../utils/fileUtils');

    constructor() {

        this.last = 0;
        this.today = new Date().getDate();
        this.pendingTickets = [];
        this.last4Tickets = [];

        let data = require('../data/data.json');
        
        if (data.today === this.today){

            this.last = data.last;
            this.pendingTickets = data.pendingTickets;
            this.last4Tickets = data.last4Tickets;

        } else {
            this.resetTicketCount();
        }
    }

    /**
     * Reset data for new day
     */
    resetTicketCount() {

        this.pendingTickets = [];
        this.last4Tickets = [];
        this.last = 0;
        this.saveToFile({
            last: this.last,
            today: this.today,
            pendingTickets: this.pendingTickets,
            last4Tickets: this.last4Tickets
        });
    }


    nextTicket(){

        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.pendingTickets.push(ticket);

        this.saveToFile({
            last: this.last, 
            today: this.today,
            pendingTickets: this.pendingTickets,
            last4Tickets: this.last4Tickets
        });

        return this.last;
    }

    getCurrentTicket(){
        return this.last;
    }

    getLast4Tickets(){
        return this.last4Tickets;
    }

    attendTicket(desk){
        
        if(this.pendingTickets.length === 0) {
            return 'No pending tickets';

        } else {
            
            let ticketNumber = this.pendingTickets[0].ticketNumber;
            //remove first item from array
            this.pendingTickets.shift();
            //Add at array's first position
            this.last4Tickets.unshift(new Ticket(ticketNumber, desk.desk));

            if (this.last4Tickets.length > 4) {
                this.last4Tickets.splice(-1,1); //deletes last element on array
            }

            this.saveToFile({
                last: this.last, 
                today: this.today,
                pendingTickets: this.pendingTickets,
                last4Tickets: this.last4Tickets
            });

            return ticketNumber;
        }
    }

}


module.exports = {
    TicketManager
}