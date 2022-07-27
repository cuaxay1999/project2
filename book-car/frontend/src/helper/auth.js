import localStorageHelper from './localStorage';

const authHelper = {
    isAuthenticated: () => {
        const token = localStorageHelper.getAccessToken();
        if (token) return true;
        return false;
    },
};

export default authHelper;
