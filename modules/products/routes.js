const productController = require('./controllers/products');
const authController = require('../auth/controllers/auth');



module.exports = (router) => {
    router.post('/products/create', authController.requireSignin , productController.createProduct);
}