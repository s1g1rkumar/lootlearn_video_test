require('dotenv').config();
const cors = require('cors');
const path = require('path');

// enable cors
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
app.options(
    '*',
    cors({
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
    })
);


app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});



const io = require('socket.io').listen(server);
const listener = server.listen(process.env.PORT || 9000, function () {
    console.log('Listening on', listener.address().port);
});

require('./socket')(io, './../recordings/');
