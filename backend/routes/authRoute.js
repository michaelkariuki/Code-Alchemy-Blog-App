const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const utilities = require('../middlewares/utilities')

router.post('/signup', utilities.handleBase64 ,utilities.handleStorage, utilities.parseSignupData, userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router ;

