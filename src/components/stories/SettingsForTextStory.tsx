import Input from "../../UI/Input";
import React, {useState} from "react";
import useInput from "../../Hooks/useInput";
import {InputSettingsEnum} from "../../constants/input-settings.enum";
import SongModal from "./SongModal";
import {selectTextStoryWithPhoto} from "../../Store/songSlice";
import {AppDispatch} from "../../Store/store";
import {useDispatch} from "react-redux";

export default function SettingsForTextStory() {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const {input, handleChange} = useInput();
    const addTextToPhoto = () => {
        dispatch(selectTextStoryWithPhoto())
    }

    return <div className="flex flex-col gap-5 p-2">
        <div>
            <Input name="color"
                   onChange={(event) => handleChange(InputSettingsEnum.COLOR, event)}
                   value={input.color}
                   labelClass="flex flex-col-reverse"
                   type="color"
                   label="Background Color"/>
        </div>
        <div>
            <Input name="range"
                   onChange={(event) => handleChange(InputSettingsEnum.FONT_SIZE, event)}
                   value={input.fontSize}
                   labelClass="flex flex-col-reverse"
                   type="range"
                   label="Font Size"/>
        </div>
        <div onClick={addTextToPhoto} className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#E5E7EB"/>
                <text x="12" y="16"
                      textAnchor="middle"
                      fontSize="12" fontFamily="Arial" fill="#111827">Aa
                </text>
            </svg>
            Add Text
        </div>
        <div onClick={() => setOpenModal(true)} className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
            </svg>
            Add Music
        </div>
        {openModal && <SongModal setOpenModal={setOpenModal}/>}
    </div>
}

