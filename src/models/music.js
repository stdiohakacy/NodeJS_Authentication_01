'use strict';
const ErrorMessage = require('../config/errorMessage');

module.exports = (sequelize, DataTypes) => {
    // const Music = sequelize.define('Music', {
    //     name: DataTypes.STRING

    // }, {});
    // Music.associate = function(models) {
    // // associations can be defined here
    // };
    // return Music;

    const Music = sequelize.define('music', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    agrs: true,
                    msg: new ErrorMessage('name').ERR_101
                }
            }
        },
        singer: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    agrs: true,
                    msg: new ErrorMessage('singer').ERR_101
                }
            }
        },
        totalTime: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    agrs: true,
                    msg: new ErrorMessage('totalTime').ERR_101
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    agrs: true,
                    msg: new ErrorMessage('image').ERR_101
                }
            }
        }
    },
    {
        hooks: {
            beforeUpdate: async (music, options) => {
                music.updatedAt = Date.now();
            },
            beforeDestroy: async (music, options) => {
                music.deletedAt = Date.now();
            }
        },
        modelName: 'music',
        timestamps: true,
        paranoid: true,
        freezeTableName: true
    });

    Music.associate = function(models) {

    };

    return Music;
};
