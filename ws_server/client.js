// Test client
const io           = require('socket.io-client');
const { log, dd }  = require('@ryosensei/console');
const { DateTime } = require('luxon');

// var socket         = io("ws://163.172.149.194:3001");
var socket         = io("ws://localhost:3001");

let username = process.argv[2];

// On connect
socket.on('connect', function(client) {
    log(`Connected to server \n`, 'green');

    // send identification
    log(`Send identification ... \n`, 'grey');

    socket.emit("identify", {
        name: username
    });

    // Send a message every 1sec
    // setInterval(() => {
    //     socket.emit('new-message', "Coucou");
    // }, 1000);


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

    socket.on('user-connected', user => {
        log(`New user connected : ${user} \n`, 'green');
    });
    socket.on('online-users', users => {
        log(`User onlines : \n`);
        users.map(user => {
            log(`\t${user.name} \n`, 'green');
        })
    });

    // When server is disconnected
    socket.on('disconnect', function(client) {
        log(`Server disconnected \n`, 'red');
    });
});