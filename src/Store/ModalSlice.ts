import {ModalState} from "../Interface/modal-state";
import {createSlice} from "@reduxjs/toolkit";

const initialState: ModalState = {
    isOpen: false,
    isShowShare: false
}

const modalSlice = createSlice({
    name: "storyModal",
    initialState,
    reducers: {
        openStoryModal: (state) => {
            state.isOpen = true
        },
        closeStoryModal: (state) => {
            state.isOpen = false
        },
        toggleShareModal: (state) => {
            state.isShowShare = !state.isShowShare
        }
    }
})
export const {openStoryModal, closeStoryModal, toggleShareModal} = modalSlice.actions;
export default modalSlice.reducer;