const userModel = require('../../auth/model/users');

const userDao = {
    getOneUser: (query) => {
        return new Promise((resolve, reject) => {
            userModel
                .findOne(query, function (err, user) {
                    if (err || !user) {
                        return reject({error: "User not found!!!"});
                    } else {
                        return resolve({success: true, message: 'Successfully retrieved user', user});
                    }
                });
        });
    },
    updateUser: (query, userObj) => {
        return new Promise((resolve, reject) => {
            userModel.findOneAndUpdate(query, {
                $set: userObj
            }, {
                new: true
            }, (err, user) => {
                if (err) {
                    return reject({error: "You are not Authorised!!!"});
                }
                resolve(user);
            });
        });
    },
    updateUserHistory: (query, history) => {
        return new Promise((resolve, reject) => {
            userModel.findOneAndUpdate(query, {
                $push: {history: history}
            }, {
                new: true
            }, (err, user) => {
                if (err) {
                    return reject({error: "You are not Authorised!!!"});
                }
                resolve(user);
            });
        });
    },
    
};

module.exports = userDao;