const io = require('socket.io-client');
var socket = io("ws://localhost:3001");
const { log, dd }  = require('@ryosensei/console');
const { DateTime } = require('luxon');

socket.on('connect', function(client) {
    log(`Connected to server \n`, 'green');

    log(`Send identification ... \n`, 'grey');
    socket.emit("identify", {
        name: "Ryo"
    });

    setInterval(() => {
        socket.emit('new-message', "Coucou");
    }, 1000);


    socket.on('message', (message) => {
        let date = DateTime.fromISO(message.date).toFormat("HH:mm:ss");
        log(`[${date}] : ${message.from}\n${message.message} \n`, "blue", 0, null, null, false);
    });
    socket.on('history', (messages) => {
        messages.map(message => {
            let date = DateTime.fromISO(message.date).toFormat("HH:mm:ss");
            log(`[${date}] : ${message.from}\n${message.message} \n`, "blue", 0, null, null, false);
        });
    });

    socket.on('disconnect', function(client) {
        log(`Server disconnected \n`, 'red');
    });
});