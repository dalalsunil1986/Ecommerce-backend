const userModel = require('../../auth/model/users');

const userDao = {
    getOneUser: (query) => {
        return new Promise((resolve, reject) => {
            userModel
                .findOne(query, function (err, user) {
                    if (err || !user) {
                        return reject({
                            status: 400,
                            success: false,
                            message: err
                        });
                    } else {
                        return resolve({
                            success: true,
                            message: 'Successfully retrieved user',
                            user
                        });
                    }
                });
        });
    }
};

module.exports = userDao;