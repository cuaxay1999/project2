const router = require('express').Router();
const userController = require('../controllers/user.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const { auth } = require('../middlewares/auth.middleware');
const { permission } = require('../middlewares/permission.middleware');

router.get('/users', auth, permission, asyncHandler(userController.getAllUser));
router.get('/users/getById', auth, asyncHandler(userController.getById));
router.put('/users', auth, permission, asyncHandler(userController.update));
router.put('/users/self', auth, asyncHandler(userController.update));

module.exports = router;
