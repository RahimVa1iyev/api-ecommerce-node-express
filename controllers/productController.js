const { NotFoundError } = require('../errors');
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const createProduct = async (req, res) => {
    req.body.user = req.user.userId

    const product = await Product.create(req.body);

    res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({})

    res.status(StatusCodes.OK).json({products})
}

const getProduct = async (req, res) => {
    const {id : productId} = req.params
    const product= await Product.findOne({_id:productId})
    if(!product) throw new NotFoundError(`Product not found by id ${productId}`)
    res.status(StatusCodes.OK).json({product})
}

const updateProduct = async (req, res) => {
    const {id : productId} = req.params
    const product= await Product.findOneAndUpdate({_id:productId},req.body , {runValidators:true,new:true})
    if(!product) throw new NotFoundError(`Product not found by id ${productId}`)
    res.status(StatusCodes.OK).json({product})
}

const deleteProduct = async (req, res) => {
    const {id : productId} = req.params
    const product= await Product.findOneAndDelete({_id:productId})
    if(!product) throw new NotFoundError(`Product not found by id ${productId}`)
    res.status(StatusCodes.OK).json({product})
}

const uploadImage = async (req, res) => {
    res.send('create')
}

module.exports = { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct, uploadImage }