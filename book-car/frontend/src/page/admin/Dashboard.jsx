import React, { useState } from 'react';
import Header from '../../layout/admin/Header';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export default function Dashboard() {
    const [dateFilter, setDateFilter] = useState(new Date());

    return (
        <>
            <Header title='Dashboard' />
            <div className='main-content'>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            variant='inline'
                            margin='normal'
                            openTo='month'
                            disableFuture
                            format='MM/yyyy'
                            views={['year', 'month']}
                            value={dateFilter}
                            onChange={(date) => setDateFilter(date)}
                            autoOk
                        />
                    </MuiPickersUtilsProvider>
                </div>

                <div className='row'>
                    <div className='col-3 col-md-6 col-sm-12'>
                        <div className='box box-hover'>
                            <div className='counter'>
                                <div className='counter-title'>Tổng số vé</div>
                                <div className='counter-info'>
                                    <div className='counter-count'>6578</div>
                                    <i className='bx bx-shopping-bag'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-3 col-md-6 col-sm-12'>
                        <div className='box box-hover'>
                            <div className='counter'>
                                <div className='counter-title'>Tỉ lệ hoàn thành</div>
                                <div className='counter-info'>
                                    <div className='counter-count'>98.5%</div>
                                    <i className='bx bx-chat'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-3 col-md-6 col-sm-12'>
                        <div className='box box-hover'>
                            <div className='counter'>
                                <div className='counter-title'>Thực thu</div>
                                <div className='counter-info'>
                                    <div className='counter-count'>10000000</div>
                                    <i className='bx bx-money'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-3 col-md-6 col-sm-12'>
                        <div className='box box-hover'>
                            <div className='counter'>
                                <div className='counter-title'>Số lượt đăng ký mới</div>
                                <div className='counter-info'>
                                    <div className='counter-count'>690</div>
                                    <i className='bx bx-user'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-12'>
                        <div className='box'>
                            <div className='box-header'>Đặt vé gần đây</div>
                            <div className='box-body overflow-scroll'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Số điện thoại</th>
                                            <th>Tên khách hàng</th>
                                            <th>Ngày giờ đặt vé</th>
                                            <th>Trạng thái vé</th>
                                            <th>Tổng tiền thanh toán</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#2345</td>
                                            <td>
                                                <div className='order-owner'>
                                                    <span>Đặng Quang Anh</span>
                                                </div>
                                            </td>
                                            <td>2022-05-09</td>
                                            <td>
                                                <span className='order-status order-ready'>
                                                    Đã hoàn thành
                                                </span>
                                            </td>
                                            <td>125000 VNĐ</td>
                                        </tr>
                                        <tr>
                                            <td>#2345</td>
                                            <td>
                                                <div className='order-owner'>
                                                    <span>Cua</span>
                                                </div>
                                            </td>
                                            <td>2022-05-09</td>
                                            <td>
                                                <span className='order-status order-shipped'>
                                                    Đặt vé thành công
                                                </span>
                                            </td>
                                            <td>125000 VNĐ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
