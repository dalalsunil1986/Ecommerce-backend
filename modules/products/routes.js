const productController = require('./controllers/products');
const authController = require('../auth/controllers/auth');
const userController = require('../users/controller/users');

module.exports = (router) => {
    router.post('/products/create/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, productController.createProduct);
    router.get('/product/:productId', productController.getProductById, productController.readProduct);
    router.delete('/product/:productId/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, productController.removeProduct);
    router.put('/product/:productId/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, productController.updateProduct);
    router.get('/products', productController.getAllProducts);
    router.get('/products/related/:productId', productController.relatedList);
    router.get('/products/categories', productController.getProductCategories);
    router.post("/products/by/search", productController.searchProduct);
    router.get('/product/photo/:productId', productController.sendProductPhoto);
    router.get('/products/search', productController.listSearch);
    router.get('/products/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, productController.getProductsByUserId);

    router.param('productId', productController.getProductById);
    router.param('userId', userController.findUserById);
}
/*
    by sell route = /products?sortBy=sold&order=desc&limit=10
    by arrival route = /products?sortBy=sold&order=desc&limit=10

*/