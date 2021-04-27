const server       = require('http').createServer();
const io           = require('socket.io')(server);
const { DateTime } = require('luxon');
const { log, dd }  = require('@ryosensei/console');

const Config = require('./config.json');
const VERSION = "0.1";

const startServer = async () => {
    log(`Start Server \n`, 'white', 2);

    let port = Config.websocket.port;
    server.listen(port);
    log(`Server v${VERSION} started @${port} \n`, 'green');

    let userConnected = [];
    let clients       = [];
    let messages      = [];

    io.on('connection', function(client) {
        log(`Client connected \n`);
    
        client.on(`identify`, (params) => {
            let date = DateTime.now();
            userConnected.push({
                name: params.name,
                connectedAt: date.toSeconds()
            });
            client.name = params.name;
            clients[client.id] = client;
            log(`${params.name} logged-in at ${date.toFormat('yyyy-MM-dd HH:mm:ss')} \n`, "blue");
            client.emit("history", messages);

        });

        client.on('new-message', (message) => {
            log(`New message received \n`, 'grey', 2);
            let from = client.name;
            let newMessage = {
                from: from,
                message: message,
                date: DateTime.now()
            };

            messages.push(newMessage);
            messages.slice(Config.history / -1);
            for (let i in clients) {
                client.emit("message", newMessage);
            }
        });

        client.on('disconnect', function() {
            log(`${client.name} disconnected \n`, 'red');
            delete clients[client.id];

        });
    });
}

startServer();