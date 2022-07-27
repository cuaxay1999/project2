const asyncHandler = require('./asyncHandler');
const { verifyToken } = require('../utils/auth');
const permissionEnum = require('../enums/permission');

const permission = async (req, res, next) => {
    try {
        const { type } = req.body;

        if (!type || type == 0) {
            res.status(403).json('You are not Allow to access this page');
        }

        if (type == permissionEnum.ADMIN) {
            return next();
        }
    } catch (e) {
        res.status(403).json('You are not Allow to access this page');
    }
};

module.exports = {
    permission: asyncHandler(permission),
};
