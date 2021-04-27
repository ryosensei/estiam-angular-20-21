// Test client
const io           = require('socket.io-client');
const { log, dd }  = require('@ryosensei/console');
const { DateTime } = require('luxon');

var socket         = io("ws://localhost:3001");


// On connect
socket.on('connect', function(client) {
    log(`Connected to server \n`, 'green');

    // send identification
    log(`Send identification ... \n`, 'grey');

    socket.emit("identify", {
        name: "Ryo"
    });

    // Send a message every 1sec
    setInterval(() => {
        socket.emit('new-message', "Coucou");
    }, 1000);


    // Handle new message
    socket.on('message', (message) => {
        let date = DateTime.fromISO(message.date).toFormat("HH:mm:ss");
        log(`[${date}] : ${message.from}\n${message.message} \n`, "blue", 0, null, null, false);
    });

    // handle history
    socket.on('history', (messages) => {
        messages.map(message => {
            let date = DateTime.fromISO(message.date).toFormat("HH:mm:ss");
            log(`[${date}] : ${message.from}\n${message.message} \n`, "blue", 0, null, null, false);
        });
    });

    // When server is disconnected
    socket.on('disconnect', function(client) {
        log(`Server disconnected \n`, 'red');
    });
});