const productModel = require('../models/products');

const productDao = {
    getOneProduct: (query) => {
        return new Promise((resolve, reject) => {
            productModel
                .findOne(query, function (err, product) {
                    if (err || !product) {
                        return reject({
                            status: 400,
                            success: false,
                            err
                        });
                    } else {
                        return resolve({
                            product
                        });
                    }
                });
        });
    }
};

module.exports = productDao;