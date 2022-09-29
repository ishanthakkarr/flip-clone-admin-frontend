import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    // const auth = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    const token = window.localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/signin" />;
    // return <Route {...rest} component={(props) => {
    //     const token = window.localStorage.getItem('token');
    //     if (token) {
    //         return <Component {...props} />
    //     } else {
    //         // return <Redirect to={'/signin'} />
    //     }
    // }} />
}

export default PrivateRoute;