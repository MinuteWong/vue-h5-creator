const Sequelize = require('sequelize')
const db_config = require('./db.config')

const sequelize = new Sequelize('h5_creator_test', db_config.user, db_config.password, {
  host: db_config.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
})

module.exports = sequelize
