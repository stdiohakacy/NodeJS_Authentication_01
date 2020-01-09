module.exports = function(params1, params2, params3) {
    return {
        ERR_001: 'Data is invalid!',
        ERR_002: 'Access is denied!',
        ERR_003: 'The data cannot save!',

        ERR_101: `${params1} is required!`,
        ERR_102: `The ${params1} is invalid!`,
        ERR_103: `The ${params1} is incorrect!`,
        ERR_104: `The ${params1} is not exists!`,
        ERR_105: `The ${params1} is already existed!`,
        ERR_106: `The ${params1} is expired!`,

        ERR_201: `The ${params1} must be at least ${params2} characters!`,
        ERR_202: `The ${params1} must be a maximum of ${params2} characters!`,
        ERR_203: `The ${params1} must be less than or equal to ${params2}!`,
        ERR_204: `The ${params1} must be greater than or equal to ${params2}!`,
        ERR_205: `Invalid or unsupported ${params1} format! The following formats are supported: ${params2}`,

        ERR_301: `The ${params1} must be at least ${params2} and maximum ${params3} characters!`,
        ERR_302: `The ${params1} must be at least ${params2} characters ${params3}!`,
        ERR_303: `The ${params1} must be between ${params2} and ${params3}!`,
        ERR_304: `The ${params1} must be a maximum of ${params2} ${params3}!`
    };
};
