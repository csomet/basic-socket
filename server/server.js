require('../config/config');
const express = require('express');
const path = require('path');
const app = express();
const socketIO = require('socket.io');
const http = require('http');


const publicPath = path.resolve(__dirname, '../public');

let server = http.createServer(app);

//Comunication form backend export to be used in other js
module.exports.io = socketIO(server);
require('./sockets/socket');


app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    
    if (err) throw new Error(err);

    console.log('Server listening to ' + process.env.PORT);
});


module.exports = app;