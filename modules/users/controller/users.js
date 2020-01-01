const userDao = require('../dao/users');

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
        userDao
            .updateUser(query, req.body)
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
                        transcation_id: req.body.order.transcation_id,
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
                    console.log(result, "user");
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
    }

};

module.exports = userController;