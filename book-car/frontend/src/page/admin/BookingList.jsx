import React from 'react';
import useBooking from '../../hooks/useBooking';
import Header from '../../layout/admin/Header';
import { format } from 'date-fns';
import { moneyFormatter } from '../../helper/format';
import { Button } from 'semantic-ui-react';
import { bookingApi } from '../../api';

const BookingList = () => {
    const bookings = useBooking('all');
    const cancelBooking = async (id) => {
        const kq = await bookingApi.update(id, { status: -1 });
        if (kq.statusCode === 200) {
            window.location.reload();
        }
    };
    const makeDone = async (id) => {
        const kq = await bookingApi.update(id, { status: 1 });
        if (kq.statusCode === 200) {
            window.location.reload();
        }
    };

    return (
        <>
            <Header title='Quản lý vé' />
            <div className='main-content'>
                <div className='col-12'>
                    <div className='box'>
                        <div className='box-header'>Quản lý vé xe</div>
                        <div className='box-body overflow-scroll'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Số điện thoại</th>
                                        <th>Tên khách hàng</th>
                                        <th>Ngày giờ đặt vé</th>
                                        <th>Trạng thái vé</th>
                                        <th>Tổng tiền thanh toán</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings &&
                                        bookings.map((booking) => (
                                            <tr>
                                                <td>{booking.phoneNumber}</td>
                                                <td>
                                                    <div className='order-owner'>
                                                        <span>{booking.fullName}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    {format(
                                                        new Date(booking.startDate),
                                                        'dd/MM/yyyy'
                                                    )}
                                                </td>
                                                <td>
                                                    <StatusItem status={booking.status} />
                                                </td>
                                                <td>{moneyFormatter(booking.total)} VND</td>
                                                <td>
                                                    {booking.status === 0 ? (
                                                        <div>
                                                            <Button
                                                                color='red'
                                                                size='mini'
                                                                onClick={() =>
                                                                    cancelBooking(booking.bookingId)
                                                                }
                                                            >
                                                                Hủy
                                                            </Button>
                                                            <Button
                                                                color='green'
                                                                size='mini'
                                                                onClick={() =>
                                                                    makeDone(booking.bookingId)
                                                                }
                                                            >
                                                                Done
                                                            </Button>
                                                        </div>
                                                    ) : null}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const StatusItem = ({ status }) => {
    if (status === 1) {
        return <span className='order-status order-shipped'>Đã hoàn thành</span>;
    }

    if (status === -1) {
        return <span className='order-status user-blocked'>Bị hủy</span>;
    }
    if (status === 0) {
        return <span className='order-status order-ready'>Đặt vé thành công</span>;
    }
};

export default BookingList;
