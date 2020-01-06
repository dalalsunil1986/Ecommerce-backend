const productModel = require('../models/products');

const productDao = {
    getOneProduct: (query) => {
        return new Promise((resolve, reject) => {
            productModel
                .findOne(query)
                .populate('category')
                .exec(function (err, product) {
                    if (err || !product) {
                        return reject({status: 400, success: false, err});
                    } else {
                        return resolve({product});
                    }
                });
        });
    },
    getAllProducts: (query) => {
        return new Promise((resolve, reject) => {
            productModel
                .find()
                .select("-photo")
                .populate('category')
                .sort([
                    [query.sortBy, query.order]
                ])
                .limit(query.limit)
                .exec((err, products) => {
                    if (err || !products) {
                        return reject({error: "Products Not Found!!!"});
                    }
                    return resolve({products});
                });
        });
    }
};

module.exports = productDao;