import React, { useState } from 'react';
import { Button, Form, Checkbox, Icon } from 'semantic-ui-react';
import authApi from '../../api/auth.api';
import { localStorageHelper } from '../../helper';
import { statusCode } from '../../enums/code';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';

function Login({ history }) {
    const [loginInput, setLoginInput] = useState({
        phoneNumber: null,
        password: null,
    });

    const [hasError, setHasError] = useState(false);

    function onInputChange(e, { name, value }) {
        setLoginInput({
            ...loginInput,
            [name]: value.trim(),
        });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await authApi.login(loginInput);
        if (response.statusCode === statusCode.OK) {
            setHasError(false);
            localStorageHelper.setLocalStorage('user', response.data);
            history.push('/home');
        } else {
            toast.error(response.userMessage);
        }
    };

    return (
        <div className='login'>
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
            <h3>Đăng nhập</h3>
            <Form widths='equal' onSubmit={handleLogin}>
                <Form.Input
                    name='phoneNumber'
                    width='16'
                    fluid
                    label='Số điện thoại'
                    placeholder='Số điện thoại di động'
                    onChange={onInputChange}
                />
                <Form.Input
                    name='password'
                    width='16'
                    fluid
                    label='Mật khẩu'
                    placeholder='Mật khẩu'
                    type='password'
                    onChange={onInputChange}
                />
                <Checkbox label='Ghi nhớ đăng nhập' />

                {hasError && (
                    <div className='has-error'>
                        <Icon name='redo alternate' size='large' />

                        <span>Đăng nhập thất bại </span>
                    </div>
                )}

                <div className='outer-btn'>
                    <Button primary type='submit'>
                        Đăng nhập
                    </Button>
                </div>
            </Form>

            <div className='link-to'>
                Bạn chưa có tài khoản?
                <Link to='/auths/register'> Đăng kí ngay</Link>
            </div>
        </div>
    );
}

export default Login;
