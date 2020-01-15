const userController = require('../users/controller/users.js');
const authController = require('../../modules/auth/controllers/auth');
const orderController = require('./controllers/orders');
const productController = require('../products/controllers/products');
module.exports = (router) => {
    router.get('/orders/list/superAdmin/:userId', authController.requireSignin, authController.isAuth, authController.isSuperAdmin, orderController.listOrders);
    router.post('/order/create/:userId', authController.requireSignin, authController.isAuth, userController.addOrderToUserHistory, productController.decreaseQuantity, orderController.createOrder);
    router.get('/orders/status-value/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, orderController.getStatusValues);
    router.put('/orders/:orderId/status/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, orderController.updateOrderStatus);
    router.param('orderId', orderController.findOrderById);
    router.get('/orders/list/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, orderController.listOrdersByUserId);
    router.param('userId', userController.findUserById);
}