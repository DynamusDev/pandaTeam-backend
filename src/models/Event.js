const { Model, DataTypes } = require('sequelize');

class Event extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount_spent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tax_coupon_one: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      tax_coupon_two: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      tax_coupon_three: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      tax_coupon_four: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
      tax_coupon_five: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
      },
    }, {
      sequelize
    })
  }
}

module.exports = Event;