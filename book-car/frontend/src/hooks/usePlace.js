import { useEffect, useState } from 'react';
import { placeApi } from '../api';

const usePlace = (propertyName, data) => {
    const [places, setPlaces] = useState([]);

    const fetchPlace = async () => {
        var kq = await placeApi.getInforByProperties(propertyName, data);
        setPlaces(kq.data);
    };
    useEffect(() => {
        fetchPlace();
    }, []);

    return [places, setPlaces];
};

export default usePlace;
