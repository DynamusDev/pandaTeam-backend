'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('events', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount_spent: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // store belongsTo User 1:1
          model: 'users',
          key: 'id'
        }
      },
      tax_coupon_one: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      tax_coupon_two: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      tax_coupon_three: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      tax_coupon_four: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      tax_coupon_five: {
        type: Sequelize.TEXT('long'),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('events');
  }
};
