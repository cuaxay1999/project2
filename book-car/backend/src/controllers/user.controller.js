const userService = require('../services/user.service');
const response = require('../enums/reponse');
const { statusCode } = require('../enums/code');
const BaseController = require('./base.controller');

class RouteController extends BaseController {
    constructor() {
        super();
        this.service = userService;
    }

    getAllUser = async (req, res) => {
        console.log('GET: user');
        try {
            const kq = await this.service.getAll();
            res.send(response(statusCode.OK, kq, '', ''));
        } catch (err) {
            res.send(response(statusCode.BAD_REQUEST, {}, err.message, ''));
        }
    };

    getById = async (req, res) => {
        try {
            const kq = await this.service.getById(req.body.userId);

            res.send(response(statusCode.OK, kq, '', 'Không có thông tin'));
        } catch (e) {
            res.send(response(statusCode.NO_CONTENT, e.message, '', ''));
        }
    };

    selfUpdate = async (req, res) => {
        console.log('update');
        try {
            const kq = await this.service.update(req.body.id, req.body);
            res.send(response(statusCode.OK, kq, '', ''));
        } catch (e) {
            res.send(response(statusCode.BAD_REQUEST, '', e.message, ''));
        }
    };
}

module.exports = new RouteController();
