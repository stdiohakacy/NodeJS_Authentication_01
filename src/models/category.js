'use strict';
const ErrorMessage = require('../config/errorMessage');

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
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
        }
    },
    {
        hooks: {
            beforeUpdate: async (category, options) => {
                category.updatedAt = Date.now();
            },
            beforeDestroy: async (category, options) => {
                category.deletedAt = Date.now();
            }
        },
        modelName: 'category',
        timestamps: true,
        paranoid: true,
        freezeTableName: true
    });

    Category.associate = function(models) {

    };

    return Category;
};
