import {createAsyncThunk} from "@reduxjs/toolkit";

import {RootState} from "./store";
import {UserInterface} from "../Interface/user-interface";
import {iTunesTrack} from "../Interface/itunes-track.interface";

export const API_KEY = '$2a$10$T0O4d8ByM78OlyPNxhrIguzw97x74Oi/QM7rv8RocTCWYk47StjdS';
export const BIN_ID = '691c442143b1c97be9b4e3d6';

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (arg: any, thumbApi) => {

        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`,
            {
                headers: {
                    'X-Master-Key': API_KEY
                },
            })
        if (!response.ok) {
            return thumbApi.rejectWithValue("Failed to fetch user")
        }
        const data = await response.json();
        console.log("data.record", data.record)
        return data || {};
    })

export interface NewPhotoStory {

    photo: string;
    photoSettings: {
        song?: iTunesTrack | null;
        color: string;
        fontSize: string;
        text: string;
    };
    createdDate: Date;
}

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (stories: NewPhotoStory, thunkAPI) => {
        try {
            const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": API_KEY
                }
            });
            const data = await res.json();
            const db = data.record;

            console.log("db", db);
            // if (db.sign_in[0].stories.photoStoryList.length > 0) {
                db.sign_in[0].stories.photoStoryList.push(stories);
            // }


            console.log('userqqqqqqqqqqqq', stories);

            const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'X-Master-Key': API_KEY
                },
                body: JSON.stringify(db)
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
            const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/menuItems`);
            if (!response.ok) {
                thunkAPI.rejectWithValue("Something went wrong")
            }
            return await response.json();
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)