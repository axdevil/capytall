var express = require('express')
var router = express.Router()
var userController = require('../controllers/userController')

router.get('/',userController.index)
router.get('/signUp',userController.signUp)
router.get('/signIn',userController.signIn)

router.post('/',userController.insert)

module.exports = router 