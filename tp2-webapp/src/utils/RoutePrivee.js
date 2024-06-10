import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const RoutePrivee = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if(isLoading) {
        return <div>Chargement de la page...</div>;
    }

    return(
        isAuthenticated ? <Outlet /> : <Navigate to="/" />
    );
}

export default RoutePrivee;