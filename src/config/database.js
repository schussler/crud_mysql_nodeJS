const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crudSimples', 'root', '8501', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  sequelize.authenticate();
  console.log('Conexao com o banco de dados feita com sucesso');
} catch (error) {
  console.error('Erro ao conectar com o banco de dados: ', error);
}

module.exports = sequelize