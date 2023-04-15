const Sequelize = require('sequelize')
// creating a new instance of the Sequelize class that takes the following arguments : new Sequelize(database neme, username, password)
const config = new Sequelize('robogarden2023', 'root', '', { dialect: 'mariadb' })

module.exports = config
