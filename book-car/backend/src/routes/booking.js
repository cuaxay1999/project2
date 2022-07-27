const router = require('express').Router();
const bookingController = require('../controllers/booking.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const { auth } = require('../middlewares/auth.middleware');
const { permission } = require('../middlewares/permission.middleware');

router.post('/bookings', auth, asyncHandler(bookingController.createBooking));
router.get('/bookings', auth, asyncHandler(bookingController.getByUserId));
router.get('/bookings/all', auth, permission, asyncHandler(bookingController.get));
router.put('/bookings', asyncHandler(bookingController.update));

module.exports = router;
