const express = require('express');
const engine = require('ejs-mate');
const socketIO = require('socket.io');
const http = require('http');

// Initializations
const app = express();

const port = 5500;

const server = http.createServer(app);
const io = socketIO(server);

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // so you can render('index')

// routes
app.use(require('./routes/index'));

// sockets
require('./sockets')(io);

// static files
app.use(express.static(__dirname + '/public'));

// Starting the server
server.listen(`${port}`, () => {
    console.log(`Servidor en el puerto ${port}`);
})
