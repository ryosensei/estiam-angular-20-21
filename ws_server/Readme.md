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