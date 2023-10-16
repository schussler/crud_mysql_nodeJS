const express = require('express');
var cors = require('cors')

const gamesController = require('./src/controllers/gamesController')
// const server = new Server();
const app = express();
app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// rotas
app.get('/', gamesController.index);
app.get('/games', gamesController.show);
app.get('/games/:id', gamesController.showOne);
app.post('/games', gamesController.insert);
app.put('/games/:id', gamesController.update);
app.delete('/games/:id', gamesController.delete);

//incia servidor e gerencia middlewares
app.listen(3000, () => {
  console.log(`Servidor Express rodando na porta ${3000}`);
});

