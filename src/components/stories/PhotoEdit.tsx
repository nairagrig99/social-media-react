import {useSelector} from "react-redux";
import {RootState} from "../../Store/store";
import React, {useState} from "react";
import Input from "../../UI/Input";
import useInput from "../../Hooks/useInput";
import {InputSettingsEnum} from "../../constants/input-settings.enum";
import TextStoryField from "./TextStoryField";

type Photo = {
    photoStory: string
}
export default function PhotoEdit({photoStory}: Photo) {

    const [isInputVisible, setIsInputVisible] = useState(true);
    const selectText = useSelector((state: RootState) => state.searchSongSlice.isTextSelected);

    const {input, handleChange} = useInput();

    return <div className="relative w-[350px] h-[500px] overflow-hidden">

        <TextStoryField input={input} setInputVisible={setIsInputVisible} isTextStory={false}/>

        {isInputVisible && selectText &&
            <div className="w-[250px] top-[60%] h-fit z-[1] bg-[#cdc8c8] absolute top-1/2  p-2 z-[9999]">
                <Input labelClass="flex flex-col-reverse text-[21px]"
                       label="font size"
                       name="range"
                       type="range"
                       value={input.fontSize}
                       onChange={(e) => handleChange(InputSettingsEnum.FONT_SIZE, e)}/>

                <Input labelClass="flex flex-col-reverse text-[21px]"
                       label="color"
                       name="color"
                       type="color"
                       value={input.color}
                       onChange={(e) => handleChange(InputSettingsEnum.COLOR, e)}/>
            </div>
        }
        <img className="w-[350px] h-[500px] object-cover absolute top-0" src={photoStory} alt=""/>
    </div>
}