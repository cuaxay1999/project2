const asyncHandler = require('./asyncHandler');
const { verifyToken } = require('../utils/auth');
require('dotenv').config();

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            message: 'Invalid or expired token provided!',
        });
    }

    const [tokenType, accessToken] = authorization.split(' ');

    if (tokenType != 'Bearer') {
        return res.status(401).json({
            message: 'Type of token is wrong',
        });
    }

    try {
        const { userId, type } = await verifyToken(accessToken);
        req.body.userId = userId;
        req.body.type = type;
        return next();
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid or expired token provided!',
        });
    }
};

module.exports = {
    auth: asyncHandler(auth),
};
