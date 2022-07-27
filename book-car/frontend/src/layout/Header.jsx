import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { localStorageHelper } from '../helper';
import { Button, Icon } from 'semantic-ui-react';
import { userApi } from '../api';

import { logo } from '../assets/img';

function Header() {
    const history = useHistory();
    const user = localStorageHelper.getItemByName('user');

    // Hàm đăng xuất
    const logout = () => {
        localStorageHelper.logout();
        history.push(history.location.pathname);
    };

    return (
        <header className='header-container'>
            <div className='header d-center-flex flex-sp-bt'>
                <div className='header-right d-center-flex'>
                    <img src={logo} alt='logo' />
                    <div className='navigation d-center-flex'>
                        <Link to='/'>
                            <div className='navigation-list'>
                                <Icon name='bus'></Icon>
                                Danh sách tuyến xe
                            </div>
                        </Link>
                        <Link to={`/bookings`}>
                            <div className='navigation-list'>
                                <Icon name='ticket'></Icon>
                                Chuyến đi của bạn
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='header-left d-center-flex'>
                    <div className='mg-r-12'>
                        <Button
                            content='Hotline'
                            color='red'
                            icon='phone'
                            label={{
                                as: 'a',
                                basic: true,
                                pointing: 'left',
                                content: '1900 8119',
                                color: 'red',
                            }}
                            labelPosition='right'
                        />
                    </div>

                    {user ? (
                        <div className='d-center-flex user-infor active'>
                            <Icon name='user outline' className='user--avt' />
                            <div className='user--name'>{user.fullName}</div>
                            <Icon name='caret down' className='large' />

                            <div className='more-action'>
                                <Link to='/setting' className='action-items'>
                                    <Icon name='cog' size='large' />
                                    <span>Cài đặt</span>
                                </Link>
                                <div className='action-items' onClick={logout}>
                                    <Icon name='sign-out alternate' size='large' />
                                    <span>Đăng xuất</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Link to='/auths/register' className='mg-r-12'>
                                <Button
                                    content='Đăng kí'
                                    color='green'
                                    icon='sign in'
                                    labelPosition='left'
                                />
                            </Link>

                            <Link to='/auths/login'>
                                <Button
                                    content='Đăng nhập'
                                    primary
                                    icon='user'
                                    labelPosition='left'
                                />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
