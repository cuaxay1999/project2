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
	ACTIVE_FALSE: 7001
}

const genderCode = {
	MALE: 0,
	FEMALE: 1,
	OTHER: 3
}

const userStatusCode = {
	ACTIVE: {
		code: 1,
		message: 'Active'
	},
	UN_ACTIVE: 0,
	BLOCK: {
		code: -1,
		message: 'Blocked'
	}
}

const bookingCode = {
	CANCEL: -1,
	ACCEPTED: 0,
	DONE: 1
}

const CONFIRM_MODE = {
	OTP: 'otp',
	BACKUP_CODE: 'backup_code'
}

module.exports = {
	statusCode,
	genderCode,
	userStatusCode,
	bookingCode,
	CONFIRM_MODE
}
