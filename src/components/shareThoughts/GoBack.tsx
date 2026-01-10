import {toggleShareModal} from "../../Store/ModalSlice";
import ArrowLeft from "../../UI/ArrowLeftSvg";
import React from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../Store/store";

export default function GoBack() {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <div className="flex justify-between items-center w-fit mb-5 gap-1 cursor-pointer"
             onClick={() => dispatch(toggleShareModal(''))}>
            <ArrowLeft/>
            <p>Go Back</p>
        </div>
    )

}