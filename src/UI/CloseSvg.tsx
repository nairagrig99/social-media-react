import React from "react";

export type svgProps<T = React.MouseEvent> = {
    className?: string;
    onClick: (e:T) => void;
};

const CloseSvg = React.memo((props: svgProps) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
             strokeWidth="2"
             onClick={() => {
                 // @ts-ignore
                 props.onClick(false)
             }}
             className={`${props.className} w-6 h-6`}>
            <path strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"/>
        </svg>
    )
})
export default CloseSvg