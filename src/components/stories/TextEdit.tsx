import React, {useEffect, useState} from "react";
import TextStoryField from "./TextStoryField";
import {useSelector} from "react-redux";
import {RootState} from "../../Store/store";
import {textStoryInitialState} from "../../Store/TextStorySlice";

export default function TextEdit() {
    const [textStoryField, setTextStoryField] = useState(textStoryInitialState.textSettings);

    const select = useSelector((state: RootState) => state.textStorySlice.textSettings)
    useEffect(() => {
        setTextStoryField(select)
    }, [select]);
    const setIsInputVisible = () => {
        // console.log("ssssssssss")
    }

    return <TextStoryField input={textStoryField} setInputVisible={setIsInputVisible} isTextStory={true}/>
}
