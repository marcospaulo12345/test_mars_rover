'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('log_directions', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      rover_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'rovers', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      position_x: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      position_y: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      direction_cardinal_compass: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('log_directions');
  }
};
