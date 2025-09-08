import Input from "../UI/Input";
import Button from "../UI/Button";
import {Link, useSubmit} from "react-router-dom";
import {BUTTON_CLASS, INPUT_BLOCK_CLASS, INPUT_CLASS, SIGN_IN_MAIN_CLASS} from "../constants/style.enums";
import Select from "../UI/Select";
import {useEffect, useState} from "react";
import {Country} from "../Interface/select-interface";
import {RequestInterface} from "../Interface/request-interface";
import {useFormValidation} from "../Hooks/useValidation";
import { redirect } from "react-router-dom";

const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    re_password: "",
    gender: "",
    birthOfDate: "",
    country: "",
    city: ""
}
export default function SignUp() {
    const {
        form,
        errors,
        handleChange,
        validateForm,
    } = useFormValidation(initialState);

    const submit = useSubmit();
    const [countries, setCountries] = useState([]);
    const [allData, setAllData] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [cities, setCities] = useState<string[]>([]);

    useEffect(() => {
        findCities()
    }, [selectedCountry]);

    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries')
            .then(response => response.json())
            .then(data => {
                const countriesList = data.data.map((d: any) => d.country);
                setAllData(data.data)
                setCountries(countriesList);
                setSelectedCountry(countriesList[0])
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const handleCountry = (selectedCountry: string) => {
        setSelectedCountry(selectedCountry);
        handleChange('country', selectedCountry)
    }

    const findCities = () => {
        allData.forEach((region) => {
            if (region.country === selectedCountry) {
                setCities(region.cities)
            }
        })
    }

    const handleCity = (selectedCity: string) => {
        handleChange('city', selectedCity)
    }
    const availableAgeList = () => {
        const currentYear = new Date().getFullYear();

        const years = [];
        for (let i = 1950; i <= currentYear - 10; i++) {
            years.push(String(i))
        }
        return years;
    }

    return <div>
        <form className={SIGN_IN_MAIN_CLASS}>
            <Input name="first_name"
                   className={INPUT_CLASS}
                   errors={errors.first_name}
                   value={form.first_name}
                   blockClass={INPUT_BLOCK_CLASS}
                   onChange={(event: any) => handleChange('first_name', event.target.value)}
                   placeholder="First Name"/>

            <Input name="last_name"
                   className={INPUT_CLASS}
                   errors={errors.last_name}
                   value={form.last_name}
                   blockClass={INPUT_BLOCK_CLASS}
                   onChange={(event: any) => handleChange('last_name', event.target.value)}
                   placeholder="Last Name"/>

            <Input name="email"
                   className={INPUT_CLASS}
                   errors={errors.email}
                   value={form.email}
                   blockClass={INPUT_BLOCK_CLASS}
                   onChange={(event: any) => handleChange('email', event.target.value)}
                   placeholder="Email"/>

            <Input name="phone"
                   type="tel"
                   className={INPUT_CLASS}
                   errors={errors.phone}
                   value={form.phone}
                   blockClass={INPUT_BLOCK_CLASS}
                   onChange={(event: any) => handleChange('phone', event.target.value)}
                   placeholder="Phone Number"/>

            <Input name="password"
                   type="password"
                   value={form.password}
                   errors={errors.password}
                   className={INPUT_CLASS}
                   blockClass={INPUT_BLOCK_CLASS}
                   onChange={(event: any) => handleChange('password', event.target.value)}
                   placeholder="Password"/>

            <Input name="re_password"
                   type="password"
                   errors={errors.re_password}
                   className={INPUT_CLASS}
                   blockClass={INPUT_BLOCK_CLASS}
                   onChange={(event: any) => handleChange('re_password', event.target.value)}
                   value={form.re_password}
                   placeholder="Re-Password"/>

            <div className="flex justify-between mb-4">
                <Input type="radio"
                       id="male"
                       label="Male"
                       name="gender"
                       value="Male"
                       blockClass={INPUT_BLOCK_CLASS}
                       onChange={(event) => handleChange('gender', 'Male')}
                       labelClass="flex gap-1.5"/>

                <Input type="radio"
                       id="female"
                       label="Female"
                       name="gender"
                       value="Female"
                       blockClass={INPUT_BLOCK_CLASS}
                       onChange={(event) => handleChange('gender', 'Female')}
                       labelClass="flex gap-1.5"/>
            </div>

            <Select name="birth_of_date"
                    options={availableAgeList()}
                    className={INPUT_CLASS}
                    errors={errors.birth_of_date}
                    onChange={(value) => handleChange('birthOfDate', value)}
            />

            <Select name="country"
                    onChange={(value) => handleCountry(value)}
                    options={countries}
                    disable={false}
                    className={INPUT_CLASS}
                    errors={errors.countries}
            />

            <Select name="city" onChange={(value) => handleCity(value)}
                    options={cities}
                    value={form.city}
                    disable={selectedCountry.length === 0}
                    className={INPUT_CLASS}
                    errors={errors.city}
            />
            <Button type="button"
                    disabled={Object.values(form).some((value) => value.trim() === '')}
                    onClick={async (e) => {
                        e.preventDefault();
                        const isValid = await validateForm(form);
                        if (isValid) {
                           await submit(form, { method: "post", action: "/auth/sign-up" });
                        }
                    }}
                    className={BUTTON_CLASS} value="Sign In"/>
            {Object.keys(errors).length > 0}
        </form>
        <b className="text-center w-full flex justify-center gap-4">You Already have an Account ? <Link to="/auth/sign-in" className="underline">Sign In</Link></b>
    </div>
}

export async function createSignUpAction({request}: RequestInterface) {
    const formData = await request.formData();
    const form = Object.fromEntries(formData.entries());

    const res = await fetch('http://localhost:3000/sign-up', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form })
    });

    if (!res.ok) {
        return { error: "Failed to sign up" };
    }

    return redirect("/auth/sign-in");
}