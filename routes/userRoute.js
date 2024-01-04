const express = require('express')
const router = express.Router()
const {authenticateUser,authorizePermissions} = require('../middleware/authentication')

const {getAllUsers,getUser,getCurrentUser,updateUser,updateUserPassword} = require('../controllers/userController')

router.route('/').get(authenticateUser,authorizePermissions('admin','owner'),getAllUsers)
router.route('/showMe').get(authenticateUser,getCurrentUser)
router.route('/updatePassword').patch(authenticateUser,updateUserPassword)
router.route('/:id').get(authenticateUser,getUser).patch(updateUser)


module.exports = router