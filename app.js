const express = require('express');
const jwt = require('jsonwebtoken');
var cors = require('cors')
const User = require("./src/models/users")

const gamesController = require('./src/controllers/gamesController')
const userController = require('./src/controllers/userController')
// const server = new Server();
const app = express();
app.use(cors())

const JWTsecret = "kskskskskkskskskskskksksksksksk"

//|> middleware refatorar
function auth(req, res, next) {
  const authToken = req.headers['authorization'];
  if (authToken != undefined) {
    const bearer = authToken.split(' ');
    let token = bearer[1];

    jwt.verify(token, JWTsecret, (err, data) => {
      if (err) {
        res.status(401).json({ err: "token invalid" })
      } else {
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email }
        next();
      }
    })
  } else {
    res.status(401).json({ err: "token invalida" })
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// |> login
app.post('/login', (req, res) => {
  let { email, password } = req.body;
  if (email != undefined) {
    User.findOne({ where: { email: email } }).then((user) => {
      if (!user) {
        res.status(404).json({ err: "user not found" })
      } else {
        if (password == user.password) {
          jwt.sign({ id: user.id, email: user.email }, JWTsecret, { expiresIn: '48h' }, (err, token) => {
            if (err) {
              res.status(400).json({ err: err })
            } else {
              res.status(200).json({ token: token })

            }
          })
        } else {
          res.status(401).json({ err: "credencial invalid" })
        }
      }
    })
  } else {
    res.status(400).json({ err: "O email enviado é INVALIDO" })
  }

});
// rotas
app.get('/', gamesController.index);
app.get('/games', auth, gamesController.show);
app.get('/games/:id', gamesController.showOne);
app.post('/games', gamesController.insert);
app.put('/games/:id', gamesController.update);
app.delete('/games/:id', gamesController.delete);

// |> users

app.post('/users', userController.insertUser)



//incia servidor e gerencia middlewares
app.listen(3000, () => {
  console.log(`Servidor Express rodando na porta ${3000}`);
});

