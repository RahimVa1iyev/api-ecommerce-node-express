const express = require('express')
const router = express.Router()
const {authenticateUser,authorizePermissions} = require('../middleware/authentication')

const {getAllUsers,getUser,getCurrentUser,updateUser,updateUserPassword} = require('../controllers/userController')

router.route('/').get(authenticateUser,authorizePermissions('admin','owner'),getAllUsers)
router.route('/:id').get(authenticateUser,getUser).get(getCurrentUser).patch(updateUser).patch(updateUserPassword)


module.exports = router