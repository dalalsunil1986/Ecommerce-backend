const authController = require('./controllers/auth');
const { userSignUpValidator } = require('../../validator/index');
module.exports = (router) => {

    router.post('/signup', userSignUpValidator, authController.signup);
    router.post('/signin', authController.signin);
    router.get('/signout', authController.signout)
    router.get('/hello', authController.requireSignin, (req, res, next) => {
        res.send("hello there!!!");
    })

}