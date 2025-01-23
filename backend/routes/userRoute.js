const express = require('express');
const router = express.Router();

const {LoginUser, Register, getSingleUser, GetAlluser, sendOtp, VerifyOtp, LoadUser} = require('../controller/userController');
const { authMiddle } = require('../middleware/auth');


router.route('/login').post(LoginUser);
router.route('/register').post(Register);
router.route('/admin/user/:id').get(getSingleUser);
router.route('/admin/users').get(GetAlluser);
router.route('/sendotp').post(sendOtp);
router.route('/verify').post(VerifyOtp);
router.route('/me').get(authMiddle,LoadUser);


module.exports = router;
