const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required :[true,'Name is provided'],
        maxlength:20,
        minlength:2
    },
    email:{
        type : String,
        unique:[true, 'Email already exist'],
        required :[true,'Email is provided'],
        validate : {
            validator : validator.isEmail,
            message : 'Please provide valid email'
        }
    },
    password:{
        type : String,
        required :[true,'Password is provided'],
        minlength:6
    },
    role:{
        type:String,
        enum :['admin','user']
    }
})

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password ,salt)
})

UserSchema.methods.comparePassword = async function(canditatePassword){
    const isMatch = await bcrypt.compare(canditatePassword,this.password)
    return isMatch
}

UserSchema.methods.createJWT =  function(){
    const tokenUser = {name : this.name , userId: this._id , role : this.role}
    const token =  jwt.sign(tokenUser,process.env.JWT_SECRET , {expiresIn : process.env.JWT_LIFE_TIME})
    return token
}

module.exports = mongoose.model("User",UserSchema)