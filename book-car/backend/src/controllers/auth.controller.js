const AuthService = require('../services/auth.service');
const response = require('../enums/reponse');
const { statusCode, genderCode } = require('../enums/code');

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    login = async (req, res) => {
        console.log('Login request');
        try {
            const { phoneNumber, password } = req.body;
            const { accessToken, currentUser } = await this.authService.login(
                phoneNumber,
                password
            );
            var responseData = {
                accessToken,
                fullName: currentUser.fullName,
                gender: currentUser.gender,
                type: currentUser.type,
                phoneNumber: phoneNumber,
            };
            return res.send(response(statusCode.OK, responseData, '', 'Đăng nhập thành công'));
        } catch (e) {
            return res.send(response(statusCode.WRONG_LOGIN, '', e.message, e.message));
        }
    };

    register = async (req, res) => {
        console.log('register request');
        try {
            const { phoneNumber, email, password, fullName } = req.body;
            const newUser = {
                phoneNumber,
                password,
                gender: req.body.gender || genderCode.OTHER,
                email,
                fullName,
            };
            const user = await this.authService.register(newUser);
            return res.send(response(statusCode.CREATED, user, '', 'Thêm tài khoản thành công'));
        } catch (error) {
            return res.send(response(statusCode.BAD_REQUEST, '', '', error.message));
        }
    };

    // Verify token
    verify = async (req, res) => {
        console.log('verify request');
        const { accessToken } = req.body;
        const isVerify = await this.authService.verify(accessToken);
        console.log(isVerify);
        return res.send(
            response(statusCode.OK, isVerify, isVerify ? 'Token hợp lệ' : 'token không hợp lệ')
        );
    };

    /**
     * Active account by email
     * @param {*} req
     * @param {*} res
     * @returns
     */
    activateAccount = async (req, res) => {
        console.log('Active Account');
        const kq = await this.authService.activateAccount(req.params.token);
        if (kq.affectedRows == 1) {
            res.setHeader('location', '/localhost:3000');
            res.send('ok');
        }
        return res.send(kq);
    };

    /**
     * Active F2A
     * @param {*} req
     * @param {*} res
     */
    activeF2A = async (req, res) => {
        try {
            const resData = await this.authService.activate2FA(req.body.userId);
            res.send(
                response(
                    statusCode.OK,
                    resData,
                    'Kích hoạt xác thực 2 bước thành công',
                    'Kích hoạt xác thực 2 bước thành công'
                )
            );
        } catch (err) {
            res.send(response(statusCode.ACTIVE_FALSE, '', err.message));
        }
    };

    /**
     * Verify OTP
     * @param {*} req
     * @param {*} res
     */
    verifyOTP = async (req, res) => {
        try {
            const isVerified = await this.authService.verifyOTP(req.body.otp, req.body.userId);
            res.send(response(statusCode.VERIFIED, isVerified, '', 'Xác thực thành công'));
        } catch (error) {
            res.send(response(statusCode.WRONG_VERIFY, false, error.message));
        }
    };

    /**
     * Verify Backup Code
     * @param {*} req
     * @param {*} res
     */
    verifyBackupCode = async (req, res) => {
        try {
            const isVerified = await this.authService.verifyBackupCode(
                req.body.backupCode,
                req.body.userId
            );
            res.send(response(statusCode.VERIFIED, isVerified, '', 'Xác thực thành công'));
        } catch (error) {
            res.send(response(statusCode.WRONG_VERIFY, false, error.message));
        }
    };

    getSettingInfors = async (req, res) => {
        try {
            const infors = await this.authService.getSettingInfor(req.body.userId);
            res.send(response(statusCode.OK, infors, '', ''));
        } catch (error) {
            res.send(response(statusCode.WRONG_VERIFY, false, error.message));
        }
    };

    /**
     * Ngừng kích hoạt F2A
     * @param {*} req
     * @param {*} res
     */
    deactiveF2A = async (req, res) => {
        try {
            const isDeactive = await this.authService.deactiveF2A(req.body.userId);
            res.send(response(statusCode.OK, isDeactive, '', ''));
        } catch (error) {
            res.send(response(statusCode.BAD_REQUEST, false, error.message));
        }
    };

    confirmPassword = async (req, res) => {
        try {
            console.log(req.body);
            const isValidate = await this.authService.confirmPassword(
                req.body.userId,
                req.body.password
            );
            if (!isValidate) {
                return res.send(
                    response(statusCode.WRONG_VERIFY, isValidate, '', 'Mật khẩu không chính xác')
                );
            }
            return res.send(response(statusCode.VERIFIED, isValidate, '', 'Xác thực thành công'));
        } catch (error) {
            res.send(response(statusCode.WRONG_VERIFY, false, error.message, error.message));
        }
    };
}

module.exports = new AuthController();
