import Input from "../../UI/Input";
import React from "react";
import {storyFormProps} from "../../Interface/story-form-props.type";

const ColorPicker = React.memo(({form, setForm,disabled}: storyFormProps) => {
    return <div>
            <Input name="color"
                   disabled={disabled}
                   value={form as string}
                   onChange={(event) => setForm('bgColor', event.target.value)}
                   type="color"/>
        </div>


})

export default ColorPicker