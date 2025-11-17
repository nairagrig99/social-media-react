import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import modalSlice from "./ModalSlice";
import profileMenuItemsSlice from "./ProfileMenuItemsSlice";
import searchSongSlice from "./songSlice";
import textStorySlice from "./TextStorySlice";


export const store = configureStore({
    reducer: {
        userStore: userSlice,
        modalStory: modalSlice,
        searchSongSlice: searchSongSlice,
        profileMenuSlice: profileMenuItemsSlice,
        textStorySlice: textStorySlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;