import {createSlice} from "@reduxjs/toolkit";
import {fetchUser, updateUser} from "./userThunk";
import {UserInterface} from "../Interface/user-interface";
import {INITIAL_STATE} from "../constants/user-initial-state";
import {Status} from "../Interface/status-type";

export interface UserState {
    data: UserInterface;
    status: Status;
    error: string | null;
}

const initialState: UserState = {
    data: INITIAL_STATE,
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedKey = action.meta.arg.key;
                state.status = 'succeeded';
                state.data = {
                    ...state.data,
                    // @ts-ignore
                    [updatedKey]: [...state.data[updatedKey], ...action.payload[updatedKey]]
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload as string;
            });
    }
})

export default userSlice.reducer;