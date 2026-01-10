import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import modalSlice from "./ModalSlice";
import profileMenuItemsSlice from "./ProfileMenuItemsSlice";
import searchSongSlice from "./songSlice";
import textStorySlice from "./TextStorySlice";
import countrySlice from "./countrySlice";
import userLocationSlice from "./UserLocationSlice";
import creatPostModalSlice from "./CreatPostModalSlice";

export const store = configureStore({
    reducer: {
        userStore: userSlice,
        modalStory: modalSlice,
        searchSongSlice: searchSongSlice,
        profileMenuSlice: profileMenuItemsSlice,
        textStorySlice: textStorySlice,
        countrySlice: countrySlice,
        userLocationSlice:userLocationSlice,
        creatPostModalSlice:creatPostModalSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;