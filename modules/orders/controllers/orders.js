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
    }
};

module.exports = orderController;