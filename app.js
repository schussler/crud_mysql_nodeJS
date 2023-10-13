const express = require('express');
const gamesController = require('./src/controllers/gamesController')
const Server = require('./src/config/server')
const server = new Server();
const app = express();

// rotas
app.get('/', gamesController.index);
app.get('/games', gamesController.show);
app.get('/games/:id', gamesController.showOne);
app.post('/games', gamesController.insert);
app.put('/games/:id', gamesController.update);
app.delete('/games/:id', gamesController.delete);

// incia servidor e gerencia middlewares
server.start();

