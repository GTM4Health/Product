// Part of Authentication.
// Didn't work. Currently Archived.
// To be removed later.

import { Router } from 'express';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the user is authenticated

  return isAuthenticated ? (
    <Router>
        <Routes>
            <Route {...rest} element={<Element />} />
        </Routes>
    </Router>
  ) : (
    <Navigate to="/login" replace />
  );
};

//export default PrivateRoute;
