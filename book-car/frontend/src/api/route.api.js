import BaseApi from './base.api';

/**
 * Class UserApi -> calling API reference to user
 */

class RouteApi extends BaseApi {
    constructor() {
        super('routes');
    }

    search = async (start, end) => {
        const kq = await this.axiosClient({
            method: 'GET',
            url: `/${this.apiName}/search`,
            params: { start, end },
        });
        return kq;
    };
}

export default new RouteApi();
