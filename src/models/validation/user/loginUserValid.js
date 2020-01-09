const Joi = require('joi');

module.exports = Joi.object().keys({
    password: Joi.string()
        .regex(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*/)
        .required(),
    email: Joi.string()
        .email({minDomainAtoms: 2})
        .required()
});
