const BaseModel = require('./base.model');

class PlaceModel extends BaseModel {
    constructor() {
        super('place');
    }

    /**
     * Hàm lấy ra địa chỉ theo quận, huyện, hoặc tỉnh
     * @param {*} propertyName là quận, huyện hoặc tỉnh
     * @param {*} data
     * @returns Mảng dữ liệu
     */

    getPlaceByProperty(propertyName, data) {
        var sql = `SELECT * FROM ${this.tableName}s WHERE ${propertyName} = '${data}'`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }
}

module.exports = new PlaceModel();
