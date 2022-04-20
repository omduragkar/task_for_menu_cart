const express = require('express');

const router = express.Router();

const userController = require("../controller/userController");
const { protect } = require('../middlewares/authchecker');

router.post("/createlocal", userController.userCreate);
router.post("/login", userController.userLogin);
router.get('/allUsers', protect , userController.userfind);
module.exports = router;

