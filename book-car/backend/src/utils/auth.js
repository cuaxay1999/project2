const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate Hash password
 * @param {String} password
 * @returns
 */
const generatePassword = async (password) => {
    const salt = generateSalt(10);
    password = await hashBcrypt(password, salt);
    return password;
};

/**
 * Compare Hash password and plaintext password
 * @param {String} passwordCompare
 * @param {String} password
 * @returns
 */
const comparePassword = async (passwordCompare, password) => {
    const isCorrectPassword = await compareBcrypt(passwordCompare, password);
    return isCorrectPassword;
};

/**
 * Create access token
 * @param {*} userId
 * @param {*} type
 * @returns
 */
const generateAccessToken = async (userId, type) => {
    const accessToken = await jwt.sign({ userId: userId, type: type }, process.env.JWT_KEY);
    return accessToken;
};

const generateSalt = (rounds) => {
    return bcrypt.genSaltSync(rounds);
};

const hashBcrypt = (text, salt) => {
    const hashedBcrypt = new Promise((resolve, reject) => {
        bcrypt.hash(text, salt, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
        });
    });
    return hashedBcrypt;
};

const compareBcrypt = async (data, hashed) => {
    const isCorrect = await new Promise((resolve, reject) => {
        bcrypt.compare(data, hashed, (err, same) => {
            if (err) reject(err);
            resolve(same);
        });
    });
    return isCorrect;
};

/**
 * Get the decode userID
 * @param {*} accessToken
 * @returns
 */
const verifyToken = async (accessToken) => {
    const userId = await jwt.verify(accessToken, process.env.JWT_KEY);
    return userId;
};

/**
 * generate active link
 */
const generateActiveAccountLink = (userId) => {
    const hashCode = jwt.sign({ userId: userId }, process.env.JWT_KEY);
    const confirmLink = `http://localhost:9000/api/v1/verify/${hashCode}`;
    return confirmLink;
};

/**
 * Generate backup code
 */
const generateBackupCodes = () => {
    const CHARACTER_LIST = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const NUM_OF_CODE = 10;
    const NUM_OF_CHARACTER = 12;
    var pos = 0;
    var code = '';
    var codeList = new Array();

    for (j = 0; j < NUM_OF_CODE; j++) {
        code = '';
        for (i = 0; i < NUM_OF_CHARACTER; i++) {
            pos = Math.floor(Math.random() * CHARACTER_LIST.length);
            code += CHARACTER_LIST.charAt(pos);
        }
        codeList.push(code);
    }
    return codeList;
};

module.exports = {
    comparePassword,
    generateAccessToken,
    generatePassword,
    verifyToken,
    generateActiveAccountLink,
    generateBackupCodes,
};
