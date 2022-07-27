import React from 'react';
import { NavLink } from 'react-router-dom';
import { localStorageHelper } from '../../helper';

export default function SideBar() {
    const user = localStorageHelper.getItemByName('user');

    const logout = () => {
        localStorageHelper.logout();
        window.location.reload();
    };
    return (
        <div className='sidebar'>
            <div className='sidebar-logo'>
                <img src='' alt='Comapny logo' />
                <div className='sidebar-close' id='sidebar-close'>
                    <i className='bx bx-left-arrow-alt'></i>
                </div>
            </div>
            <div className='sidebar-user'>
                <div className='sidebar-user-info'>
                    <div className='sidebar-user-name'>{user && user.fullName}</div>
                </div>
                <button className='btn btn-outline' onClick={logout}>
                    <i className='bx bx-log-out bx-flip-horizontal'></i>
                </button>
            </div>
            <ul className='sidebar-menu'>
                <li>
                    <NavLink activeClassName='active' exact to='/admin'>
                        <i className='bx bx-home'></i>
                        <span>Tổng quan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        activeClassName='active'
                        to='/admin/routes'
                        className='sidebar-menu-dropdown'
                    >
                        <i className='bx bx-category'></i>
                        <span>Lộ trình xe</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName='active' to='/admin/users'>
                        <i className='bx bx-shopping-bag'></i>
                        <span>Quản lý khách hàng</span>
                    </NavLink>
                </li>
                <li className='sidebar-submenu'>
                    <NavLink
                        activeClassName='active'
                        to='/admin/bookings'
                        className='sidebar-menu-dropdown'
                    >
                        <i className='bx bx-user-circle'></i>
                        <span>Quản lý vé xe</span>
                    </NavLink>
                </li>
                <li className='sidebar-submenu'>
                    <NavLink
                        activeClassName='active'
                        to='/admin/setting'
                        className='sidebar-menu-dropdown'
                    >
                        <i className='bx bx-cog'></i>
                        <span>settings</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}
