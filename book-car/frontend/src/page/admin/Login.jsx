import React, { lazy, useState } from 'react';
import { authHelper } from '../../helper';

import bk from '../../assets/img/logobk.png';
import { Form, Checkbox, Button, Icon } from 'semantic-ui-react';
import { Switch, Route, useRouteMatch, Redirect, useHistory, Link } from 'react-router-dom';
import authApi from '../../api/auth.api';
import { localStorageHelper } from '../../helper';
import { statusCode } from '../../enums/code';

function AdminLogin() {
    const history = useHistory();
    const user = localStorageHelper.getItemByName('user');

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

    if (authHelper.isAuthenticated() && user.type === 2) {
        debugger;
        return <Redirect to='/admin' />;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await authApi.login(loginInput);
        if (response.statusCode === statusCode.OK) {
            setHasError(false);
            localStorageHelper.setLocalStorage('user', response.data);
            history.push('/admin');
        } else setHasError(true);
    };
    return (
        <div className='authentication'>
            <img src={bk} alt='logo' />
            <div className='login'>
                <h3>Đăng nhập admin</h3>
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
            </div>
        </div>
    );
}

export default AdminLogin;
