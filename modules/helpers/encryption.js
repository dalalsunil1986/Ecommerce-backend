const bcrypt = require('bcrypt');

const helperValidator = {
    encryptPassword: (password) => {
        return new Promise((resolve, reject) => {
            bcrypt
                .hash(password, 10, function (err, hashpassword) {
                    if (hashpassword) {
                        return resolve(hashpassword);
                    } else {
                        return reject({success: false, status: 500, message: 'Error in processing Query'});
                    }
                });
        });
    },
    validatePassword: (password, user) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err || !result) {
                    return reject({
                        status: 401,
                        success: false,
                        message: 'Password doesnot match'
                    });
                }
                return resolve(result);
            })
        });
    }
}

module.exports = helperValidator;