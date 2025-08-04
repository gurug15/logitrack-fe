import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../../hooks/auth/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    // While checking auth status, don't render anything
    if (isLoading) {
        return null; // Or a loading spinner
    }

    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If roles are specified, check if the user has one of the allowed roles
    const isAuthorized = allowedRoles ? allowedRoles.includes(user.role) : true;

    if (!isAuthorized) {
        // Redirect to a 'not-authorized' page or back to their dashboard
        return <Navigate to="/dashboard" replace />; 
    }

    // If authenticated and authorized, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;