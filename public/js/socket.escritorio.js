let socket = io();

let searchParams = new URLSearchParams(window.location.search);

let label = $('small');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';

    throw new Error('El escritorio es necesario');
}

let escritorio = searchParams.get('escritorio');

$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', () => {

    socket.emit('atenderTicket', { escritorio: escritorio }, (resp) => {

        if (resp === "No hay tickets") {
            // alert(resp);

            label.text(`No hay tickets`);


            return;
        }
        label.text(`Ticket: ${resp.numero}`);
    })
});