const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type: String
    },
    role_id: {
        type: String
    },
    permissions: {
        type: Array,
        default: []
    },
});

module.exports = mongoose.model('role', RoleSchema);