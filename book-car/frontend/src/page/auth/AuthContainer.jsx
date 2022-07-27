import React, { lazy } from 'react';
import { authHelper } from '../../helper';

import bk from '../../assets/img/logobk.png';

import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

const Login = lazy(() => import('./Login'));
const Signup = lazy(() => import('./Signup'));
const ActivateAccount = lazy(() => import('./ActivateAccount'));

function Authentication() {
    const match = useRouteMatch();

    if (authHelper.isAuthenticated()) {
        return <Redirect to='/home' />;
    }

    return (
        <div className='authentication'>
            <img src={bk} alt='logo' />
            <Switch>
                <Route path={`${match.path}/login`} component={Login} />
                <Route path={`${match.path}/register`} component={Signup} />
                <Route path={`${match.path}/active-account`} component={ActivateAccount} />
            </Switch>
        </div>
    );
}

export default Authentication;
