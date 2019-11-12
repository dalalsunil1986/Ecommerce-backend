const userModel = require('../model/users');
const {errorHandler} = require('../../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken'); // to generate signin token
const expressJwt = require('express-jwt');
const createToken = require('../../helpers/token.util')
const encryptPassword = require('../../helpers/encryption');

const userController = {
    signup: (req, res, next) => {
        encryptPassword(req.body.password).then((hashedpassword) => {
            const userObj = {
                email: req.body.email,
                name: req.body.name,
                role: req.body.role,
                password: hashedpassword
            };
            const user = new userModel(userObj);
            user.save((err, user) => {
                if (err) {
                    return res
                        .status(400)
                        .json({error: errorHandler(err)});
                } else {
                    user.password = undefined;
                    return res
                        .status(200)
                        .json(user);
                }
            });
        })
    },
    signin: (req, res, next) => {
        const {email, password} = req.body;
        userModel.findOne({
            email
        }, (err, user) => {
            if (err || !user) {
                return res
                    .status(400)
                    .json({message: "User doesnot exist!!! Please signup first!!!"});
            }
            // create authentication authenticate the user now...



            //Sending the user here...
            const newObj = {
                id: user._id,
                email: user.email
            };
            const newToken = createToken(newObj);
            res.cookie('token', newToken, {
                expire: new Date() + 9999
            });
            const {_id, email, role} = user;
            return res.json({
                token,
                user: {
                    _id,
                    email,
                    role
                }
            });
        });
    }

};

module.exports = userController;