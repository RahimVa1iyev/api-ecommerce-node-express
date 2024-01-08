const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')

const createProduct = async (req,res) =>{
    const data = req.body
    const {userId} = req.user

    const product = await Product.create({})

    res.send('create')
}

const getAllProducts = async (req,res) =>{
    res.send('create')
}

const getProduct = async (req,res) =>{
    res.send('create')
}

const updateProduct = async (req,res) =>{
    res.send('create')
}

const deleteProduct = async (req,res) =>{
    res.send('create')
}

const uploadImage = async (req,res) =>{
    res.send('create')
}

module.exports = {createProduct,getAllProducts,getProduct,updateProduct,deleteProduct,uploadImage}