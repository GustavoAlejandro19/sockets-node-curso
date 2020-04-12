let socket = io();


let lblTicket1 = $('#lblTicket1');
let lblTicket2 = $('#lblTicket2');
let lblTicket3 = $('#lblTicket3');
let lblTicket4 = $('#lblTicket4');

let lblEscritorio1 = $('#lblEscritorio1');
let lblEscritorio2 = $('#lblEscritorio2');
let lblEscritorio3 = $('#lblEscritorio3');
let lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];



socket.on('estadoActual', (data) => {
    acutalizaHTML(data.ultimos4);
});


socket.on('ultimos4', (data) => {

    let audio = new Audio('audio/new-ticket.mp3');

    audio.play();

    acutalizaHTML(data.ultimos4);
});


acutalizaHTML = ultimos4 => {

    for (let i = 0; i < ultimos4.length; i++) {

        let { numero, escritorio } = ultimos4[i];

        lblTickets[i].text(`Ticket ${numero}`);
        lblEscritorios[i].text(`Escritorio ${escritorio}`);

    }


}