'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('birthdays', 'created_at', { type: Sequelize.DATE , allowNull: true});
    queryInterface.addColumn('birthdays', "updated_at", { type: Sequelize.DATE, allowNull: true});
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('birthdays', 'created_at');
    queryInterface.removeColumn('birthdays', 'updated_at');
  }
};
