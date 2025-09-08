import {ModalState} from "../Interface/modal-state";
import {createSlice} from "@reduxjs/toolkit";

const initialState: ModalState = {
    isOpen: false
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
        toggleStoreModal: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})

export const {openStoryModal, closeStoryModal, toggleStoreModal} = modalSlice.actions;
export default modalSlice.reducer;