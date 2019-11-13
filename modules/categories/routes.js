const authController = require('../auth/controllers/auth');
const categoryController = require('./controllers/categories');
const userController = require('../users/controller/users');

module.exports = (router) => {
    router.post('/category/create/:userId', authController.requireSignin, authController.isAuth, authController.isAdmin, categoryController.createCategory);

    router.param('userId', userController.findUserById);

}