# Chat server

## First : identify

```
socket.emit("identify", {
    name: "Ryo"
});
```

## Handle messages history

```
socket.on('history', (messages) => {

});

// messages : 
[{
    from: "user",
    message: "Message 2",
    date: '2021-04-27T14:11:55.585+02:00'
}, {
    from: "user2",
    message: "Message 2",
    date: '2021-04-27T14:12:55.585+02:00'
}, (...)]
```

## User onlines

This is sent when the user first connect : 

```
socket.on('online-users', users => {
    log(`User onlines : \n`);
    users.map(user => {
        log(`\t${user.name} \n`, 'green');
    })
});

Result : 

[ { name: 'user1', connectedAt: 1619527619.847 }, { name: 'user2', connectedAt: 1619527619.847 } ... ]

```

## New user connect 

```
socket.on('user-connected', user => {
    log(`New user connected : ${user} \n`, 'green');
});


```

## Send new message

```
socket.emit('new-message', "Hello World");
```

## Receive new message

```
socket.on('message', (message) => {
});

message : 
{
    from: "user",
    message: "Message 2",
    date: '2021-04-27T14:11:55.585+02:00'
}
```
