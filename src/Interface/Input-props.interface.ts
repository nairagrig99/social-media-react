import React from "react";

export interface InputPropsInterface {
    id?:string,
    value?: string,
    errors?:string;
    label?:string,
    type?: string,
    name:string,
    blockClass?:string,
    className?: string,
    placeholder?: string,
    disabled?: boolean,
    labelClass?:string,
    onChange?: (e?: React.ChangeEvent<HTMLInputElement>,name?:string,value?:string) => void;
}