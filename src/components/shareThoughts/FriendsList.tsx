import Search, {SearchHandle} from "../Search";
import {useContext, useEffect, useRef, useState} from "react";
import {FormContext} from "../../Context/FormContext";
import {AppDispatch} from "../../Store/store";
import {useDispatch} from "react-redux";
import {toggleShareModal} from "../../Store/ModalSlice";
//mandatory data
export const defaultFriendList = [
    {name: "Naira"},
    {name: "Mane"},
    {name: "Hayk"},
    {name: "Minas"},
    {name: "Anna"},
    {name: "Minas"},
    {name: "Anna"},
    {name: "Armen"},
    {name: "Babken"},
    {name: "Gayane"},
    {name: "Minas"},
    {name: "Anna"},
    {name: "Minas"},
    {name: "Anna"},
    {name: "Armen"},
    {name: "Babken"},
    {name: "Gayane"},
    {name: "Minas"},
    {name: "Anna"},
    {name: "Minas"},
    {name: "Anna"},
    {name: "Armen"},
    {name: "Babken"},
    {name: "Gayane"},
    {name: "Jack"},
    {name: "Nona"},
    {name: "Narek"},
]

export default function SearchFriendList() {
    const ref = useRef<SearchHandle | null>(null)

    const [friendList, setFriend] = useState([{name: ''}]);
    const context = useContext(FormContext);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setFriend(defaultFriendList)
    }, []);

    const selectFriend = (friend: string) => {
        context?.handleChange('friends', friend);
        setTimeout(() => {
            dispatch(toggleShareModal(''))
        }, 200)
    }

    useEffect(() => {
        ref.current?.onValueChange((search) => {
            if (search !== '') {
                setFriend(() => defaultFriendList.filter((friend: any
                ) => friend.name.toLowerCase().includes(search.toLowerCase())))
            } else {
                setFriend(defaultFriendList)
            }
        })

    }, [ref.current]);

    if (!defaultFriendList) return null;

    return (
        <>
            <Search ref={ref}/>
            <div className="grid grid-cols-1 gap-5 py-3 h-[345px] overflow-y-scroll ">
                {friendList.map((friend, index) => {
                    return <p key={index} className="cursor-pointer" onClick={() => selectFriend(friend.name)}>
                        {friend.name}
                    </p>
                })
                }
            </div>

        </>
    )
}