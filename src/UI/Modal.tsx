import {createPortal} from "react-dom";
import {ChildrenProps} from "../Interface/children-props.interface";

export default function Modal({children, className, isOpen}: ChildrenProps) {
    const modalRoot = document.querySelector("#modal");

    if (!modalRoot || !isOpen) return null;

    return createPortal(
        <div className={className}>
            {children}
        </div>,
        modalRoot
    );
}
