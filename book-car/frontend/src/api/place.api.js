import BaseApi from './base.api';

/**
 * Object authApi use to calling api login, register, verify
 */

class PlaceApi extends BaseApi {
    constructor() {
        super('places');
    }
}

export default new PlaceApi();
