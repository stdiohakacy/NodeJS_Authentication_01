const Joi = require('joi');

module.exports = Joi.object().keys({
    password: Joi.string()
        .required()
        .regex(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*/),
    email: Joi.string()
        .email({minDomainAtoms: 2})
        .required(),
    name: Joi.string()
        .max(20)
        .min(6)
        .required()
});
