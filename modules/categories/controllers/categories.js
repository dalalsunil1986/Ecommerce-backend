const categoryModel = require('../models/categories');
const {errorHandler} = require('../../helpers/dbErrorHandler');
const categoryController = {
    createCategory: (req, res, next) => {
        const categoryObj = {
            name: req.body.name
        };
        const category = new categoryModel(categoryObj);
        category.save((err, category) => {
            if (err) {
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
            return res
                .status(200)
                .json({category});
        })
    }
};

module.exports = categoryController;