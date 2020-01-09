const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer().required(),
    name: Joi.string().required()
});
