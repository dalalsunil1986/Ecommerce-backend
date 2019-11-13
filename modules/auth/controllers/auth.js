const userModel = require('../model/users');
const {errorHandler} = require('../../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken'); // to generate signin token
const expressJwt = require('express-jwt');
const createToken = require('../../helpers/token.util')
const validator = require('../../helpers/encryption');

const authController = {
    signup: (req, res, next) => {
        validator
            .encryptPassword(req.body.password)
            .then((hashedpassword) => {
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
            validator
                .validatePassword(password, user)
                .then((result) => {
                    if (result) {
                        //Sending the user here...
                        const newObj = {
                            id: user._id,
                            email: user.email
                        };
                        const token = createToken(newObj);
                        res.cookie('token', token, {
                            expire: new Date() + 9999
                        });
                        const {_id, email, role, name} = user;
                        return res.json({
                            token,
                            user: {
                                _id,
                                email,
                                role,
                                name
                            }
                        });
                    }
                })
                .catch(err => res.status(401).json(err));

        });
    },
    signout: (req, res) => {
        res.clearCookie('token');
        res
            .status(200)
            .json({message: "Signout Successfull"});
    },

    //protecting routes method using express-jwt
    requireSignin: expressJwt({secret: process.env.JWT_SECRET, userProperty: 'auth'}),

    isAuth: (req, res, next) => {
        let user = req.profile && req.auth && req.profile._id == req.auth.user.id;
        if (!user) {
            return res
                .status(403)
                .json({error: 'Access Denied'});
        }
        next();
    },
    isAdmin: (req, res, next) => {
        if (req.profile.role === 0) {
            res
                .status(403)
                .json({error: 'User not Authorised'});
        }
        next();
    }

};

module.exports = authController;