module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New User connected');

        socket.on('coordenadasUsuario', coords => {
            console.log(coords);
            socket.broadcast.emit('newUserCoordinates', coords);
        });
    });
}