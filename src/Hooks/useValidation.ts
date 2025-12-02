import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../Store/store";

type FormValues = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    re_password: string;
    gender: string;
    birthOfDate: string;
    country: string;
    city: string;
};

type Errors = { [key in keyof FormValues]?: string };

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export function useFormValidation(initialValues: FormValues) {
    const [form, setFormValues] = useState<FormValues>(initialValues);
    const select = useSelector((state: RootState) => state.userStore.users)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {

    }, [select]);

    const validateForm = async (values: FormValues) => {

        const newErrors: Errors = {};

        if (values.first_name.trim().length <= 3) {
            newErrors.first_name = "First name is important";
        }

        if (values.last_name.trim().length <= 3) {
            newErrors.last_name = "Last name is important";
        }

        if (values.email.trim().length <= 3) {
            newErrors.email = "Email is important";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            newErrors.email = "Invalid email format";
        } else {
            const isEmailExist = select.find((data: FormValues) => data.email === values.email)
            if (isEmailExist) {
                newErrors.email = 'Email is already exist, attempt another'
            }
        }

        const phoneRegExp = /^\+?[0-9]{7,15}$/;

        if (values.phone.trim().length > 3 && !phoneRegExp.test(values.phone)) {
            newErrors.phone = "Phone is important";
        }

        if (!passwordRegex.test(values.password.trim())) {
            newErrors.password =
                "Password must contain At least 8 characters At least one uppercase letter, At least one lowercase letter, At least one digit, At least one special character";
        }

        if (values.re_password.trim().length < 8) {
            newErrors.re_password = "Re-Password is important";
        } else if (values.re_password !== values.password) {
            newErrors.re_password = "Passwords are not equal";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (name: keyof FormValues, value: string) => {
        setFormValues((prev) => ({...prev, [name]: value}));
    };

    return {
        form,
        errors,
        setErrors,
        handleChange,
        validateForm,
    };
}