'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            isComplete: {
                type: Sequelize.BOOLEAN
            },
           
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Tasks');
    }
};