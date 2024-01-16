const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');



//router object:
const router = express.Router();



//ALL APIS ROUTER:

//GET USER:
router.get("/getUser", authMiddleware , getUserController)


//UPDATE USER:
router.put('/updateUser', authMiddleware, updateUserController)


//PASSWORD UPDATE:
router.post('/updatePassword', authMiddleware, updatePasswordController)


//RESET PASSWORD:
router.post('/resetPassword', authMiddleware, resetPasswordController)


//delete USER:
router.delete('/deleteUser/:id', authMiddleware, deleteProfileController)



//export
module.exports = router
