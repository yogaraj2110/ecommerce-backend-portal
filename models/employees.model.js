const validator = require('validator')
const mongoose = require('mongoose')

// Schema definition
const employeesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error('Email is valid')
            }
          }

    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    designation:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String
    }
})

// Model creatiion

module.exports = mongoose.model('employees',employeesSchema)