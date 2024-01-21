const express = require('express');;
const authMiddleware = require('../middleware/authMiddleware');
const { createCatController, getCatController, updateCatController, deleteCatController } = require('../controllers/categotyController');



//router object:
const router = express.Router();



//ALL APIS ROUTER:

//CREATE CATRGOTY || POST:
router.post('/create', authMiddleware, createCatController)


//GET ALL CATEGORY:
router.get('/getall', getCatController)



//DELTE CATEGORY:
router.delete('/delete/:id', authMiddleware, deleteCatController)


//UPDATE CATEGORY:
router.put('/update/:id', authMiddleware, updateCatController)


//export
module.exports = router
