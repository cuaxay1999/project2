import { localStorageHelper } from '../helper';
import { authApi } from '../api';

/**
 *
 */
const AuthService = {
    checkAuthentication: async () => {
        const token = localStorageHelper.getAccessToken();
        const isAuthen = await authApi.verify(token);
        return isAuthen;
    },
};

export default AuthService;
