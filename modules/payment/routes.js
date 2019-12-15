const brainTreeController = require('./controllers/brainTree.js');
const authController = require('../../modules/auth/controllers/auth');
const userController = require('../users/controller/users.js');

module.exports = (router) => {
    router.get('/braintree/getToken/:userId', authController.requireSignin, authController.isAuth, brainTreeController.generateToken);
    router.param('userId', userController.findUserById);
}