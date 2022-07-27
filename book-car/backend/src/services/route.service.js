const routeModel = require('../models/route.model');
const BaseService = require('./base.service');

class RouteService extends BaseService {
    constructor() {
        super();
        this.model = routeModel;
    }

    getAllRoute = async () => {
        const res = await this.model.getAllRoute();
        return res;
    };

    search = async (start, end) => {
        const res = await routeModel.search(start, end);
        return res;
    };

    create = async (route) => {
        const res = await routeModel.create(route);
        return res;
    };
}

module.exports = new RouteService();
