import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Spinner from '../components/Spinner/Spinner';
import Confirmation from '../pages/Confirmation/Confirmation';

const AppRoutes: React.FC = () => {

  return (
    <>
      <Spinner />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Confirmation" element={<Confirmation />} />


        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
