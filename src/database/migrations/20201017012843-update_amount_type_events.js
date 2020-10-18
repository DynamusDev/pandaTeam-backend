'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		queryInterface.changeColumn('events', 'amount_spent', {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.removeColumn('events', 'identification');
	},
};
