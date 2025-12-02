import {createAsyncThunk} from "@reduxjs/toolkit";

import {PhotoStory} from "../Interface/photo-story.interface";
import {RootState} from "./store";

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (arg: any, thumbApi) => {
        const response = await fetch('http://localhost:3000/users', {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        })
        if (!response.ok) {
            return thumbApi.rejectWithValue("Failed to fetch user")
        }

        const data = await response.json();
        return data || {};
    })

// export const fetchSignUpUser = createAsyncThunk(
//     'user/fetchSignUpUser',
//     async (arg: any, thumbApi) => {
//         const response = await fetch('http://localhost:3000/users', {
//             method: "GET",
//             headers: {"Content-Type": "application/json"},
//         })
//         if (!response.ok) {
//             return thumbApi.rejectWithValue("Failed to fetch user")
//         }
//         const data = await response.json();
//         return data[0] || {};
//     })

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData: PhotoStory, thunkAPI) => {
        try {
            const updateData = []
            const user = thunkAPI.getState() as RootState

            if (userData.innerKey === 'photoStoryList') {

                updateData.push({
                    [userData.key]: {
                        ...user.userStore.signInUser.stories,
                        [userData.innerKey]: [{
                            photo: userData.photo,
                            createdDate: userData.createdDate,
                            photoSettings: userData.photoSettings
                        }],
                    }
                })
            } else {

                updateData.push({
                    [userData.key]: {
                        ...user.userStore.signInUser.stories,
                        [userData.innerKey]: [{
                            text: userData.text,
                            textSettings: userData.textSettings,
                            createdDate: userData.createdDate
                        }],
                    }
                })
            }

            const response = await fetch(`http://localhost:3000/users/${userData.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updateData[0]),
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
            const response = await fetch('http://localhost:3000/menuItems');
            if (!response.ok) {
                thunkAPI.rejectWithValue("Something went wrong")
            }
            return await response.json();
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)