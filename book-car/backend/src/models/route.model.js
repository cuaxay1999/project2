const BaseModel = require('./base.model');

class RouteModel extends BaseModel {
    constructor() {
        super('route');
    }

    /**
     * Hàm lấy ra địa chỉ theo quận, huyện, hoặc tỉnh
     * @param {*} propertyName là quận, huyện hoặc tỉnh
     * @param {*} data
     * @returns Mảng dữ liệu
     */

    getAllRoute = () => {
        var sql = `Call GetRoute`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) reject(err);
                else resolve(res[0]);
            });
        });
    };

    search = (startPlaceId, endPlaceId) => {
        var sql = `Call SearchRoute(?, ?)`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, [startPlaceId, endPlaceId], (err, res) => {
                if (err) {
                    reject(err);
                } else resolve(res[0]);
            });
        });
    };
}

module.exports = new RouteModel();
