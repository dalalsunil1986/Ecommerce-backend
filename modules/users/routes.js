const userController = require('./controllers/users');
const {
    userSignUpValidator
} = require('../../validator/index');
module.exports = (router) => {

    router.post('/signup', userSignUpValidator, userController.signup);
    router.post('/signin', userController.signin);

}