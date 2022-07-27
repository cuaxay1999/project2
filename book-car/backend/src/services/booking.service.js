const bookingModel = require('../models/booking.model');
const BaseService = require('./base.service');
class BookingService extends BaseService {
    constructor() {
        super();
        this.model = bookingModel;
    }
    createNewBooking = async (data) => {
        const kq = await bookingModel.create(data);
        return kq;
    };

    getByUserId = async (userId) => {
        const kq = await bookingModel.getByUserId(userId);
        return kq;
    };
}

module.exports = new BookingService();
