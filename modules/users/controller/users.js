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
    }

};

module.exports = userController;