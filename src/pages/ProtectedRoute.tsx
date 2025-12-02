import React, {useEffect, useState, ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../Store/store";

type ProtectedRouteProps = {
    children: ReactNode;
};

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const loggedUser = useSelector((state: RootState) => state.userStore.signInUser);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (loggedUser) {
                    setIsAuthenticated(true);
                }

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
