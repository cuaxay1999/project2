import BaseApi from './base.api';

/**
 * Class UserApi -> calling API reference to user
 */

class UserApi extends BaseApi {
    constructor() {
        super('users');
    }

    getById = async () => {
        const kq = await this.axiosClient({
            method: 'GET',
            url: `/${this.apiName}/getById`,
        });
        return kq;
    };

    updateSeft = async (body) => {
        const res = await this.axiosClient({
            method: 'PUT',
            url: `/${this.apiName}/self`,
            data: body,
        });
        return res;
    };
}

export default new UserApi();
