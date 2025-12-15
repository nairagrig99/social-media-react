import {createSlice} from "@reduxjs/toolkit";
import {fetchUser, updateUser} from "./userThunk";
import {UserInterface} from "../Interface/user-interface";
import {Status} from "../Interface/status-type";
import {INITIAL_STATE} from "../constants/user-initial-state";

export interface UserState {
    users: UserInterface[],
    signInUser: UserInterface,
    status: Status;
    updateStatus: Status;
    error: string | null;
}

const initialState: UserState = {
    users: [INITIAL_STATE],
    signInUser: INITIAL_STATE,
    status: 'idle',
    updateStatus: 'idle',
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
            state.status = 'succeeded'
        },
        setSignInUser: (state, action) => {
            localStorage.setItem("loggedUser", JSON.stringify(action.payload));
            state.signInUser = action.payload;
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
                state.updateStatus = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedKey = action.meta.arg.key;
                if (updatedKey === "stories") {
                    if (Object.values(action.payload.stories?.photoStoryList).length) {
                        state.signInUser.stories.photoStoryList = action.payload.stories.photoStoryList;
                    } else if (action.payload.stories?.textStoryList?.length) {
                        state.signInUser.stories.textStoryList = action.payload.stories.textStoryList;
                    } else {
                        // @ts-ignore
                        state.signInUser.stories = {
                            photoStoryList: [],
                            textStoryList: []
                        }
                    }
                    localStorage.setItem("loggedUser", JSON.stringify(state.signInUser));
                }
                state.updateStatus = "succeeded";
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateStatus = "rejected";
                state.error = action.payload as string;
            });
    }
})
export const {getSignInUser, setSignInUser} = userSlice.actions
export default userSlice.reducer;