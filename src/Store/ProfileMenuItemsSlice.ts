import {createSlice} from "@reduxjs/toolkit";
import {ProfileMenuState} from "../Interface/profile-menu.interface";
import {profileMenu} from "./userThunk";


const initialState: ProfileMenuState = {
    data: null,
    status: "idle",
    error: null,
};

const profileMenuItemsSlice = createSlice({
    name: "profileMenu",
    initialState,
    reducers: {},
    extraReducers: (menu) => {
        menu.addCase(profileMenu.pending, (state) => {
            state.status = 'loading'
        }).addCase(profileMenu.fulfilled, (state, action) => {

            state.data = action.payload
            state.status = "succeeded"
        }).addCase(profileMenu.rejected, (state, action) => {
            state.status = "failed";
            // state.error = (action.payload ?? action.error.message ?? "Unknown error");
        })
    }
})

export default profileMenuItemsSlice.reducer;