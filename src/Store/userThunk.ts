import {createAsyncThunk} from "@reduxjs/toolkit";

export const URL = `http://localhost:3000`;
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (arg: any, thumbApi) => {
        const response = await fetch(`${URL}/users`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) {
            return thumbApi.rejectWithValue("Failed to fetch user")
        }

        const data = await response.json();
        return data || {};
    })

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData: any, thunkAPI) => {
        try {
            const response = await fetch(`${URL}/users/${userData.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    [userData.key]: userData.updates
                }),
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
            const response = await fetch(`${URL}/menuItems`);
            if (!response.ok) {
                thunkAPI.rejectWithValue("Something went wrong")
            }
            return await response.json();
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)