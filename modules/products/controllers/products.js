const productModel = require('../models/products');
const {errorHandler} = require('../../helpers/dbErrorHandler');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

const productController = {
    createProduct: (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) {
                return res
                    .status(400)
                    .json({err: "Image Cannot be uploaded"});
            }
            const {
                name,
                description,
                shipping,
                price,
                quantity,
                category
            } = fields;
            if (!name || !description || !category || !price || !shipping || !quantity) {
                return res
                    .status(400)
                    .json({err: "All fields are required!!!!"});
            }
            const product = new productModel(fields);
            if (files.photo) {
                if (files.photo.size > 1000000) {
                    return res
                        .status(400)
                        .json({err: "Image Size too large"});
                }
                product.photo.data = fs.readFileSync(files.photo.path);
                product.photo.contentType = files.photo.type;
            }

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
        })
    }
};

module.exports = productController;