const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        unique : [true, 'This category is exist'],
        maxlength: [50 , 'Can be a maximum of 50 characters'],
    },
    products : [{type: mongoose.Types.ObjectId , ref: 'Product'}]


})

module.exports = mongoose.model("Category",categorySchema)