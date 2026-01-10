import {createSlice} from "@reduxjs/toolkit";
import {ShareStory} from "../Interface/share-story.interface";
import {FORM_INITIAL_STATE} from "../constants/form-state";
import {ButtonModeEnum} from "../constants/button-mode.enum";

type PostModalState = {
    isCreatePost: boolean,
    editPostContent: ShareStory,
    mode: string
}

const initialState: PostModalState = {
    isCreatePost: false,
    editPostContent: FORM_INITIAL_STATE,
    mode: ButtonModeEnum.CREATE
}

const creatPostModalSlice = createSlice({
    name: "PostModal",
    initialState,
    reducers: {
        toggleCreatePostModal: (state, action) => {
            state.isCreatePost = action.payload.isModal
            state.editPostContent = action.payload.content
            state.mode=action.payload.mode
        }
    }
})
export const {toggleCreatePostModal} = creatPostModalSlice.actions;

export default creatPostModalSlice.reducer;