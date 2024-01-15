const express = require('express');
const {registerController, loginController} = require('../controllers/authController');



//router object:
const router = express.Router();



//ALL APIS ROUTER:

//REGISTER
router.post('/register', registerController)


//LOGIN:
router.post('/login', loginController)


//export
module.exports = router
