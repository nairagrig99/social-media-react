import {createSlice} from "@reduxjs/toolkit";
import {fetchUser, updateUser} from "./userThunk";
import {RecordUser, UserInterface} from "../Interface/user-interface";
import {INITIAL_STATE} from "../constants/user-initial-state";
import {Status} from "../Interface/status-type";

export interface UserState {
    data: UserInterface;
    status: Status;
    error: string | null;
}


const initialState: UserState = {// @ts-ignore
    data: null,
    status: 'idle',
    error: null,
};


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        // @ts-ignore
        getSignInUser: (state) => {
            return state.data
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.record.sign_in[0];
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload as string;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log("action", action)

                // @ts-ignore
                const updatedKey = action.meta.arg.key;
                state.status = 'succeeded';
                console.log("action", action);
                //
                // state.data = {
                //     ...state.data,
                //     [updatedKey]: [...state.data[updatedKey], ...action.payload[updatedKey]]
                // }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload as string;
            });
    }
})

export default userSlice.reducer;