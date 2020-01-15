const RoleSchema = require('../models/roles');
const roleController = {
    createRole: (req, res) => {
        let role = req.body.role;
        console.log(role);
        const roleObj = new RoleSchema(role);
        roleObj.save((err, role) => {
            if (err) {
               res.status(400).json(err);
            } else {
                res.json(role);
            }
        })
    }
};
module.exports = roleController;