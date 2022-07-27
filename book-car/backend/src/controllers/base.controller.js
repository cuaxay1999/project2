const response = require('../enums/reponse');
const { statusCode } = require('../enums/code');

class BaseController {
    constructor() {
        this.service = null;
    }

    create = async (req, res) => {
        try {
            const kq = await this.service.create(req.body);
            res.send(response(statusCode.CREATED, kq, '', ''));
        } catch (e) {
            res.send(response(statusCode.BAD_REQUEST, '', e.message, ''));
        }
    };

    update = async (req, res) => {
        console.log('update');
        try {
            const { id } = req.query;
            const kq = await this.service.update(id, req.body);
            res.send(response(statusCode.OK, kq, '', ''));
        } catch (e) {
            res.send(response(statusCode.BAD_REQUEST, '', e.message, ''));
        }
    };

    get = async (req, res) => {
        try {
            const kq = await this.service.get();
            res.send(response(statusCode.OK, kq, '', ''));
        } catch (e) {
            res.send(response(statusCode.NO_CONTENT, e.message, '', ''));
        }
    };

    getById = async (req, res) => {
        try {
            const kq = await this.service.getById(req.body.userId);
            res.send(response(statusCode.OK, kq, '', ''));
        } catch (e) {
            res.send(response(statusCode.NO_CONTENT, e.message, '', ''));
        }
    };
}
module.exports = BaseController;
