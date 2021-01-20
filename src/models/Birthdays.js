const { Model, DataTypes } = require('sequelize');

class Birthdays extends Model {
  static init(sequelize) {
    super.init({
      user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize
    })
  }
}

module.exports = Birthdays;