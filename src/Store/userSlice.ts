import {createSlice} from "@reduxjs/toolkit";
import {fetchUser, updateUser} from "./userThunk";
import {UserInterface} from "../Interface/user-interface";
import {Status} from "../Interface/status-type";
import {INITIAL_STATE} from "../constants/user-initial-state";

export interface UserState {
    users: UserInterface[],
    signInUser: UserInterface,
    status: Status;
    error: string | null;
}

const initialState: UserState = {
    users: [INITIAL_STATE],
    signInUser: INITIAL_STATE,
    status: 'idle',
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        getSignInUser: (state) => {
            const saved = localStorage.getItem("loggedUser");
            state.signInUser = saved
                ? (JSON.parse(saved) as UserInterface)
                : INITIAL_STATE;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload as string;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedKey = action.meta.arg.key;
                const updatedInnerKey = action.meta.arg.innerKey;

                if (updatedKey === "stories") {
                    if (updatedInnerKey === 'photoStoryList' || updatedInnerKey === 'textStoryList') {
                        state.signInUser = {
                            ...state.signInUser,
                            [updatedKey]: {
                                ...state.signInUser[updatedKey],
                                [updatedInnerKey]: [
                                    ...(state.signInUser[updatedKey]?.[updatedInnerKey] || []),
                                    ...action.payload[updatedKey][updatedInnerKey]
                                ]
                            }
                        };
                    }
                    localStorage.setItem("loggedUser", JSON.stringify(state.signInUser));
                }

            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload as string;
            });
    }
})
export const {getSignInUser} = userSlice.actions
export default userSlice.reducer;