import {createSlice} from "@reduxjs/toolkit";
import {searchSongThunk} from "./songThunk";
import {Status} from "../Interface/status-type";
import {iTunesTrack} from "../Interface/itunes-track.interface";

type SearchParam = {
    searchSong: iTunesTrack[],
    selectedSong: iTunesTrack | null,
    status: Status
}

const initialState: SearchParam = {
    searchSong: [],
    selectedSong: null,
    status: 'idle'
}

const searchSongSlice = createSlice({
    name: "searchSong",
    initialState,
    reducers: {
        setSelectedSong: (state, action) => {
            state.selectedSong = action.payload;
        },
        removeSelectedSong: (state) => {
            state.selectedSong = null;
        },
        clearSearch(state) {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchSongThunk.pending, (state, action) => {
            state.status = "loading"
        })
        builder.addCase(searchSongThunk.rejected, (state, action) => {
            state.status = "rejected"
        })
        builder.addCase(searchSongThunk.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.searchSong = action.payload
        })
    }
})

export const {setSelectedSong, removeSelectedSong, clearSearch} = searchSongSlice.actions
export default searchSongSlice.reducer;