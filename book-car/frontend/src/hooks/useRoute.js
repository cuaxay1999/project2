import { useEffect, useState } from 'react';
import { routeApi } from '../api';

const useRoute = (defaultValue) => {
    const [routes, setRoutes] = useState(defaultValue);

    const fetchRoute = async () => {
        var { data } = await routeApi.get();
        setRoutes(data);
    };
    useEffect(() => {
        fetchRoute();
    }, []);

    return [routes, fetchRoute];
};

export default useRoute;
