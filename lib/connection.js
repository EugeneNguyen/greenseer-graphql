const Sequelize = require('sequelize');

const connection = (env) => {

  const { database, username, password, host } = env;

  const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql'
  });

  return sequelize;
}

module.exports = {
  connection
}