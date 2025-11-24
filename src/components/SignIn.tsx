import Input from "../UI/Input";
import Button from "../UI/Button";
import {RequestInterface} from "../Interface/request-interface";
import {Link, Navigate, redirect, useNavigate, useSubmit} from "react-router-dom";
import {BUTTON_CLASS, INPUT_BLOCK_CLASS, INPUT_CLASS, SIGN_IN_MAIN_CLASS} from "../constants/style.enums";
import React, {useEffect, useState} from "react";
import {UserInterface} from "../Interface/user-interface";
import {API_KEY, BIN_ID} from "../Store/userThunk";
import {useSelector} from "react-redux";
import {RootState} from "../Store/store";

export default function SignIn() {
    const navigate = useNavigate();
    const submit = useSubmit();

    const user = useSelector((state: RootState) => state.userStore.data);

    const [error, setError] = useState<string>();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        console.log("getSignInUser", user);
        if (user && user.hasOwnProperty('first_name')) {
            console.log("navigate")
            navigate('/profile', {replace: true});
        }
    }, [user]);

    const handleUserSignIn = async () => {
        const getRegisteredUser = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        const registeredUserList = await getRegisteredUser.json();

        const {sign_in, sign_up} = registeredUserList.record;

        console.log("registeredUserList", registeredUserList)

        const loggedUser = sign_up.find((user: any) => {
            if (user.email === form.email && user.password === form.password) {
                return user;
            }
        });

        console.log("loggedUser", loggedUser);

        const keys = Object.keys(loggedUser);
        if (keys.length > 1) {
            setError('')
            await submit(form, {method: "post", action: "/auth/sign-in"})
        } else {
            setError('Email or Password is Incorrect')
        }
    }

    const handleChange = (name: string, value: string) => {
        setForm((prev) => ({...prev, [name]: value}))
    }


    return <>
        <div className="mx-auto">
            <form method="post" className={SIGN_IN_MAIN_CLASS}>
                <Input
                    blockClass={INPUT_BLOCK_CLASS}
                    className={INPUT_CLASS}
                    placeholder="Email"
                    value={form.email}
                    onChange={(event: any) => {
                        handleChange('email', event.target.value)
                    }}
                    name='email'/>

                <Input className={INPUT_CLASS}
                       blockClass={INPUT_BLOCK_CLASS}
                       name='password'
                       placeholder="Password"
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
        const getRegisteredUser = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
            headers: {
                'X-Master-Key': API_KEY
            },
        });
        const registeredUserList = await getRegisteredUser.json();

        const {sign_in, sign_up} = registeredUserList.record;

        console.log("sign_in", sign_in);

        const loggedUser = sign_in.find((user: any) => {
            if (user.email === email && user.password === password) {
                return user;
            }
        });

        console.log("loggedUser", loggedUser)

        if (loggedUser) {
            registeredUserList.record.sign_in.push(loggedUser)
            const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY
                },
                body: JSON.stringify(registeredUserList.record)
            });
            if (!response.ok) {
                const errorData = await response.json();
                return {
                    error: errorData.message || "Sign in failed",
                    success: false
                };
            }
            return redirect("/feed");
        }
    } catch (error) {
        return {
            error: "Network error occurred",
            success: false
        };
    }
}