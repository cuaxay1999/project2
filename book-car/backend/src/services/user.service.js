const UserModel = require('../models/user.model');
const BaseService = require('./base.service');

class UserService extends BaseService {
    constructor() {
        super();
        this.model = new UserModel();
    }
    getAll = async () => {
        const kq = await this.model.getAll();
        return kq;
    };
}

module.exports = new UserService();
