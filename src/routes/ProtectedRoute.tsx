import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { checkAuthentication } from '../store/authSlice';
import { setLoadingState } from '../store/userSlice';

const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, isCompleted } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(checkAuthentication());
    };
    fetch();
  }, [dispatch]);

  useEffect(() => {
  }, [isAuthenticated]);
  if (isCompleted) {
    dispatch(setLoadingState(false));
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  }
  else {
    dispatch(setLoadingState(true));
    return null;
  }
};

export default ProtectedRoute;
