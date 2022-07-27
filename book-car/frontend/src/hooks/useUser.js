import React, { useState, useEffect } from 'react';
import { userApi } from '../api';

const useUser = () => {
    const [users, setUsers] = useState();
    const fetchUser = async () => {
        let { data } = await userApi.get();
        setUsers(data);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return [users, fetchUser];
};

export default useUser;
