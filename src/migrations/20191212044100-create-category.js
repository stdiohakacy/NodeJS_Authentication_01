'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('category', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING
                // allowNull: false
            },
            createdAt: {
                // allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                // allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                // allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('category');
    }
};
