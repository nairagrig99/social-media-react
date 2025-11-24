import React, {useEffect, useState} from "react";
import {InputSettingsEnum} from "../constants/input-settings.enum";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../Store/store";
import {setState} from "../Store/TextStorySlice";

export default function useInput() {

    const dispatch = useDispatch<AppDispatch>()
    const selectText = useSelector((state: RootState) => state.textStorySlice.textSettings)

    const [input, setInput] = useState({
        color: "#FFF",
        fontSize: "20"
    });

    useEffect(() => {
        dispatch(setState({
            ...selectText,
            color: input.color,
            fontSize: input.fontSize
        }))
    }, [input]);

    const handleChange = (inputType: string, event: React.ChangeEvent<HTMLInputElement>) => {
        if (inputType === InputSettingsEnum.COLOR) {
            const color = event?.target.value ?? "#FFF";
            setInput((prev) => ({
                ...prev,
                color
            }))
        }

        if (inputType === InputSettingsEnum.FONT_SIZE) {
            const fontSize = event?.target.value ?? input.fontSize
            setInput((prev) => ({
                ...prev,
                fontSize
            }))
        }
    }


    return {input, handleChange}
}