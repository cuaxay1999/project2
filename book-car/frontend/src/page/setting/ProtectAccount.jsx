import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

export default function ProtectAccount() {
    const [userInfor, setUserInfor] = useState({ fullName: 'Trần Thế Chiến' });
    const onInputChange = (e, { name, value }) => {
        setUserInfor({
            ...userInfor,
            [name]: value,
        });
    };

    return (
        <>
            <div className='feature'>
                <p className='feature-label'>Thay đổi mật khẩu</p>
                <div className='feature-main'>
                    <Form widths='equal'>
                        <div className='d-flex'>
                            <Form.Input
                                name='fullName'
                                width='16'
                                fluid
                                label='Họ và tên'
                                onChange={onInputChange}
                                className='mg-r-12'
                                value={userInfor.fullName}
                            />
                            <Form.Input
                                name='email'
                                width='16'
                                fluid
                                label='Email'
                                onChange={onInputChange}
                                value={userInfor.email}
                            />
                        </div>
                        <Form.Input
                            name='password'
                            width='16'
                            fluid
                            label='Mật khẩu hiện tại'
                            onChange={onInputChange}
                            className='mg-r-12'
                            value={userInfor.password}
                            type='password'
                        />
                        <div className='d-flex'>
                            <Form.Input
                                name='newPass'
                                width='16'
                                fluid
                                label='Mật khẩu mới'
                                onChange={onInputChange}
                                className='mg-r-12'
                                value={userInfor.newPass}
                                type='password'
                            />
                            <Form.Input
                                name='reNewPass'
                                width='16'
                                fluid
                                label='Nhập lại mật khẩu mới'
                                onChange={onInputChange}
                                value={userInfor.reNewPass}
                                type='password'
                            />
                        </div>
                    </Form>
                </div>
            </div>

            <div className='feature'>
                <p className='feature-label'>Bảo mật 2 lớp</p>
                <div className='feature-main'></div>
            </div>

            <div className='feature'>
                <p className='feature-label'>Backup Code</p>
                <div className='feature-main'></div>
            </div>

            <div className='feature'>
                <p className='feature-label'>Các lần đăng nhập gần đây</p>
                <div className='feature-main'>Tính năng đang được phát triển</div>
            </div>
        </>
    );
}
