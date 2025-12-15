import React from "react";
import {ButtonPropsInterface} from "../Interface/button-props.interface";

const Button:React.FC<ButtonPropsInterface> = ({className,value,type,...props}) => {
    return <>
        <button  type={type} className={`${className} ${props.disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
                 {...props}>
            {value}
        </button>
    </>
}
export default Button;