import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {

  return (props.isLoggedIn === false) ? (<Navigate to='/' replace />) : (<Component {...props} />);
};
export default ProtectedRoute;