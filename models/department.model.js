const mongoose = require('mongoose')

// Schema definition
const DepartmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
})

module.exports = mongoose.model('department', DepartmentSchema)