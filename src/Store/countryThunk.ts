import {createAsyncThunk} from "@reduxjs/toolkit";
import {ErrorEnum} from "../constants/error.enum";

export const countryThunk = createAsyncThunk("country/service",
    async (_, thunkAPI) => {
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries');

            if (!response.ok) {
                const error = await response.json();
                return thunkAPI.rejectWithValue(error)
            }

            return thunkAPI.fulfillWithValue(await response.json());
        } catch (err) {
            return thunkAPI.rejectWithValue(err)

        }
    })

export const userLocationThunk = createAsyncThunk("user/location", async (_, thunkAPI) => {
    try {
        const response = await fetch("https://ipapi.co/json/")
        if (!response.ok) {
            thunkAPI.rejectWithValue(ErrorEnum.FAIL)
        }
        return await response.json()
    } catch (err) {
        thunkAPI.rejectWithValue(ErrorEnum.FAIL)
    }

})