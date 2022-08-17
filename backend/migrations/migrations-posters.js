'use strict';


module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posters', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            postid: {
              type: Sequelize.STRING
            },
            userpostid: {
              type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Posters');
    },
};
