const productModel = require('../models/products');
const {errorHandler} = require('../../helpers/dbErrorHandler');

const productController = {
    createProduct: (req, res, next) => {
        const product = new productModel();
        product.save((err, product) => {
            if (err) {
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
            return res
                .status(200)
                .json({product});
        })
    }
};

module.exports = productController;