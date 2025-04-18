
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('token'); 
 useEffect(()=>{
  
console.log("document",document.cookie); 
  console.log('Token:', Cookies.get('token'));
 },[])
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
