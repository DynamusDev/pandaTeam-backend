'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'notification_token', { type: Sequelize.TEXT('long'), allowNull: true});
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'notification_token');
  }
};
