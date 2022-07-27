const connection = require('../config/database.config');

class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
        this.connection = connection;
    }

    getAll() {
        var sql = `SELECT * FROM ${this.tableName}s`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) {
                    reject(err);
                } else resolve(res);
            });
        });
    }

    create(newData) {
        var sql = `INSERT INTO ${this.tableName}s SET ?`;
        console.log(newData);
        return new Promise((resolve, reject) => {
            this.connection.query(sql, newData, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    getById(id) {
        var sql = `SELECT * FROM ${this.tableName}s WHERE ${this.tableName}Id = ${id}`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    update(id, data) {
        var sql = `UPDATE  ${this.tableName}s SET ? WHERE ${this.tableName}Id = ${id}`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, data, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }
}

module.exports = BaseModel;
