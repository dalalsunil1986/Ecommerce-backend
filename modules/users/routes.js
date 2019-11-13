const userController = require('../users/controller/users');
const authController = require('../../modules/auth/controllers/auth');

module.exports = (router) => {
    router.get('/secret/:userId', authController.requireSignin, authController.isAuth, (req, res) => {
        res.json({user: req.profile});
    });
    router.param('userId', userController.findUserById);
}