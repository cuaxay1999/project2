import BaseApi from './base.api';
import axiosClient from './axiosClient';
/**
 * Object bookingApi use to calling api bookings
 */

class PlaceApi extends BaseApi {
    constructor() {
        super('bookings');
    }

    getByAd = async () => {
        const res = await axiosClient({
            method: 'GET',
            url: `/${this.apiName}/all`,
        });
        return res;
    };
}

export default new PlaceApi();
