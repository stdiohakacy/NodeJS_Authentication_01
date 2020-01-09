'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UserGGAuth', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            id_gg: Sequelize.STRING,
            displayName: Sequelize.STRING,
            image: Sequelize.STRING,
            provider: Sequelize.STRING,
            locale: Sequelize.STRING,
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            deletedAt: {
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('UserGGAuth');
    }
};
