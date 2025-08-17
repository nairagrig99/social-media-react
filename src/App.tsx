import React from 'react';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import SignIn, {createSignInAction} from "./components/SignIn";
import SignUp, {createSignUpAction} from "./components/SignUp";
import RootLayout from "./pages/RootLayout";
import AuthenticationPage from "./pages/AuthenticationPage";
import ErrorPage from "./pages/ErrorPage";
import AccountPage from "./pages/AccountPage";

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
    }, {
        path: '/profile',
        element: <AccountPage/>
    }
])

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
