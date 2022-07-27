import React, { lazy } from 'react';
import SideBar from '../../layout/admin/SideBar';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { localStorageHelper } from '../../helper';

const Dashboard = lazy(() => import('./Dashboard'));
const UserList = lazy(() => import('./UserList'));
const RouteList = lazy(() => import('./RouteList'));
const BookingList = lazy(() => import('./BookingList'));

export default function AdminContainer() {
    const history = useHistory();
    const user = localStorageHelper.getItemByName('user');
    if (!user) {
        history.push('/login/admin');
    } else if (user.type === 0) {
        localStorageHelper.logout();
        history.push('/login/admin');
    }
    return (
        <div className='admin'>
            <SideBar />
            <div className='main'>
                <Switch>
                    <Route exact path='/admin' component={Dashboard} />
                    <Route path='/admin/routes' component={RouteList} />
                    <Route path='/admin/users' component={UserList} />
                    <Route path='/admin/bookings' component={BookingList} />
                    <Route path='/admin/account' component={Dashboard} />
                </Switch>
            </div>
        </div>
    );
}
