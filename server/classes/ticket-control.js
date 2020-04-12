const fs = require('fs');



class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();

        //Tickets pendientes de revisión
        this.tickets = [];
        console.log('this.tickets', this.tickets);

        //Últimos tickets atendidos
        this.ultimos4 = [];

        let data = require('../data/data.json');


        if (data.hoy === this.hoy) {

            //Si es el mismo día, continuar con el último ticket guardado
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            //Reiniciar todo (es un nuevo día)
            this.reiniciarConteo();
        }

    }

    siguiente() {
        this.ultimo++;

        //Crear ticket, asignar número y añadir al arreglo
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }


    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        console.log('this.tickets', this.tickets);

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        //Obtener el primer ticket en espera y eliminarlo del arreglo
        let [ticket] = this.tickets;
        this.tickets.shift();

        let ticketAtender = new Ticket(ticket.numero, escritorio);

        //Agregar ticket al inicio del arreglo
        this.ultimos4.unshift(ticketAtender);

        //Borrar tickets del arreglo si ya hay más de 4
        if (this.ultimos4.length > 4) {

            this.ultimos4.splice(-1, 1);
        }

        this.grabarArchivo();

        return ticketAtender;

    }


    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se ha inicializado el sistema');
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));

    }



}


class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

module.exports = {
    TicketControl
}