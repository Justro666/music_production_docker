import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/loginSlice';
import { Navigate } from 'react-router-dom';

const RouteGuard = ({ children }) => {
  const dispatch = useDispatch();

  localStorage.getItem('name') || localStorage.getItem('token')
    ? dispatch(login(true))
    : dispatch(login(false));

  const loggedIn = useSelector((state) => state.login);

  if (loggedIn.value) return children;
  else return <Navigate to="/login" replace />;
};

export default RouteGuard;
