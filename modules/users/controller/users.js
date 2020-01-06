const userDao = require('../dao/users');
const validator = require('../../helpers/encryption.js');
const userController = {
    findUserById: (req, res, next, id) => {
        let query = {
            _id: id
        };
        userDao
            .getOneUser(query)
            .then((result) => {
                req.profile = result.user;
                next();
            })
            .catch((err) => {
                res
                    .status(400)
                    .json(err);
            });
    },
    readUser: (req, res, next) => {
        req.profile.password = undefined;
        return res.json(req.profile);
    },
    updateUser: (req, res, next) => {
        let query = {
            _id: req.profile._id
        };
        updateUserUtil(req).then((response) => {
            req.body.password = response;
            let user = {};
            if (response === undefined) {
                user = {
                    name: req.body.name,
                    email: req.body.email
                }
            } else {
                user = {
                    name: req.body.name,
                    email: req.body.email,
                    password: response
                }
            }
            userDao
                .updateUser(query, user)
                .then((result) => {
                    result.password = undefined;
                    return res
                        .status(200)
                        .json(result);
                })
                .catch((err) => {
                    res
                        .status(400)
                        .json(err);
                });
        }).catch((err) => {
            res
                .status(400)
                .json(err);
        });

    },
    addOrderToUserHistory: (req, res, next) => {
        let history = [];
        if (req.body.order.products) {
            req
                .body
                .order
                .products
                .forEach(item => {
                    history.push({
                        _id: item._id,
                        name: item.name,
                        description: item.description,
                        category: item.category,
                        quantity: item.count,
                        transaction_id: req.body.order.transaction_id,
                        amount: req.body.order.amount
                    });
                });
            let query = {
                _id: req.profile._id
            };
            userDao
                .updateUserHistory(query, history)
                .then((result) => {
                    result.password = undefined;
                    next();
                })
                .catch((err) => {
                    res
                        .status(400)
                        .json(err);
                });

        } else {
            return res
                .status(404)
                .json({message: "Products Not Recieved!!"});
        }
    },
    getOrders: (req, res, next) => {
        let orders = [];
        if (req.body.orders) {
            orders = req.body.orders;
            return res.json(orders);
        } else {
            return res
                .status(404)
                .json({message: "No!! Orders Placed"});
        }
    }
};
const updateUserUtil = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.password < 1) {
            return resolve(undefined);
        } else {
            validator
                .encryptPassword(req.body.password)
                .then((hashedpassword) => {
                    return resolve(hashedpassword);
                })
                .catch((err) => {
                    return reject({error: err});
                });
        }
    });
}

module.exports = userController;