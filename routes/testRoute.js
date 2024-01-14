const express = require('express');
const { testUserController } = require('../controllers/testController');


//router object:
const router = express.Router();


//ALL APIS ROUTER:
router.get("/test-user", testUserController);




//export:
module.exports = router;