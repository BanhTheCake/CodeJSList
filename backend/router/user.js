const app = require('express');
const router = app.Router();
const userController = require('../controller/userController')
const { verify } = require('../controller/middwareVerify')


router.get('/post', verify, userController.getUserPost);
router.post('/create', verify, userController.createPoster);
router.delete('/delete', verify, userController.deleteUserPost);
router.patch('/update', verify, userController.updatePoster);
router.get('/', verify, userController.getAllData);

module.exports = router;
