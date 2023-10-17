const { Sequelize } = require('sequelize');
const database = require('../config/database');

const Game = database.define('Game', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
});
database.sync({ alter: true });

module.exports = Game;