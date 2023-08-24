import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const token = useSelector((state) => state.user.token);
  
    return token ? <Route {...rest} element={<Element />} /> : <Navigate to="/" />
}
export default PrivateRoute;
