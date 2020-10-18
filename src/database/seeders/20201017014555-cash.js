'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('cash', 
    [
      {
        amount: '0,00',
        created_at: new Date(),
        updated_at: new Date()
      },
    ]),

  down: (queryInterface) => queryInterface.bulkDelete('cash', null, {}),
};
