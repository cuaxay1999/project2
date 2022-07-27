const placeModel = require('../models/place.model');

class PlaceService {
    getPlace = async (propertyName, data) => {
        const res = await placeModel.getPlaceByProperty(propertyName, data);
        return res;
    };
}

module.exports = new PlaceService();
