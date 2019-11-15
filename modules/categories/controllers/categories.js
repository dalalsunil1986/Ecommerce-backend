const categoryModel = require('../models/categories');
const {errorHandler} = require('../../helpers/dbErrorHandler');
const categoryDao = require('../dao/category');

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
    },
    findCategoryById: (req, res, next, id) => {
        let query = {
            _id: id
        };
        categoryDao
            .findCategoryById(query)
            .then((result) => {
                // req.profile = result.category;
                req.category = result.category;
                next();
            })
            .catch((err) => {
                res
                    .status(400)
                    .json({"message": "Category does not exist!!! "});
            });
    },
    readCategory: (req, res, next) => {
        let category = req.category;
        return res
            .status(200)
            .json({category});
    },
    updateCategory: (req, res) => {
        let category = req.category;
        category.name = req.body.name;
        category.save((err, category) => {
            if (err) {
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
            return res
                .status(200)
                .json({category});
        });
    },
    deleteCategory: (req, res) => {
        let category = req.category;

        category.remove((err, deletedCategory) => {
            if (err) {
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
            return res.json({deletedCategory, "message": " Category deleted!!! "});
        });
    }
};

module.exports = categoryController;