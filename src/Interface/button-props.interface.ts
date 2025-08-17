import React from "react";

export interface ButtonPropsInterface {
    value?: string,
    type?: "button" | "submit" | "reset";
    className?: string,
    disabled?: boolean,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}