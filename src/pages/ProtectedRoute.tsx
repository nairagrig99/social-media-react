import React, {useEffect, useState, ReactNode} from "react";
import {Navigate} from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
};

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:3000/sign-in");
                const user = await response.json();
                setIsAuthenticated(user.length > 0);
            } catch (err) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/auth/sign-in" replace/>;

    return <>{children}</>;
}
