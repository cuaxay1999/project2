const BaseModel = require('./base.model');
class BackupCode extends BaseModel {
    constructor() {
        super('backupcode');
    }
    /**
     * Insert backup code to database
     * @param {*} userId
     * @param {*} backupCodes
     * @returns
     */
    insertBackupCode = (backupCodes) => {
        var sql = `INSERT INTO ${this.tableName}s (userId, code) VALUES ?`;

        return new Promise((resolve, reject) => {
            this.connection.query(sql, [backupCodes], (err, res) => {
                if (err) {
                    throw new Error(err.message);
                } else resolve(res[0]);
            });
        });
    };

    findBackUpCode = (backupCode, userId) => {
        var sql = `SELECT * FROM ${this.tableName}s WHERE code = '${backupCode}' AND userId = '${userId}'`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) {
                    throw new Error(err.message);
                } else resolve(res[0]);
            });
        });
    };

    setUsedCode = async (id) => {
        var sql = `UPDATE  ${this.tableName}s SET hasUsed = 1 WHERE id = ${id}`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    };

    getAllCode = async (userId) => {
        var sql = `SELECT code, hasUsed FROM ${this.tableName}s WHERE userId = '${userId}'`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    };

    deleteAllCode = async (userId) => {
        var sql = `DELETE FROM ${this.tableName}s WHERE userId = '${userId}'`;
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    };
}

module.exports = new BackupCode();
