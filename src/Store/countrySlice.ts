import {createSlice} from "@reduxjs/toolkit";
import {countryThunk} from "./countryThunk";
import {Country} from "../Interface/select-interface";

export type LocationState = {
    location: Country[],
    status: string
}

const initialState: LocationState = {
    location: [{country: "", cities: []}],
    status: "idle"
}

const countrySlice = createSlice({
    name: 'country/service',
    initialState,
    reducers: {},
    extraReducers: ((country) => {
        country.addCase(countryThunk.pending, (state, action) => {
            state.status = 'loading'
        })
        country.addCase(countryThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.location = action.payload.data;
        })
        country.addCase(countryThunk.rejected, (state, action) => {
            state.status = 'rejected';
        })
    })
})
export default countrySlice.reducer;