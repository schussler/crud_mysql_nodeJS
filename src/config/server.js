const express = require('express');
const app = express();

module.exports = {
  startServer() {
    app.listen(3001, () => {
      console.log(`Servidor Express rodando na porta ${3001}`);
    });
  }
}
// class Server {
//   constructor() {
//     this.app = express();
//     this.port = process.env.PORT || 3000
//   }

//   configureMiddleware() {
//     // Adicione middlewares aqui, se necessário
//     this.app.use(express.json());
//     this.app.use(express.urlencoded({ extended: true }));
//   }

//   start() {
//     this.configureMiddleware();
//     this.app.listen(this.port, () => {
//       console.log(`Servidor rodando na porta ${this.port}`);
//     });
//   }
// }

// module.exports = Server;