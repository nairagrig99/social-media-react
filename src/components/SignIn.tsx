import Input from "../UI/Input";
import Button from "../UI/Button";
import {RequestInterface} from "../Interface/request-interface";
import {Form, Link, redirect, useSubmit} from "react-router-dom";
import {BUTTON_CLASS, INPUT_CLASS, SIGN_IN_MAIN_CLASS} from "../constants/style.enums";
import React, {useState} from "react";

export default function SignIn() {

    const submit = useSubmit();

    const [error, setError] = useState<string>();

    const [form, setForm] = useState({
        email: '',
        password: ""
    });
    const handleUserSignIn = async () => {

        const getRegisteredUser = await fetch('http://localhost:3000/sign-up');
        const registeredUserList = await getRegisteredUser.json();

        const loggedUser = registeredUserList.map((user: any) => {
            console.log('user.email', user.email);
            console.log('form', form);

            if (user.email === form.email && user.password === form.password) {
                return user;
            }
        });

        console.log('response', registeredUserList);

        const keys = Object.keys(loggedUser[0]);

        console.log('qqqqqqqqqqqq', keys);

        if (Object.keys(loggedUser[0]).length > 1) {
            console.log('here work??????')
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
                    className={INPUT_CLASS}
                    value={form.email}
                    onChange={(event: any) => {
                        handleChange('email', event.target.value)
                    }}
                    name='email'/>

                <Input className={INPUT_CLASS}
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
    alert('ssssssss')
    const email = String(formData.get("email"));
    const password = formData.get("password");
    console.log('email', email);
    console.log('password', password);

    try {
        const signUpRequest = await fetch('http://localhost:3000/sign-up');

        if (!signUpRequest.ok) {
            return {
                error: "Sign up failed",
                success: false
            }
        }
        const signUpResponse = await signUpRequest.json();

        console.log('signUpRequest', signUpResponse);

        const response = await fetch('http://localhost:3000/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log('errorData',errorData)
            return {
                error: errorData.message || "Sign in failed",
                success: false
            };
        }
        return redirect("/profile");
    } catch (error) {

        return {
            error: "Network error occurred",
            success: false
        };
    }
}