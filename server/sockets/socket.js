const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();

        console.log('siguiente:', siguiente);

        callback(siguiente);
    });

    //Emitir estado actual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    //Evento para atender ticket
    client.on('atenderTicket', (data, callback) => {

        let { escritorio } = data;


        if (!escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let ticketAtender = ticketControl.atenderTicket(escritorio);

        callback(ticketAtender);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    });

});