const localStorageHelper = {
    getAccessToken: () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) return user.accessToken;
            return null;
        } catch (e) {
            return null;
        }
    },

    getPhoneNumber: () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) return user.phoneNumber;
            return null;
        } catch (e) {
            return null;
        }
    },

    getAdminAccessToken: () => {
        try {
            const admin = JSON.parse(localStorage.getItem('admin'));
            if (admin) return admin.accessToken;
            return null;
        } catch (e) {
            return null;
        }
    },

    logout: () => {
        return localStorage.removeItem('user');
    },

    adminLogout: () => {
        return localStorage.removeItem('admin');
    },

    setLocalStorage: (itemName, data) => {
        if (data) {
            try {
                const dataJson = JSON.stringify(data);
                localStorage.setItem(itemName, dataJson);
            } catch (e) {
                console.log(e);
            }
        }
    },

    getItemByName: (itemName) => {
        if (itemName && Boolean(itemName.trim())) {
            return JSON.parse(localStorage.getItem(itemName));
        } else return null;
    },
};

export default localStorageHelper;
