import React from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from "./Preloader/Preloader"


const ProtectedRoute = ({ isLoading, isLoggedIn, element: Component, ...props }) => {

  return (
    <>
    {isLoading ? (
      <Preloader isLoading={isLoading}/>
      ) : (
    
      isLoggedIn ? (<Component {...props} />) : (<Navigate to='/' replace />))
    };
    </>)}

export default ProtectedRoute;