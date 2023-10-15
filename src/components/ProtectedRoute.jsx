import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {

  return (props.isLoggedIn === true) ? (<Component {...props} />) : (<Navigate to='/' replace />);
};
export default ProtectedRoute;