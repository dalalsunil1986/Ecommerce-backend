const authController = require('../auth/controllers/auth');
const categoryController = require('./controllers/categories');
const userController = require('../users/controller/users');

module.exports = (router) => {

    router.get('/category/:categoryId', categoryController.readCategory);
    router.post('/category/create/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, categoryController.createCategory);
    router.put('/category/:categoryId/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, categoryController.updateCategory);
    router.delete('/category/:categoryId/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin,categoryController.deleteCategory);

    router.param('categoryId', categoryController.findCategoryById);
    router.param('userId', userController.findUserById);

}