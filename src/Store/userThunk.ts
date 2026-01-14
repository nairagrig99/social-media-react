import {createAsyncThunk} from "@reduxjs/toolkit";
import {ErrorEnum} from "../constants/error.enum";

export const URL = `http://localhost:3000`;
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (_, thumbApi) => {
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

interface UserDataUpdate {
    id: string,
    key: string,
    updates: any
}

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData: UserDataUpdate, thunkAPI) => {
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
                thunkAPI.rejectWithValue(ErrorEnum.FAIL)
            }
            return await response.json();
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)