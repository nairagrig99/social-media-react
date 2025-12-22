import React from "react";

export type CloseSvgProps = {
    className?: string;
    onClick: (e: boolean) => void;
};

const CloseSvg = React.memo((props: CloseSvgProps) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
             strokeWidth="2"
             onClick={() => props.onClick(false)}
             className={`${props.className} w-6 h-6`}>
            <path strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"/>
        </svg>
    )
})
export default CloseSvg