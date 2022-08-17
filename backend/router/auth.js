const app = require('express');
const router = app.Router();
const authController = require('../controller/authController')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refreshToken', authController.refreshAccessToken);
router.post('/logout', authController.logout);


module.exports = router;
