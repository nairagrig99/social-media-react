import {createAsyncThunk} from "@reduxjs/toolkit";
import {iTunesTrack} from "../Interface/itunes-track.interface";

export const searchiTunesSongs = async (query: string): Promise<iTunesTrack[]> => {
    try {
        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=20`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        return [];
    }
};

export const searchSongThunk = createAsyncThunk('searchSong/fetch',
    async (query: string, thunkAPI) => {
        try {
            return await searchiTunesSongs(query);
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to fetch songs");
        }

    })