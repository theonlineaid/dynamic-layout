import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
