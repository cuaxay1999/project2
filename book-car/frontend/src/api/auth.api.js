import api from './axiosClient';
import BaseApi from './base.api';

/**
 * Object authApi use to calling api login, register, verify
 */

class AuthApi extends BaseApi {
    constructor() {
        super('auths');
    }
    /**
     * call login api
     * @param {String} phoneNumber Số điện thoại
     * @param {String} password Password
     * @returns loginInfor
     */
    login = async ({ phoneNumber, password }) => {
        const loginInfo = await api({
            method: 'POST',
            url: '/auths/login',
            data: { phoneNumber, password },
        });
        return loginInfo;
    };

    /**
     * call register api
     * @param {Object} newUser
     * @returns
     */
    register = async (newUser) => {
        const data = await api({
            method: 'POST',
            url: '/auths/register',
            data: newUser,
        });
        return data;
    };

    /**
     * verify accessToken
     * @param {String} accessToken
     * @returns
     */
    verify = async (accessToken) => {
        const res = await api({
            method: 'POST',
            url: '/auths/verify',
            data: { accessToken },
        });

        return res.data;
    };
}

export default new AuthApi();
