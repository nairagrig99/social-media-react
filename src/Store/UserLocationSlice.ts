import {createSlice} from "@reduxjs/toolkit";
import {userLocationThunk} from "./countryThunk";
import {StatusEnum} from "../constants/status.enum";
import {GeoLocationInterface} from "../Interface/user-location.interface";

interface LocationState {
    status: string,
    location: GeoLocationInterface
}

const initialState: LocationState = {
    status: 'idle',
    location: {
        city: '',
        country: '',
        country_area: 0,
        country_capital: '',
        country_name: '',
        region_code: '',
        timezone: ''
    }
}

const userLocationSlice = createSlice({
    name: "user/location",
    initialState,
    reducers: {},
    extraReducers: ((location) => {
        location.addCase(userLocationThunk.pending, (state) => {
            state.status = StatusEnum.LOADING
        })
        location.addCase(userLocationThunk.fulfilled, (state, action) => {
            state.status = StatusEnum.SUCCEED;

            const keyWord = Object.keys(initialState.location);

            state.location = Object.fromEntries(keyWord.map(key => [key, action.payload[key]])) as GeoLocationInterface;

        })
        location.addCase(userLocationThunk.rejected, (state) => {
            state.status = StatusEnum.REJECTED
        })
    })
})

export default userLocationSlice.reducer