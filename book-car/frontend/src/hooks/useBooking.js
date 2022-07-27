import { useState, useEffect } from 'react';
import { bookingApi } from '../api';

export default function useBooking(method) {
    const [bookings, setBookings] = useState();

    const fetchBooking = async () => {
        try {
            if (method == 'all') {
                const { data } = await bookingApi.getByAd();
                setBookings(data);
            } else {
                const { data } = await bookingApi.get();
                setBookings(data);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, []);

    return bookings;
}
