import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (arg: any, thumbApi) => {
        const response = await fetch('http://localhost:3000/sign-in')
        if (!response.ok) {
            return thumbApi.rejectWithValue("Failed to fetch user")
        }
        const data = await response.json();

        return data[0] || {};
    })

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData: { id: string, key: string, value: string[] }, thunkAPI) => {
        try {
            const updateData = {[userData.key]: userData.value}
            const response = await fetch(`http://localhost:3000/sign-in/${userData.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                return thunkAPI.rejectWithValue("Failed to update user");
            }

            return await response.json();

        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const profileMenu = createAsyncThunk(
    "user/profileMenu",
    async (first, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:3000/menuItems');
            if (!response.ok) {
                thunkAPI.rejectWithValue("Something went wrong")
            }
            return await response.json();
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)