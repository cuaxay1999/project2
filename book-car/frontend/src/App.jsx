import React from 'react';
import Loader from './components/Loader';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom';

import PrivateRoute from './route/PrivateRoute';
const HomeContainer = React.lazy(() => import('./page/home/HomeContainer'));
const TicketContainer = React.lazy(() => import('./page/ticket/TicketContainer'));
const AuthContainer = React.lazy(() => import('./page/auth/AuthContainer'));
const AdminContainer = React.lazy(() => import('./page/admin/AdminContainer'));
const Login = React.lazy(() => import('./page/admin/Login'));
const Forbidden = React.lazy(() => import('./page/error/Forbidden'));
const SettingContainer = React.lazy(() => import('./page/setting/SettingContainer'));

function App() {
    const history = useHistory();
    return (
        <Router className='App' history={history}>
            <React.Suspense fallback={<Loader />}>
                <Switch>
                    <Route path='/admin' component={AdminContainer} />
                    <Route path='/403' component={Forbidden} />
                    <Route exact path='/'>
                        <Redirect to='/home' />
                    </Route>
                    <Route path='/auths' component={AuthContainer} />
                    <Route path='/home' component={HomeContainer} />
                    <PrivateRoute exact path='/bookings' component={TicketContainer} />
                    <Route exact path='/login/admin' component={Login} />
                    <PrivateRoute path='/setting' component={SettingContainer} />
                </Switch>
            </React.Suspense>
        </Router>
    );
}

export default App;
