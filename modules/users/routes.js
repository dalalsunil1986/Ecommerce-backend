const userController = require('../users/controller/users');
const authController = require('../../modules/auth/controllers/auth');
const orderController = require('../orders/controllers/orders');

module.exports = (router) => {
    router.get('/secret/:userId', authController.requireSignin, authController.isAuth, (req, res) => {
        res.json({user: req.profile});
    });
    router.get('/orders/by/users/:userId', authController.requireSignin, authController.isAuth, orderController.getPurchaseHistory, userController.getOrders);
    router.get('/user/:userId', authController.requireSignin, authController.isAuth, userController.readUser); 
    router.put('/user/:userId', authController.requireSignin, authController.isAuth, userController.updateUser);
    router.param('userId', userController.findUserById);
}