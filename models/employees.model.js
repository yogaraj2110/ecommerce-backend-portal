const validator = require('validator');
const mongoose = require('mongoose')

// Schema definition
const employeesSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
      },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is valid')
            }
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    designation: {
        type: String,
        ref:'department',
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        // type: String,
        ref:'role',
        required: true,
    },
})

module.exports = mongoose.model('employees', employeesSchema)