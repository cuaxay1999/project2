const placeService = require('../services/place.service');
const response = require('../enums/reponse');
const { statusCode } = require('../enums/code');

class PlaceController {
    getPlace = async (req, res) => {
        console.log('GET: Place');
        const propertyName = Object.keys(req.query)[0];
        if (!propertyName) {
            return res.send('hihi');
        }
        const data = req.query[propertyName];
        const kq = await placeService.getPlace(propertyName, data);

        return res
            .status(200)
            .json(response(kq.length > 0 ? statusCode.OK : statusCode.NO_CONTENT, kq, '', ''));
    };
}

module.exports = new PlaceController();
