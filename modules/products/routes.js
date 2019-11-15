const productController = require('./controllers/products');
const authController = require('../auth/controllers/auth');
const userController = require('../users/controller/users');

module.exports = (router) => {
    router.post('/products/create/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, productController.createProduct);
    //----//
    router.get('/product/:productId', productController.getProductById, productController.readProduct);
    //---//
    router.delete('/product/:productId/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, productController.removeProduct);

    router.put('/product/:productId/:userId',authController.requireSignin, authController.isAuth, authController.isAdmin, productController.updateProduct);
    //---//
    router.param('productId', productController.getProductById);
    //---//
    router.param('userId', userController.findUserById);
}