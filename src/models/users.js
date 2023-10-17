const { Sequelize } = require('sequelize');
const database = require('../config/database');

const User = database.define('User', {
  user: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  eAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})
database.sync({ alter: true });
module.exports = User;
