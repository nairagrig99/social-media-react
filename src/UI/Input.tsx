import React from "react";
import {InputPropsInterface} from "../Interface/Input-props.interface";

const Input: React.FC<InputPropsInterface> = ({blockClass, errors, value, labelClass, label, id, onBlur, ...props}) => {

    return <div className={blockClass}>
        <label htmlFor={id} className={labelClass}>
            <input value={value ?? ""}
                   id={id}
                   {...props}
                   onBlur={onBlur}
            />
            {label}
        </label>
        <span className="text-red-600 w-[350px]">{errors}</span>
    </div>
}
export default Input