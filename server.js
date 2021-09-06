require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoDB = require('./src/databases/mongodb/index');
const socketIO = require('socket.io');
const shared = require('./src/shared');
const MessageController = require('./src/controllers/MessageController');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = require('http').createServer(app);

app.use('/uploads', express.static(process.cwd() + '/uploads'));
app.use('/', require('./src/routes'));


server.listen('8081', () => {
    console.log("Listening on port 8081");
    mongoDB.connect();
});