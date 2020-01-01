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

    }
};

module.exports = orderController;