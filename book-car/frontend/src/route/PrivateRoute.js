import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authHelper } from '../helper';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page

        <Route
            {...rest}
            render={(props) =>
                authHelper.isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/auths/login', state: { from: props.location } }} />
                )
            }
        />
    );
};

export default PrivateRoute;
