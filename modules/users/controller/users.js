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
    }

};

module.exports = userController;