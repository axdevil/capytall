var express = require('express')
var router = express.Router()
var userController = require('../controllers/userController')

router.get('/',userController.index)
router.get('/signUp',userController.register)

module.exports = router 