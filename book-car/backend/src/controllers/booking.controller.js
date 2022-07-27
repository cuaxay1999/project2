const bookingService = require('../services/booking.service');
const response = require('../enums/reponse');
const { statusCode } = require('../enums/code');
const BaseController = require('./base.controller');

class BookingController extends BaseController {
    constructor() {
        super();
        this.service = bookingService;
    }

    createBooking = async (req, res) => {
        console.log('POST: Create Booking');
        try {
            const { startPlace, endPlace, startTime, quantity, startDate, price, total, userId } =
                req.body;
            const kq = await bookingService.createNewBooking({
                startPlace,
                endPlace,
                startTime,
                quantity,
                startDate,
                price,
                total,
                userId,
            });

            res.send(response(statusCode.CREATED, kq, '', 'Đặt vé thành công'));
        } catch (err) {
            res.send(response(statusCode.OK, {}, '', ''));
        }
    };

    getByUserId = async (req, res) => {
        const { userId } = req.body;
        console.log('GET: Booking');
        try {
            const kq = await bookingService.getByUserId(userId);
            res.send(response(statusCode.OK, kq, '', ''));
        } catch (e) {
            res.send(response(statusCode.NO_CONTENT, e.message, '', ''));
        }
    };
}

module.exports = new BookingController();
