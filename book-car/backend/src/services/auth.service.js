const UserModel = require('../models/user.model');
const BackupCodeModel = require('../models/backup.model');
const {
    comparePassword,
    generateAccessToken,
    generatePassword,
    verifyToken,
    generateActiveAccountLink,
    generateBackupCodes,
} = require('../utils/auth');
const { v4: UUID } = require('uuid');
const { format } = require('date-fns');
const { userStatusCode } = require('../enums/code');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
require('dotenv').config();
const transporter = require('../config/email.config');

class AuthService {
    constructor() {
        this.model = new UserModel();
    }

    register = async (newUser) => {
        // validate
        if (newUser && newUser.phoneNumber) {
            var userExist = await this.model.findUserByPhoneNumber(newUser.phoneNumber);
            userExist = JSON.parse(JSON.stringify(userExist));
            if (userExist.length > 0) {
                throw Error('Số điện thoại đã tồn tại');
            }
            var password = await generatePassword(newUser.password);

            var createdAt = format(new Date(), 'dd-MM-yy HH:mm:ss');

            try {
                const newUUID = UUID();
                const user = await this.model.create({
                    ...newUser,
                    userId: newUUID,
                    password,
                    status: 0, // unactive
                    createdAt,
                });
                let confirmLink = generateActiveAccountLink(newUUID);
                const infor = await transporter.sendMail({
                    to: `${newUser.email}`, // list of receivers
                    subject: 'Active your account', // Subject line
                    text: 'Click here to active your account', // plain text body
                    html: `<a href="${confirmLink}">Click here to confirm your email ${confirmLink}</a>`, // html body
                });
                return user;
            } catch (err) {
                throw new Error(err.message);
            }
        }
        throw Error('Empty data');
    };

    login = async (phoneNumber, password) => {
        var users = await this.model.findUserByPhoneNumber(phoneNumber);
        users = JSON.parse(JSON.stringify(users));
        var currentUser = users[0];
        if (!currentUser) {
            throw new Error(`Sai tên đăng nhập hoặc mật khẩu`);
        }
        if (currentUser.status == userStatusCode.BLOCK) {
            throw new Error('Tài khoản của bạn đang bị khóa');
        }

        if (currentUser.status == userStatusCode.ACTIVE)
            if (currentUser.status == userStatusCode.ACTIVE) {
                const isCorrectPassword = await comparePassword(password, currentUser.password);
                const userId = currentUser.userId;
                var countWrong = currentUser.countWrongPass;
                if (!isCorrectPassword) {
                    if (countWrong == 9) {
                        await this.model.update(userId, {
                            countWrongPass: ++countWrong,
                            status: userStatusCode.BLOCK,
                        });
                        throw new Error(
                            'Tài khoản của bạn đã bị khóa, do nhập sai pass quá 10 lần'
                        );
                    } else {
                        await this.model.update(userId, {
                            countWrongPass: ++countWrong,
                        });
                        throw new Error('Sô tài khoản hoặc mật khẩu không chính xác');
                    }
                }
                await this.model.update(userId, { countWrongPass: 0 });
                const accessToken = await generateAccessToken(currentUser.userId, currentUser.type);
                console.log(accessToken);
                return { accessToken, currentUser };
            }
    };

    /**
     * Verify Access token
     * @param {String} accessToken
     * @returns
     */
    verify = async (accessToken) => {
        try {
            const { userId } = await verifyToken(accessToken);
            if (userId) return true;
        } catch (err) {
            return false;
        }
    };

    /**
     * Activate Account By Email
     */
    activateAccount = async (vefifyToken) => {
        try {
            const { userId } = await verifyToken(vefifyToken);
            console.log(userId);
            return await this.model.update(userId, { status: 1 });
        } catch (err) {
            return err;
        }
    };

    // default : 30s
    activate2FA = async (userId) => {
        var users = await this.model.getById(userId);
        users = JSON.parse(JSON.stringify(users));
        var currentUser = users[0];

        if (currentUser.hasTwoFactorAuth) {
            throw new Error('Tài khoản của bạn đã kích hoạt bảo mật 2 lớp');
        }

        const secret = speakeasy.generateSecret({
            name: 'Booking Car',
        });
        // Save secret.ascii -> to database
        await this.model.update(userId, {
            secretKey: secret.ascii,
            hasTwoFactorAuth: true,
            qrCode: secret.otpauth_url,
        });
        // generate backup code
        const codeList = generateBackupCodes();
        var backupCodes = [];
        // Create code variable to insert into db
        var codeArr = new Array();
        for (i = 0; i < codeList.length; i++) {
            codeArr.push([userId, codeList[i]]);
            backupCodes.push({ code: codeList[i], hasUsed: 0 });
        }
        // Insert Backup code to DB
        await BackupCodeModel.insertBackupCode(codeArr);

        const qrCode = await qrcode.toDataURL(secret.otpauth_url);
        return { qrCode, backupCodes };
    };

    deactiveF2A = async (userId) => {
        await this.model.update(userId, {
            secretKey: null,
            hasTwoFactorAuth: false,
            qrCode: null,
        });
        await BackupCodeModel.deleteAllCode(userId);

        return true;
    };

    verifyOTP = async (OTP, userId) => {
        // get secret key from database
        const findedUser = (await this.model.getById(userId))[0];

        if (!findedUser) {
            throw new Error('Không tìm thấy user');
        }
        // Verifi OTP

        const isVerified = speakeasy.totp.verify({
            token: OTP,
            secret: findedUser.secretKey,
            encoding: 'ascii',
        });

        console.log(isVerified);

        if (isVerified == true) return true;
        else throw new Error('Mã xác thực không chính xác');
    };

    verifyBackupCode = async (backupCode, userId) => {
        const findedCode = await BackupCodeModel.findBackUpCode(backupCode, userId);
        if (findedCode) {
            if (findedCode.hasUsed == 1) {
                throw new Error('Mã code đã được sử dụng');
            }
            // set đã được sử dụng
            await BackupCodeModel.setUsedCode(findedCode.id);
            return true;
        } else throw new Error('Mã code không tồn tại');
    };

    // get two authentical settings
    getSettingInfor = async (userId) => {
        var users = await this.model.getById(userId);
        var backupCodes = [];
        users = JSON.parse(JSON.stringify(users));
        var currentUser = users[0];
        if (currentUser.hasTwoFactorAuth) {
            backupCodes = await BackupCodeModel.getAllCode(userId);
        }

        const { phoneNumber, email, fullName, gender, hasTwoFactorAuth } = { ...currentUser };

        return {
            userInfors: {
                phoneNumber,
                email,
                fullName,
                gender,
                hasTwoFactorAuth,
            },
            backupCodes,
        };
    };

    confirmPassword = async (userId, password) => {
        var users = await this.model.getById(userId);
        users = JSON.parse(JSON.stringify(users));
        var currentUser = users[0];
        if (!currentUser) {
            throw new Error(`Mật khẩu không đúng`);
        }
        console.log(password);
        const isCorrectPassword = await comparePassword(password, currentUser.password);
        return isCorrectPassword;
    };
}

module.exports = AuthService;
