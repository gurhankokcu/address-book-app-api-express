'use strict'

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'contact'
  })
}
