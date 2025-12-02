import React, {useEffect} from 'react';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import SignIn, {createSignInAction} from "./components/SignIn";
import SignUp, {createSignUpAction} from "./components/SignUp";
import RootLayout from "./pages/RootLayout";
import AuthenticationPage from "./pages/AuthenticationPage";
import ErrorPage from "./pages/ErrorPage";
import AccountPage from "./pages/AccountPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import UserFeed from "./pages/UserFeed";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./Store/store";
import StoriesCreatePage from "./pages/StoriesCreatePage";
import {fetchUser} from "./Store/userThunk";
import {getSignInUser} from "./Store/userSlice";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: 'auth',
                element: <AuthenticationPage/>,
                children: [
                    {
                        index: true,
                        element: <Navigate to="sign-in" replace/>
                    },
                    {
                        path: 'sign-in',
                        element: <SignIn/>,
                        action: createSignInAction
                    },
                    {
                        path: 'sign-up',
                        element: <SignUp/>,
                        action: createSignUpAction
                    }
                ]
            }
        ]
    },
    {
        index: true,
        element: <Navigate to="/auth" replace/>
    },
    {
        path: '/profile',
        element: (
            <ProtectedRoute>
                <AccountPage/>
            </ProtectedRoute>
        )
    },
    {path: '/feed', element: <UserFeed/>},
    {
        path: "/stories/create",
        element: <StoriesCreatePage/>
    }
])

function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchUser())
        dispatch(getSignInUser())
    }, []);

    return <>
        <RouterProvider router={router}/>;
    </>

}

export default App;


