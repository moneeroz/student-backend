const Sequelize = require('sequelize')
const config = require('./../config')

// Creating a Student model
const Student = config.define('student', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true
  },
  dept_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, { timestamps: false })

module.exports = Student // Exports the Student model
