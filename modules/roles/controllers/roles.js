const RoleSchema = require('../models/roles');
const roleController = {
    createRole: (req, res) => {
        let role = req.body.role;
        const roleObj = new RoleSchema(role);
        roleObj.save((err, role) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res.json(role);
            }
        })
    },
    getRoles: (req, res) => {
        let roles = [];
        RoleSchema
            .find({
            role_id: {
                $ne: 2
            }
        })
            .exec((err, roles) => {
                if (err) {
                    return res
                        .status(400)
                        .json({error: err});
                }
                return res.json(roles);

            });
    }
};
module.exports = roleController;