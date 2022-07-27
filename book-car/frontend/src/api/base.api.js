import axiosClient from './axiosClient';

class BaseApi {
    constructor(apiName) {
        this.apiName = apiName;
        this.axiosClient = axiosClient;
    }

    get = async () => {
        const res = await axiosClient({
            method: 'GET',
            url: `/${this.apiName}`,
        });
        return res;
    };

    getById = async (id) => {
        const res = await axiosClient({
            method: 'GET',
            url: `/${this.apiName}/${id}`,
        });
        return res;
    };

    getInforByProperties = async (propertyName, data) => {
        const res = await axiosClient({
            method: 'GET',
            url: `/${this.apiName}`,
            params: { [propertyName]: data },
        });
        return res;
    };

    createNew = async (body) => {
        const res = await axiosClient({
            method: 'POST',
            data: body,
            url: `/${this.apiName}`,
        });
        return res;
    };

    update = async (id, body) => {
        const res = await axiosClient({
            method: 'PUT',
            url: `/${this.apiName}`,
            params: { id },
            data: body,
        });
        return res;
    };
}

export default BaseApi;
