const roleController = require('./controllers/roles');
module.exports = (router) => {
    router.post('/create-role', roleController.createRole);
}