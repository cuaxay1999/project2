const BaseModel = require('./base.model');
class BookingModel extends BaseModel {
    constructor() {
        super('booking');
    }

    getByUserId = (userId) => {
        var sql = `CALL GetBooking(?)`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, userId, (err, res) => {
                if (err) {
                    throw new Error(err.message);
                } else resolve(res[0]);
            });
        });
    };

    getAll = () => {
        var sql = `CALL GetAllBooking()`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) {
                    throw new Error(err.message);
                } else resolve(res[0]);
            });
        });
    };
}

module.exports = new BookingModel();
