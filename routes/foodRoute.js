const express = require('express');;
const authMiddleware = require('../middleware/authMiddleware');
const { createFoodController, getAllFooodController, getSingleFoodController, foodUpdateController, deleteFoodController } = require('../controllers/foodController');



//router object:
const router = express.Router();



//ALL APIS ROUTER:

//CREATE food || POST:
router.post('/create', authMiddleware, createFoodController)



//get ALL FOODS || GET:
router.get('/getall', getAllFooodController)



//get Single foods;
router.get('/get/:id', authMiddleware, getSingleFoodController)



//update foods || put:
router.put('/update/:id', authMiddleware, foodUpdateController)

// DELETE FOOD
router.delete("/delete/:id", authMiddleware, deleteFoodController);



//export
module.exports = router
