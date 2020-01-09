const models = require('../models');
const Joi = require('joi');
const JSONResponse = require('../config/jsonResponse');
const HTTPStatusCode = require('../config/httpStatusCode');
const ErrorMessage = require('../config/errorMessage');
const DataHelper = require('../helper/dataHelper');
const RegisterUserValid = require('../models/validation/user/registerUserValid');
const LoginUserValid = require('../models/validation/user/loginUserValid');
const UserDist = require('../models/filter/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
// const path = require('path');
// const fs = require('fs');
// const multer = require('multer');
const minioClient = require('../services/FileServices/minio');
require('dotenv').config();

module.exports.login = (request, response, next) => {
    const userInfo = request.body;
    Joi.validate(userInfo, LoginUserValid, (error, value) => {
        if (DataHelper.isEmpty(userInfo))
            return response.send(new JSONResponse(new HTTPStatusCode()._400, 400, {message: new ErrorMessage().ERR_001}, null));

        else if (error)
            return response.send(new JSONResponse(new HTTPStatusCode()._400, 400, error.details, null));
        else {
            passport.authenticate('login', (error, user, info) => {
                if (error)
                    return next(error);

                if (!user)
                    return response.send(info);

                request.login(user, (error) => {
                    if (error)
                        return next(error);
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        user
                    }, String(process.env.JWT_SECRET));
                    return response.send(new JSONResponse(new HTTPStatusCode()._200, 200, null, {token}));
                });
            })(request, response, next);
        }
    });
};

module.exports.register = (request, response, next) => {
    const userInfo = request.body;

    Joi.validate(userInfo, RegisterUserValid, (error, value) => {
        if (DataHelper.isEmpty(userInfo))
            return response.send(new JSONResponse(new HTTPStatusCode()._400, 400, {message: new ErrorMessage().ERR_001}, null));

        else if (error)
            return response.send(new JSONResponse(new HTTPStatusCode()._400, 400, error.details, null));
        else {
            passport.authenticate('register', (error, valid, info) => {
                if (error)
                    return next(error);
                if (valid) {
                    models.user.create(userInfo).then(userRes => {
                        request.login(userRes, (error) => {
                            if (error)
                                return next(error);
                            const token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                userRes
                            }, String(process.env.JWT_SECRET));
                            return response.send(new JSONResponse(new HTTPStatusCode()._200, 200, null, {token}));
                        });
                    });
                }
                else
                    return response.send(info);
            })(request, response, next);
        }
    });
};

module.exports.profile = (request, response) => {
    const user = request.user;
    if (user) {
        user.dataValues = DataHelper.filterModel(user.dataValues, UserDist.PROFILE);
        return response.send(new JSONResponse(new HTTPStatusCode()._200, 200, null, user));
    }
    else
        return response.send(new JSONResponse(new HTTPStatusCode()._401, 401, new ErrorMessage().ERR_002, null));
};

module.exports.logout = (request, response) => {
    request.logout();
    return response.send(new JSONResponse(new HTTPStatusCode()._200, 200, null, true));
};


module.exports.uploadAvatar = (request, response) => {
    const id = request.body.userId;
    // const id = 5;
    // let dir = path.join(__dirname, `../public/user/${id}`);
    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir);
    //     dir = path.join(dir, 'upload');
    //     fs.mkdirSync(dir);
    // }

    minioClient.bucketExists('user', (err, exists) => {
        if (err)
            console.log(err);
        if (exists) {
            minioClient.putObject('user', `${id}/avatar/${request.file.originalname}`, request.file.buffer, (error, etag) => {
                if (error)
                    return response.send(new JSONResponse(new HTTPStatusCode()._500, 500, new ErrorMessage('bucket').ERR_002, null));
                response.send(new JSONResponse(new HTTPStatusCode()._200, 200, null, true));
            });
        }
    });
};

module.exports.GoogleCallback = (request, response) => {
    // const user = request.user;
    // request.login(user, () => {
    //     const token = jwt.sign({
    //         exp: Math.floor(Date.now() / 1000) + (60 * 60),
    //         user
    //     }, String(process.env.JWT_SECRET));
    //     return response.send(new JSONResponse(new HTTPStatusCode()._200, 200, null, {token}));
    // });
    response.redirect(`${process.env.SHOPEE_FRONTEND_FREFIX}/user/profile`);
};
