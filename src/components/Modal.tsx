import {ChildrenProps} from "../Interface/children-props.interface";
import {createPortal} from "react-dom";

export default function Modal({children, className}: ChildrenProps) {


    return (
        <div className={className}>
            {createPortal(
                // @ts-ignore
                children, document.querySelector('#modal')
            )}
        </div>

    )
}