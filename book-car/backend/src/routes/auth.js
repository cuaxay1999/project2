const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const { auth } = require('../middlewares/auth.middleware');

/**
 * All routes relative to authenticate acount
 * Login
 * Register
 * Verify token
 */
router.post('/auths/register', asyncHandler(authController.register));
router.post('/auths/login', asyncHandler(authController.login));
router.post('/auths/verify', asyncHandler(authController.verify));
router.get('/verify/:token', asyncHandler(authController.activateAccount));
router.get('/settings/f2A', auth, asyncHandler(authController.activeF2A));
router.post('/settings/f2A/verify/otp', auth, asyncHandler(authController.verifyOTP));
router.get('/settings/f2A/deactive', auth, asyncHandler(authController.deactiveF2A));
router.post('/settings/f2A/verify/backup', auth, asyncHandler(authController.verifyBackupCode));
router.get('/settings', auth, asyncHandler(authController.getSettingInfors));
router.post('/verify/password', auth, asyncHandler(authController.confirmPassword));

module.exports = router;
