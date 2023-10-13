const Game = require('../models/games');
const formatarValorMonetario = require('../functions/formatarValorMonetario');
module.exports = {

  // soma valores
  async index(req, res) {
    {
      Game.sum('price')
        .then((totalValor) => {
          // Formate o valor antes de enviar para o cliente
          const totalValorFormatado = formatarValorMonetario(totalValor);

          res.json({ 'o valor total de jogos:': totalValorFormatado });
        })
        .catch((err) => {
          console.error('Erro ao calcular o total de valor dos jogos:', err);
          res.status(500).send('Erro ao calcular o total de valor dos jogos');
        });
    }
  },
  // exibe todos
  async show(req, res) {
    Game.findAll({ raw: true }).then((games) => {
      res.status(200).send(games)
    }).catch((err) => {
      res.status(400).send(`Erro ao carregar: ${err}`)
    });
  },
  // exibe um
  async showOne(req, res) {
    if (isNaN(req.params.id)) {
      res.status(400).send('O parametro deve ser um numero')
    } else {
      const id = parseInt(req.params.id)
      Game.findOne({ where: { id: id } }).then((game) => {

        if (!game) {
          res.status(400).send('Id nao encontrado')
        } else {
          res.status(200).send(game)
        }

      }).catch((err) => {
        res.status(400).send(`Erro interno: ${err}`)
      })
    }
  },
  // insere dados
  async insert(req, res) {
    let { name, price } = req.body;

    if (name == undefined && price == undefined) {
      res.sendStatus(400)
    } else {
      Game.create({
        name: name,
        price: price
      }).then(() => {
        res.sendStatus(201)
      }).catch((err) => {
        res.sendStatus(400).json({
          "erro": `${err}`
        })
      })
    }
  },
  //
  async update(req, res) {
    if (isNaN(req.params.id)) {

      res.status(400).send('O parametro nao é um numero');

    } else {

      const id = parseInt(req.params.id);

      Game.findOne({ where: { id: id } }).then((game) => {
        if (!game) {
          res.status(404).send('Id nao encontrado');
        } else {
          // console.log(game);

          const { name, price } = req.body;
          const updates = {}
          if (name !== undefined) {
            updates.name = name;
          }
          if (price !== undefined) {
            updates.price = price;
          }

          Game.update(updates, { where: { id: id } }).then(() => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error('Erro ao atualizar o registro:', err);
            res.sendStatus(500);
          })
        }
      }).catch((err) => {
        console.error('Erro ao buscar o registro:', err);
        res.sendStatus(500);
      })
    }

  },
  async delete(req, res) {
    // validando se o paramentro é um numero ou nao
    if (isNaN(req.params.id)) {
      res.status(400).send('O parametro precisa ser um numero')
    } else {
      //converti o id passado na url em numero inteiro(pela url vem por string)
      const id = parseInt(req.params.id);
      //preciso validar se existe esse id no banco de dados
      Game.findOne({ where: { id: id } }).then((game) => {
        if (!game) {
          res.status(404).send('Id nao encontrado')
        } else {
          game.destroy().then(() => {
            res.sendStatus(200)
          }).catch((err) => {
            res.status(500).send(`Erro ao exluir o registro: ${err}`)
          })
        }
      })

    }
  }
}