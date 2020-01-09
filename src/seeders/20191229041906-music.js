'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('music', [{
            name: 'Dung ai nhac ve anh ay',
            singer: 'Tra My Idol',
            totalTime: 360,
            image: '',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('music', null, {});
    }
};
