const Sequelize = require('sequelize')
const config = require('./../config')

const Department = config.define('department', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { timestamps: false })

module.exports = Department
