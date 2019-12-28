const userController = require('../users/controller/users.js');
const authController = require('../../modules/auth/controllers/auth');
const orderController = require('./controllers/orders');
module.exports = (router) => {
    router.post('/order/create/:userId', authController.requireSignin, authController.isAuth, orderController.createOrder);
    router.param('userId', userController.findUserById);
}