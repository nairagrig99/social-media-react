import Input from "../UI/Input";
import Button from "../UI/Button";
import {RequestInterface} from "../Interface/request-interface";
import {Link, Navigate, redirect, useActionData, useNavigate, useSubmit} from "react-router-dom";
import {BUTTON_CLASS, INPUT_BLOCK_CLASS, INPUT_CLASS, SIGN_IN_MAIN_CLASS} from "../constants/style.enums";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../Store/store";
import {UserInterface} from "../Interface/user-interface";
import {setSignInUser} from "../Store/userSlice";

export default function SignIn() {

    const submit = useSubmit();
    const data = useActionData();
    const [error, setError] = useState<string>();
    const [redirect, setRedirect] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const users = useSelector((state: RootState) => state.userStore.users);
    const signInUser = useSelector((state: RootState) => state.userStore.signInUser);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (data && data.success) {
            dispatch(setSignInUser(data.loggedUser));
            navigate("/feed")
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (signInUser.email) {
            setRedirect(true);
        } else {
            setRedirect(false);
        }

    }, [signInUser]);

    const handleUserSignIn = async () => {

        const loggedUser = users.find((user: any) => {
            if (user.email === form.email && user.password === form.password) {
                return user;
            }
        });
        const keys = loggedUser && Object.keys(loggedUser);
        if (keys && keys.length > 1) {
            setError('')
            await submit(form, {method: "post", action: "/auth/sign-in"})
        } else {
            setError('Email or Password is Incorrect')
        }
    }

    const handleChange = (name: string, value: string) => {
        setForm((prev) => ({...prev, [name]: value}))
    }
    if (redirect) {
        return <Navigate to={'/profile'} replace/>
    }

    return <>
        <div className="mx-auto">
            <form method="post" className={SIGN_IN_MAIN_CLASS}>
                <Input
                    blockClass={INPUT_BLOCK_CLASS}
                    className={INPUT_CLASS}
                    value={form.email}

                    onChange={(event: any) => {
                        handleChange('email', event.target.value)
                    }}
                    name='email'/>

                <Input className={INPUT_CLASS}
                       blockClass={INPUT_BLOCK_CLASS}
                       name='password'
                       value={form.password}
                       onChange={(event: any) => {
                           handleChange('password', event.target.value)
                       }}
                       errors={error}
                       type="password"/>

                <Button type="button"

                        className={BUTTON_CLASS}
                        onClick={handleUserSignIn}
                        value="Sign In"/>

            </form>

            <b className="text-center w-full flex justify-center gap-4">You don't have an Account ?
                <Link to="/auth/sign-up" className="underline">Sign Up</Link></b>
        </div>
    </>
}

export async function createSignInAction({request}: RequestInterface) {
    const formData = await request.formData();
    const email = String(formData.get("email"));
    const password = formData.get("password");

    try {
        const getRegisteredUser = await fetch('http://localhost:3000/users');
        const registeredUserList = await getRegisteredUser.json();

        const loggedUser = registeredUserList.find((user: UserInterface) => {
            if (user.email === email && user.password === password) {
                return user;
            }
        });

        if (loggedUser) {

            return {
                loggedUser,
                success: true
            }
        }

    } catch (error) {
        return {
            error: "Network error occurred",
            success: false
        };
    }
}
