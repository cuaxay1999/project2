const statusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHENTICATED: 401,
    NOT_FOUND: 404,
    NOT_ALLOWED: 403,
    NO_CONTENT: 204,
    WRONG_LOGIN: 1004,
    WRONG_VERIFY: 2004, // OTP wrong verify
    VERIFIED: 2000,
    ACTIVE_FALSE: 7001,
};

const genderCode = {
    MALE: 0,
    FEMALE: 1,
    OTHER: 3,
};

const userStatusCode = {
    ACTIVE: 1,
    UN_ACTIVE: 0,
    BLOCK: -1,
};

module.exports = {
    statusCode,
    genderCode,
    userStatusCode,
};
