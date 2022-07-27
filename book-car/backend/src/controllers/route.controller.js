const routeService = require('../services/route.service');
const response = require('../enums/reponse');
const { statusCode } = require('../enums/code');

class RouteController {
    getRoute = async (req, res) => {
        console.log('GET: Route');
        try {
            const kq = await routeService.getAllRoute();
            res.send(response(statusCode.OK, kq, '', ''));
        } catch (err) {
            res.send(response(statusCode.OK, {}, '', ''));
        }
    };

    search = async (req, res) => {
        console.log('GET: Search Route');
        try {
            const { start, end } = req.query;
            const kq = await routeService.search(start, end);
            if (kq.length > 0) {
                res.send(response(statusCode.OK, kq, '', ''));
            } else res.send(response(statusCode.NO_CONTENT, []));
        } catch (e) {
            res.send(response(statusCode.NO_CONTENT, {}, e.message, ''));
        }
    };

    create = async (req, res) => {
        console.log('Post: Route');
        try {
            const kq = await routeService.create(req.body);
            res.send(response(statusCode.CREATED, kq, '', ''));
        } catch (e) {
            res.send(response(statusCode.BAD_REQUEST, '', e.message, ''));
        }
    };

    update = async (req, res) => {
        try {
            const { id } = req.query;
            const kq = await routeService.update(id, req.body);
            res.send(response(statusCode.OK, kq, '', ''));
        } catch (e) {
            res.send(response(statusCode.BAD_REQUEST, '', e.message, ''));
        }
    };
}

module.exports = new RouteController();
