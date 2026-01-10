import {EMOJIS} from "../../constants/constants";
import useContextHook from "../../Hooks/useContextHook";
import {useEffect} from "react";
import {toggleShareModal} from "../../Store/ModalSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../Store/store";

export default function ShareFellingWithEmoji() {

    const context = useContextHook()
    const dispatch = useDispatch<AppDispatch>()

    const selectEmoji = (item: any) => {
        context.handleChange('feelingEmoji', item.emoji.concat(item.label))
        setTimeout(() => {
            dispatch(toggleShareModal(''))
        }, 200)
    }
    return <>
        <div className="grid grid-cols-2">
            {
                EMOJIS.map((item) =>
                    (
                        <div onClick={() => selectEmoji(item)}
                             key={item.label}
                             className="flex gap-2 p-5 bg-white cursor-pointer hover:bg-gray-200">
                            <p>{item.emoji}</p>
                            <p>{item.label}</p>
                        </div>
                    )
                )
            }
        </div>

    </>
}