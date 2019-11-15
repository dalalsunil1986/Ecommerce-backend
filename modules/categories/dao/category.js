const categoryModel = require('../models/categories');
const {errorHandler} = require('../../helpers/dbErrorHandler');

const categoryDao = {
    findCategoryById: (query) => {
        return new Promise((resolve, reject) => {
            categoryModel
                .findOne(query, function (err, category) {
                    if (err || !category) {
                        return reject({err});
                    } else {
                        return resolve({category});
                    }
                });
        });
    }
};

module.exports = categoryDao;