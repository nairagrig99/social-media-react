import {AppDispatch} from "../../Store/store";
import {useDispatch} from "react-redux";
import {toggleShareModal} from "../../Store/ModalSlice";
import {ComponentModalEnum} from "../../constants/component-modal.enum";

export default function Location() {
    const dispatch = useDispatch<AppDispatch>()
    return (
    <svg
        onClick={() => dispatch(toggleShareModal(ComponentModalEnum.LOCATION))} width="32" height="32"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>

)
}