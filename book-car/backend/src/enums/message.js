const { statusCode } = require('./code');

const message = (code) => {
    switch (code) {
        case statusCode.BAD_REQUEST:
            return 'Có lỗi xảy ra, vui lòng kiểm tra lại';
        case statusCode.UNAUTHENTICATED:
            return 'Token không hợp lệ';
        case statusCode.NOT_ALLOWED:
            return 'Bạn không được phép truy cập nội dung này';
        case statusCode.OK:
            return 'Thao tác thành công';
        case statusCode.CREATED:
            return 'Thêm nội dung thành công';
        case statusCode.NO_CONTENT:
            return 'Không có nội dung';
        default:
            return 'Có lỗi xảy ra vui lòng liên hệ admin để biết thêm chi tiết';
    }
};

module.exports = message;
