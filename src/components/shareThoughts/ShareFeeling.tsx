import {useDispatch} from "react-redux";
import {AppDispatch} from "../../Store/store";
import {toggleShareModal} from "../../Store/ModalSlice";
import {ComponentModalEnum} from "../../constants/component-modal.enum";

export default function ShareFeeling() {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <svg onClick={() => dispatch(toggleShareModal(ComponentModalEnum.FEELING_EMOJI))} width="32" height="32"
             viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#FFC107"/>
            <circle cx="9" cy="10" r="1.5" fill="#000"/>
            <circle cx="15" cy="10" r="1.5" fill="#000"/>
            <path d="M8 14c1 2 7 2 8 0" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    )
}