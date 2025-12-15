import React from "react";

export interface InputPropsInterface {
    id?: string,
    ref?: React.RefObject<HTMLInputElement | null>,
    value?: string,
    errors?: string;
    label?: string,
    type?: string,
    name: string,
    style?:React.CSSProperties;
    blockClass?: string,
    className?: string,
    placeholder?: string,
    disabled?: boolean,
    labelClass?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, name?: string, value?: string) => void;
    onBlur?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
}