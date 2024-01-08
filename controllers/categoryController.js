const Category = require('../models/Category')
const {StatusCodes} = require('http-status-codes')

const createCategory = async (req,res) =>{
    const {name} = req.body

    const category = await Category.create({name})

    res.status(StatusCodes.CREATED).json({category})
}



module.exports = createCategory