import {createSlice} from "@reduxjs/toolkit";

export interface TextSettings {
    color: string;
    fontSize: string;
    text: string
}

export interface TextState {
    textSettings: TextSettings;
}

export const textStoryInitialState: TextState = {
    textSettings: {
        color: "#FFF",
        fontSize: "20",
        text: ""
    }
}
export const textStorySlice = createSlice({
    name: "textStorySlice",
    initialState: textStoryInitialState,
    reducers: {
        setState: (state, action) => {
            state.textSettings = action.payload;
        }
    }
})

export const {setState} = textStorySlice.actions
export default textStorySlice.reducer