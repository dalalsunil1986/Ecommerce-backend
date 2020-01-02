const {Order, CartItem} = require('../models/order');
const {errorHandler} = require('../../helpers/dbErrorHandler');

const orderController = {
    createOrder: (req, res) => {
        req.body.order.user = req.profile;
        const OrderObj = new Order(req.body.order);
        OrderObj.save((err, data) => {
            if (err) {
                return res
                    .status(404)
                    .json({error: errorHandler(err)});
            }
            return res.json(data);
        });

    },
    listOrders: (req, res) => {
        Order
            .find()
            .populate('user', "_id name address")
            .sort("-created")
            .exec((err, orders) => {
                if (err) {
                    return res
                        .status(404)
                        .json({error: errorHandler(err)});
                }
                res.json(orders);
            });
    },
    getStatusValues: (req, res) => {
        res.json(Order.schema.path("status").enumValues);
    },
    findOrderById: (req, res, next, id) => {
        console.log("here!!im ")
        Order
            .findById(id)
            .populate('products product', 'name price')
            .exec((err, order) => {
                if (err || !order) {
                    console.log(err,"er")
                    return res
                        .status(400)
                        .json({error: errorHandler(err)});
                }
                req.order = order;
                next();
            });
    },
    updateOrderStatus: (req, res) => {
        let order = req.order;
       
        Order.updateOne({
            _id: order._id
        }, {
            $set: {
                status: req.body.status
            }
        }, (err, order) => {
            if (err) {
                
                return res
                    .status(400)
                    .json({error: errorHandler(err)});
            }
            return res.json(order);
        });
    }
};

module.exports = orderController;