const express = require('express')
const router = express.Router()

const {getAllUsers,getUser,getCurrentUser,updateUser,updateUserPassword} = require('../controllers/userController')

router.route('').get(getAllUsers)
router.route('/:id').get(getUser).get(getCurrentUser).patch(updateUser).patch(updateUserPassword)


module.exports = router