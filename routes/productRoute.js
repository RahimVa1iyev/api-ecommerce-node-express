const express = require('express')
const router = express.Router()

const {createProduct,getAllProducts,getProduct,updateProduct,deleteProduct,uploadImage} = require('../controllers/productController')
const {authenticateUser,authorizePermissions} = require('../middleware/authentication')

router.route('/').get(getAllProducts).post([authenticateUser , authorizePermissions('admin')] ,createProduct)
router.route('/:id').get(getProduct).patch([authenticateUser ,authorizePermissions('admin')] , updateProduct).delete([authenticateUser ,authorizePermissions('admin')] ,deleteProduct)


module.exports = router