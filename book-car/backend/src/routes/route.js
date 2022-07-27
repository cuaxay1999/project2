const router = require('express').Router();
const routeController = require('../controllers/route.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const { auth } = require('../middlewares/auth.middleware');
const { permission } = require('../middlewares/permission.middleware');

router.get('/routes', asyncHandler(routeController.getRoute));
router.get('/routes/search', asyncHandler(routeController.search));
router.post('/routes', auth, permission, asyncHandler(routeController.create));
router.put('/routes', auth, permission, asyncHandler(routeController.update));

module.exports = router;
