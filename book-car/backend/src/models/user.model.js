const BaseModel = require('./base.model');

class UserModel extends BaseModel {
    constructor() {
        super('user');
    }

    findUserByPhoneNumber(phoneNumber) {
        var sql = `SELECT *  FROM ${this.tableName}s WHERE phoneNumber = '${phoneNumber}'`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    getById(userId) {
        var sql = `SELECT *  FROM ${this.tableName}s WHERE userId = '${userId}'`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    getAll() {
        var sql = `CALL GetAllUser()`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) reject(err);
                else resolve(res[0]);
            });
        });
    }

    update(id, data) {
        var sql = `UPDATE  ${this.tableName}s SET ? WHERE ${this.tableName}Id = '${id}'`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, data, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }
}

module.exports = UserModel;
