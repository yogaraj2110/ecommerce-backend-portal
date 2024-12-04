const mongoose = require('mongoose')

// Schema definition
const RoleSchema = new mongoose.Schema({
    roleType: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('role', RoleSchema)