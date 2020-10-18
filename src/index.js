const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketio = require('socket.io');

dotenv.config()
const routes = require('./routes');
require('./database/connection');

const app = express();

const server = require("http").createServer(app);

const io = socketio(server);

app.use((req, res, next)=>{
  req.io = io;

  return next();
})
app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(routes);

const port = process.env.PORT || 3333;

server.listen(port, () => console.log("server running on port: " + port)); //Porta que a API fica escutando
