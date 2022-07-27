const message = require('./message');

const response = (statusCode, data, devMessage, userMessage) => {
    return {
        statusCode: statusCode,
        data: data,
        devMessage: devMessage || '',
        userMessage: userMessage || message(statusCode),
    };
};
module.exports = response;
