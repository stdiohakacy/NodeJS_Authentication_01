const models = require('../models');
const Joi = require('joi');
const DeleteCategoryValid = require('../models/validation/category/deleteCategoryValid');
const GetCategoryValid = require('../models/validation/category/getCategoryValid');
const PostCategoryValid = require('../models/validation/category/postCategoryValid');
const PutCategoryValid = require('../models/validation/category/putCategoryValid');
const JSONResponse = require('../config/jsonResponse');
const HTTPStatusCode = require('../config/httpStatusCode');
const ErrorMessage = require('../config/errorMessage');
const DataHelper = require('../helper/dataHelper');
// const CategoryFilter = require('../models/filter/category');


module.exports.findByPK = (request, response) => {
    let id = request.params.id;
    Joi.validate({id}, GetCategoryValid, (error, value) => {
        if (error)
            return response.send(new JSONResponse(new HTTPStatusCode()._400, 400, error.details, null));
        else {
            models.category.findByPk(id).then(category => {
                return response.send(new JSONResponse(new HTTPStatusCode()._200, 200, null, category));
            }).catch(err => {
                throw new Error(err);
            });
        }
    });
};

module.exports.findAll = (request, response) => {
    models.category.findAll({
        where: {
            deletedAt: null
        }
    }).then(categories => {
        // categories = DataHelper.filterModel(JSON.stringify(categories), CategoryFilter.LIST);
        return response.send(new JSONResponse(new HTTPStatusCode()._200, 200, null, categories));
    }).catch(err => {
        throw new Error(err);
    });
};

module.exports.create = (request, response) => {
    try {
        let category = request.body;
        Joi.validate(category, PostCategoryValid, (error, value) => {
            if (DataHelper.isEmpty(category))
                return response.send(new JSONResponse(new HTTPStatusCode()._400, 400, {message: new ErrorMessage().ERR_001}, null));

            else if (error)
                return response.send(new JSONResponse(new HTTPStatusCode()._400, 400, error.details, null));
            else {
                models.category.create(category)
                    .then(() => models.category.findOrCreate({where: category}))
                    .then(([category, created]) => {
                        response.json(category);
                    }).catch((err) => {
                        throw new Error(err);
                    });
            }
        });
    }
    catch (error) {
        throw new Error(error);
    }
};

module.exports.update = (request, response) => {
    try {
        let category = request.body;
        category.id = request.params.id;
        Joi.validate(category, PutCategoryValid, (error, value) => {
            if (DataHelper.isEmpty(category))
                return response.send(new JSONResponse(new HTTPStatusCode()._400, 400, {message: new ErrorMessage().ERR_001}, null));

            else if (error)
                return response.send(new JSONResponse(new HTTPStatusCode()._400, 400, error.details, null));
            else {
                models.category.update(category, {
                    where: {id: category.id}
                }).then(result => {
                    if (result) {
                        models.category.findByPk(category.id).then(category => {
                            response.json(category);
                        });
                    }
                }).catch(error => {
                    throw new Error(error);
                });
            }
        });
    }
    catch (error) {
        throw new Error(error);
    }
};


module.exports.delete = (request, response) => {
    let id = request.params.id;
    Joi.validate({id}, DeleteCategoryValid, (error, value) => {
        if (error)
            return response.send(new JSONResponse(new HTTPStatusCode()._400, 400, error.details, null));
        else {
            models.category.update({deletedAt: Date.now()}, {
                where: {id}
            }).then(() => {
                console.log('OK');
            }).catch(error => {
                throw new Error(error);
            });
        }
    });
};
