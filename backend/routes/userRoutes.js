const express = require('express');
const protect = require('../controllers/authController');
const {registerUser, authUser, updateUser} = require('../controllers/userController');

const router = express.Router();
router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').post(protect,updateUser)
module.exports = router