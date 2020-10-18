const { Model, DataTypes } = require('sequelize');

class Entrys extends Model {
  static init(sequelize) {
    super.init({
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize
    })
  }
}

module.exports = Entrys;