import React from 'react';
import { Link } from 'react-router-dom';
export default function ActivateAccount() {
    return (
        <div className='active-account-container'>
            <h1 className='success-title'>Đăng kí tài khoản thành công !!</h1>
            <p className='sub-title'>Cảm ơn bạn đã đăng ký tài khoản của chúng tôi.</p>
            <p className='sub-title'>Để kích hoạt tài khoản vui lòng kiểm tra email</p>
            <Link to='/auths/login' className='btn--save'>
                Đăng nhập ngay
            </Link>
        </div>
    );
}
