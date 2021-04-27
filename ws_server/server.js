// Import libraries
const server       = require('http').createServer();
const io           = require('socket.io')(server);
const { DateTime } = require('luxon');
const { log }      = require('@ryosensei/console');

// Import config
const Config = require('./config.json');

const VERSION = "0.1";

const startServer = async () => {
    log(`Start Server version ${VERSION}\n`, 'white', 0);

    // default port 
    let port = Config.websocket.port;
    // start listenning
    server.listen(port);

    log(`Server v${VERSION} started @${port} \n`, 'green');


    let userConnected = [];
    let clients       = [];
    let messages      = [];

    // New client connected
    io.on('connection', function(client) {
        log(`Client connected \n`);

        // Must be identified
        client.on(`identify`, (params) => {
            let date = DateTime.now();
            userConnected.push({
                name: params.name,
                connectedAt: date.toSeconds()
            });
            client.name = params.name;
            clients[client.id] = client;
            log(`${params.name} logged-in at ${date.toFormat('yyyy-MM-dd HH:mm:ss')} \n`, "blue");

            // When identified, send the last {config.history} messages
            client.emit("history", messages);
        });

        // Handle new message sent
        client.on('new-message', (message) => {
            log(`New message received \n`, 'grey', 2);
            let from = client.name;
            let newMessage = {
                from: from,
                message: message,
                date: DateTime.now()
            };
            messages.push(newMessage);

            // keep only {Config.history} last messages
            messages.slice(Config.history / -1);

            // Send new message to connected clients
            for (let i in clients) {
                client.emit("message", newMessage);
            }
        });

        // Client disconnected
        client.on('disconnect', function() {
            log(`${client.name} disconnected \n`, 'red');
            delete clients[client.id];

        });
    });
}

// Start server
startServer();