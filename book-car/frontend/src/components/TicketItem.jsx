import React, { useState, useEffect } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { bookingCode } from '../enums/code';
import { format } from 'date-fns';

export default function TicketItem({ infor, handleClick }) {
    const status = infor.status;
    const [bgColor, setBgColor] = useState('#21ba45');

    const a = format(new Date(infor.startDate), 'dd/MM/yyyy');
    useEffect(() => {
        if (status === bookingCode.DONE) setBgColor('#21ba45');
        if (status === bookingCode.ACCEPTED) setBgColor('#2185d0');
        if (status === bookingCode.CANCEL) setBgColor('#e84c3d');
    }, [status]);

    return (
        <div className='cardWrap' onClick={() => handleClick(infor)}>
            <div className='card cardLeft'>
                <div className='top' style={{ backgroundColor: bgColor }}>
                    <span>
                        <Icon name='map marker alternate'></Icon>
                        {infor.startPlace}
                    </span>
                    <span>
                        <Icon name='location arrow'></Icon>
                        {infor.endPlace}
                    </span>
                </div>

                <div className='main'>
                    <div className='card-item'>
                        <p className='border-bottom'>
                            Người đặt: <span>{infor.fullName}</span>
                        </p>
                    </div>

                    <div className='date-time d-flex'>
                        <Popup
                            trigger={
                                <div className='card-item flex-1'>
                                    <Icon name='calendar alternate outline'></Icon>
                                    <span>{a}</span>
                                </div>
                            }
                            content={<div>Ngày đặt vé {a}</div>}
                            position='top center'
                            size='mini'
                        />

                        <Popup
                            trigger={
                                <div className='card-item flex-1'>
                                    <Icon name='clock'></Icon>
                                    <span>{infor.startTime}</span>
                                </div>
                            }
                            content={<div>Thời gian xe chạy: {infor.startTime}</div>}
                            position='left center'
                            size='mini'
                        />
                    </div>
                    <div className='payment d-flex'>
                        <div className='card-item flex-1'>
                            <Icon name='usd' color='green'></Icon>
                            <span>{infor.price} VNĐ</span>
                        </div>
                        <div className='card-item flex-1'>
                            <Icon name='ticket'></Icon>
                            <span>{infor.quantity}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card cardRight'>
                <div className='top' style={{ backgroundColor: bgColor }} title='ticket id'>
                    <p className='w-full'>{infor.bookingId}</p>
                </div>

                <div className='main'>
                    {status === bookingCode.DONE ? (
                        <p className='ticket-status done'>Đã hoàn tất</p>
                    ) : null}
                    {status === bookingCode.CANCEL ? (
                        <p className='ticket-status cancel'>Bị hủy</p>
                    ) : null}
                    {status === bookingCode.ACCEPTED ? (
                        <p className='ticket-status running'>Chưa sử dụng</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
