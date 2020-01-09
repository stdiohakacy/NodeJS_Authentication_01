'use strict';

module.exports = (sequelize, DataTypes) => {
    const UserGGAuth = sequelize.define('UserGGAuth', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_gg: {
            type: DataTypes.STRING
        },
        displayName: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        provider: {
            type: DataTypes.STRING
        },
        locale: {
            type: DataTypes.STRING
        }
    }, {
        modelName: 'UserGGAuth',
        timestamps: true,
        paranoid: true,
        freezeTableName: true
    });

    UserGGAuth.associate = function(models) {
    };
    return UserGGAuth;
};
