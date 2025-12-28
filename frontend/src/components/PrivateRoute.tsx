import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem('access');
  if (!token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PrivateRoute;
