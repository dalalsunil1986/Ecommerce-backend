const bcrypt = require('bcrypt');

const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hashpassword) {
            if (hashpassword) {
               return resolve(hashpassword);
            } else {
               return reject({
                    success: false,
                    status: 500,
                    message: 'Error in processing Query'
                });
            }
        });
    });
};

module.exports = encryptPassword;