import {svgProps} from "./CloseSvg";

export default function PhotoSvg({className, onClick}: svgProps) {

    return <div className={className}>
        <svg
             onClick={onClick}
             xmlns="http://www.w3.org/2000/svg"
             width="24" height="24"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2">
            <path d="M2 8h4l3-3h6l3 3h4v10H2z"/>
            <circle cx="12" cy="13" r="4"/>
            <circle cx="12" cy="13" r="2" fill="currentColor"/>
            <line x1="18" y1="8" x2="19" y2="8"/>
        </svg>
    </div>
}