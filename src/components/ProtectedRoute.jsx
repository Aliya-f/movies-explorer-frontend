import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route exact path={props.path}>
      {() =>
        props.loggedIn ? <Component {...props} /> : (<Navigate to='/signin' replace />)
      }
    </Route>
  );
};
export default ProtectedRoute;