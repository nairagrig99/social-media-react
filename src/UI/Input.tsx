import React from "react";
import {InputPropsInterface} from "../Interface/Input-props.interface";

const Input: React.FC<InputPropsInterface> = ({
                                                  blockClass,
                                                  ref,
                                                  errors,
                                                  value,
                                                  labelClass,
                                                  label,
                                                  id,
                                                  onBlur,
                                                  onClick,
                                                  ...props
                                              }) => {
    return <div className={blockClass}>
        <label htmlFor={id} className={labelClass}>
            <input value={value ?? ""}
                   id={id}
                   {...props}
                   ref={ref}
                   onBlur={onBlur}
                   onClick={onClick}
                   className={props.disabled ? 'opacity-30 cursor-not-allowed' : '' + props.className}
            />
            {label}
        </label>
        <span className="text-red-600 w-[350px]">{errors}</span>
    </div>
}
export default Input