import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { authApi } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Signup() {
    const options = [
        { key: 'm', text: 'Nam', value: '0' },
        { key: 'f', text: 'Nữ', value: '1' },
        { key: 'o', text: 'Khác', value: '2' },
    ];

    const [formInput, setFormInput] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        gender: '0',
        password: '',
        repassword: '',
    });

    const [submit, setSubmit] = useState(false);
    const [errorInput, setErrorInput] = useState({
        fullName: false,
        email: false,
        phoneNumber: false,
        password: false,
        repassword: false,
    });

    const history = useHistory();

    const onSubmit = async () => {
        setSubmit(true);
        const { fullName, email, password, phoneNumber, gender } = formInput;
        const kq = await authApi.register({ fullName, email, password, phoneNumber, gender });
        if (kq.statusCode === 201) {
            history.push('/auths/active-account');
        } else toast.error(kq.userMessage);
    };

    const onChange = (e, { name, value }) => {
        setFormInput({
            ...formInput,
            [name]: value.trim(),
        });
    };

    useEffect(() => {
        const { fullName, email, phoneNumber, password, repassword } = formInput;
        setErrorInput({
            ...errorInput,
            fullName: submit && !Boolean(fullName.trim()),
            email: submit && !Boolean(email.trim()),
            phoneNumber: submit && !Boolean(phoneNumber.trim()),
            password: submit && !Boolean(password.trim()),
            repassword: submit && !Boolean(repassword.trim()),
        });
    }, [formInput, submit]);

    return (
        <div className='signup'>
            <ToastContainer
                position='top-right'
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                autoClose={5000}
            />
            <h2>ĐĂNG KÝ</h2>
            <Form onSubmit={onSubmit} widths='equal'>
                <Form.Input
                    onChange={onChange}
                    name='fullName'
                    error={errorInput.fullName}
                    width='16'
                    fluid
                    label='Họ tên'
                    placeholder='Họ tên...'
                    id='form-input-first-name'
                />
                <Form.Input
                    onChange={onChange}
                    name='email'
                    error={errorInput.email}
                    fluid
                    label='Email'
                    placeholder='Nhập email...'
                />
                <Form.Input
                    onChange={onChange}
                    name='phoneNumber'
                    error={errorInput.phoneNumber}
                    fluid
                    label='Số điện thoại'
                    placeholder='Nhập số điện thoại...'
                />
                <Form.Select
                    onChange={onChange}
                    name='gender'
                    options={options}
                    value={formInput.sex}
                    label='Giới tính'
                />
                <Form.Input
                    onChange={onChange}
                    type='password'
                    name='password'
                    error={errorInput.password}
                    fluid
                    label='Mật khẩu'
                    placeholder='Nhập mật khẩu...'
                />
                <Form.Input
                    onChange={onChange}
                    type='password'
                    name='repassword'
                    error={errorInput.repassword}
                    fluid
                    label='Nhập lại mật khẩu'
                    placeholder='Nhập lại mật khẩu...'
                />
                <div className='outer-btn'>
                    <Button negative>Đăng ký</Button>
                </div>
            </Form>

            <div className='link-to'>
                Bạn đã có tài khoản?
                <Link to='/auths/login'> Đăng nhập</Link>
            </div>
        </div>
    );
}

export default Signup;
