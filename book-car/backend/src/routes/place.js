const router = require('express').Router();
const placeController = require('../controllers/place.controller');
const asyncHandler = require('../middlewares/asyncHandler');

router.get('/places', asyncHandler(placeController.getPlace));

module.exports = router;
