import Input from "../../UI/Input";
import React, {useState} from "react";
import useInput from "../../Hooks/useInput";
import {InputSettingsEnum} from "../../constants/input-settings.enum";
import SongModal from "./SongModal";

export default function SettingsForTextStory() {

    const [openModal, setOpenModal] = useState<boolean>(false);

    const {input, handleChange} = useInput();

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
        <div onClick={() => setOpenModal(true)} className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
            </svg>
            Add Music
        </div>
        {openModal && <SongModal setOpenModal={setOpenModal}/>}
    </div>
}

