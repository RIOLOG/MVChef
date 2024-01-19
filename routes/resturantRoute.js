const express = require('express');;
const authMiddleware = require('../middleware/authMiddleware');
const {createResturantController, getAllResturant, getAllResturantbyId, deleteResturantController} = require('../controllers/resturantController')


//router object:
const router = express.Router();



//ALL APIS ROUTER:

//CREATE RESTURANT || POST:
router.post('/create', authMiddleware, createResturantController)


//GET ALL RESTURANT || GET
router.get('/getAll', getAllResturant)


//GEt RESTURANT BY ID: || GET:
router.get('/get/:id', getAllResturantbyId)


//DELTE USER || DELETE:
router.get("/delete/:id", authMiddleware, deleteResturantController)


//export
module.exports = router
