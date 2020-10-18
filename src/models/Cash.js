const { Model, DataTypes } = require('sequelize');

class Cash extends Model {
  static init(sequelize) {
    super.init({
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize
    })
  }
}

module.exports = Cash;