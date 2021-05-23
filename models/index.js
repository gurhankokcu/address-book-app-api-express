'use strict'

const config = require('config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.get('database.database'), config.get('database.username'), config.get('database.password'), config.get('database.options'))

const Contact = require('./contact')(sequelize, Sequelize.DataTypes)

module.exports = {
  sequelize,
  Sequelize,
  Contact
}
