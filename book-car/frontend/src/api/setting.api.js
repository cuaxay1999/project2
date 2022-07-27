import BaseApi from './base.api';

/**
 * Class UserApi -> calling API reference to user
 */

class SettingApi extends BaseApi {
    constructor() {
        super('settings');
    }

    //
    activateF2A = async () => {
        const kq = await this.axiosClient({
            method: 'GET',
            url: `/${this.apiName}/f2A`,
        });
        return kq;
    };

    // Get setting infor
    getSettingInfors = async () => {
        const kq = await this.axiosClient({
            method: 'GET',
            url: `/${this.apiName}`,
        });
        return kq;
    };

    deactiveF2A = async () => {
        const kq = await this.axiosClient({
            method: 'GET',
            url: `/${this.apiName}/f2A/deactive`,
        });
        return kq;
    };

    verifyOTP = async (otp) => {
        const kq = await this.axiosClient({
            method: 'POST',
            url: `/${this.apiName}/f2A/verify/otp`,
            data: { otp },
        });
        return kq;
    };

    verifyBackupCode = async (backupCode) => {
        const kq = await this.axiosClient({
            method: 'POST',
            url: `/${this.apiName}/f2A/verify/backup`,
            data: { backupCode },
        });
        return kq;
    };

    confirmPassword = async (password) => {
        const res = await this.axiosClient({
            method: 'POST',
            url: '/verify/password',
            data: { password },
        });

        return res;
    };
}

export default new SettingApi();
