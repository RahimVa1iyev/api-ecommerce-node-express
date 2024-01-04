const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required :[true,'Name is provided'],
        maxlength:20,
        minlength:2
    },
    email:{
        type : String,
        required :[true,'Email is provided'],
        validate : {
            validator : validator.isEmail,
            message : 'Please provide valid email'
        }
    },
    name:{
        type : String,
        required :[true,'Password is provided'],
        minlength:6
    },
    role:{
        type:String,
        enum :['admin','user']
    }
})

module.exports = mongoose.model("User",UserSchema)