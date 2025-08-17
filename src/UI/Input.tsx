import React from "react";
import {InputPropsInterface} from "../Interface/Input-props.interface";
const Input: React.FC<InputPropsInterface> = ({errors,value,labelClass,label,id,...props}) => {

    return <div className="mb-4 flex flex-col w-[150px]">
        <label htmlFor={id} className={labelClass}>
        <input value={value} id={id} {...props}/>
            {label}
        </label>
        <span className="text-red-600 w-[350px]">{errors}</span>
    </div>
}
export default Input