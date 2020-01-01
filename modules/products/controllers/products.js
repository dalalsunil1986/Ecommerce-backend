const productModel = require('../models/products');
const {errorHandler} = require('../../helpers/dbErrorHandler');
const productDao = require('../dao/products');
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
    },
    getProductById: (req, res, next, id) => {
        let query = {
            _id: id
        };
        productDao
            .getOneProduct(query)
            .then((result) => {
                req.product = result.product;
                next();
            })
            .catch((err) => {
                res
                    .status(400)
                    .json({err: "Product Not Found!!!"});
            });
    },
    readProduct: (req, res, next) => {
        req.product.photo = undefined;
        return res.json(req.product);
    },
    removeProduct: (req, res, next) => {
        const product = req.product;

        product.remove((err, deleteProduct) => {
            if (err) {
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
            return res.json({deleteProduct, "message": "Product deleted !!!"});
        });
    },
    updateProduct: (req, res, next) => {
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
            // const product = new productModel(fields);
            let product = req.product;
            product = _.extend(product, fields);
            // /----------------------------------------///---------------------------------
            // - ----///
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
        });
    },
    getAllProducts: (req, res, next) => {
        let order = req.query.order
            ? req.query.order
            : 'asc';
        let limit = req.query.limit
            ? parseInt(req.query.limit)
            : 6;
        let sortBy = req.query.sortBy
            ? req.query.sortBy
            : '_id';
        let query = {
            order,
            limit,
            sortBy
        };
        productDao
            .getAllProducts(query)
            .then((result) => {
                res.json(result.products);
            })
            .catch((err) => {
                return res
                    .status(400)
                    .json({message: " "});
            })

    },
    relatedList: (req, res, next) => {
        let limit = req.query.limit
            ? parseInt(req.query.limit)
            : 6;
        productModel.find({
            _id: {
                $ne: req.product
            },
                category: req.product.category
            })
            .limit(limit)
            .populate('categories', '_id name')
            .exec((err, products) => {
                if (err || !products) {
                    return res
                        .status(400)
                        .json({error: "Products Not Found!!!"});
                }
                res
                    .status(200)
                    .json(products);
            });
    },
    getProductCategories: (req, res, next) => {
        productModel.distinct("category", {}, (err, categories) => {
            if (err || !categories) {
                return res
                    .status(400)
                    .json({error: "Products Not Found!!!"});
            }
            res
                .status(200)
                .json(categories);
        })
    },
    searchProduct: (req, res, next) => {
        let order = req.body.order
            ? req.body.order
            : "desc";
        let sortBy = req.body.sortBy
            ? req.body.sortBy
            : "_id";
        let limit = req.body.limit
            ? parseInt(req.body.limit)
            : 100;
        let skip = parseInt(req.body.skip);
        let findArgs = {};
        for (let key in req.body.filters) {
            if (req.body.filters[key].length > 0) {
                if (key === "price") {
                    // gte -  greater than price [0-10] lte - less than
                    findArgs[key] = {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1]
                    };
                } else {
                    findArgs[key] = req.body.filters[key];
                }
            }
        }
        let newFindArgs = {
            ...findArgs
        };
        if (!(Object.entries(findArgs).length === 0 && findArgs.constructor === Object)) {
            if (findArgs.categories) {
                newFindArgs.category = findArgs.categories;
                newFindArgs.categories = undefined;
            }
        }
        productModel
            .find(newFindArgs)
            .select("-photo")
            .populate("category")
            .sort([
                [sortBy, order]
            ])
            .skip(skip)
            .limit(limit)
            .exec((err, data) => {
                if (err) {
                    return res
                        .status(400)
                        .json({error: "Products not found"});
                }
                res.json({size: data.length, data});
            });
    },
    sendProductPhoto: (req, res, next) => {
        if (req.product.photo.data) {
            res.set('Content-Type', req.product.photo.contentType)
            return res.send(req.product.photo.data);
        }
        next();
    },
    listSearch: (req, res, next) => {
        //create query here
        const query = {};
        if (req.query.search) {
            query.name = {
                $regex: req.query.search,
                $options: 'i'
            }

            if (req.query.category && req.query.category != 'All') {
                query.category = req.query.category
            }
            productModel.find(query, ((err, products) => {
                if (err || !products) {
                    return res
                        .status(404)
                        .json({error: "Product Not found!!!"});
                }
                return res
                    .status(200)
                    .json(products);
            })).select('-photo');
        }
    },
    decreaseQuantity: (req, res, next) => {
        let bulkOps = req
            .body
            .order
            .products
            .map((item) => {
                return {
                    updateOne: {
                        filter: {
                            _id: item._id
                        },
                        update: {
                            $inc: {
                                quantity: -item.count,
                                sold: + item.count
                            }
                        }
                    }
                }
            });
        productModel.bulkWrite(bulkOps, {}, (err, products) => {
            if (err) {
                return res
                    .status(404)
                    .json({error: "Product Not found!!!"});
            }
            next();
        });
    }
};

module.exports = productController;
