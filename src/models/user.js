'use strict';
const bcrypt = require('bcrypt');
const ErrorMessage = require('../config/errorMessage');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 50],
                    msg: new ErrorMessage(6, 50).ERR_301
                },
                notEmpty: {
                    agrs: true,
                    msg: new ErrorMessage('email').ERR_101
                },
                isEmail: {
                    agrs: true,
                    msg: new ErrorMessage('email').ERR_102
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 50],
                    msg: new ErrorMessage(6, 50).ERR_301
                },
                notEmpty: {
                    agrs: true,
                    msg: new ErrorMessage('email').ERR_101
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {

            }
        }
    }, {
        hooks: {
            beforeCreate: async (user, options) => {
                try {
                    let hash = await bcrypt.hash(user.password, 10).then(hash => {
                        return hash;
                    }).catch(error => {
                        throw new Error('Hash password ', error);
                    });
                    user.password = hash;
                }
                catch (error) {
                    throw new Error('Hash password ', error);
                }
            }
        },
        modelName: 'user',
        timestamps: true,
        paranoid: true,
        freezeTableName: true
    });

    User.prototype.isValidPassword = function(password) {
        return bcrypt.compare(password, this.password);
    };

    User.associate = function(models) {
    };
    return User;
};
