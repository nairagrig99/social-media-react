import {UserInterface} from "../../Interface/user-interface";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store/store";
import profileImage from "../../assets/images/avatar.png"
import Button from "../../UI/Button";
import {useEffect, useState} from "react";
import Modal from "../Modal";
import UserNameWithPicture from "../UserNameWithPicture";
import AddToPost from "./AddToPost";
import ColorPicker from "./ColorPicker";
import CloseSvg from "../../UI/CloseSvg";

const SHARE_STORY_STATE = {
    text: "",
    feelingEmoji: "",
    friends: "",
    place: "",
    bgColor: "",
    images: [] as string[]
};

export default function UserShare() {
    const user: UserInterface = useSelector((state: RootState) => state.userStore.signInUser);
    const status = useSelector((state: RootState) => state.userStore.status);

    const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        text: "",
        feelingEmoji: "",
        friends: "",
        place: "",
        bgColor: "",
        images: []
    });

    const setEmoji = (emoji: string) => {
        setForm((el) => ({
            ...el,
            'text': el.text + emoji
        }))
    }

    const shareThoughts = () => {
        // console.log("shareList", shareList);
        // const date = new Date()
        // const formatted = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}_${date.getMilliseconds()}ms`;
        // const updateValue = {
        //     [formatted]: {
        //         id: user.id,
        //         key: 'user_share_list',
        //         value: form
        //     }
        // }
        // // @ts-ignore
        // dispatch(updateUser(updateValue))
    }

    useEffect(() => {
        if (isShareModalOpen) {
            document.querySelector('#modal')?.classList.add('share_modal');
        }

        return () => {
            document.querySelector('#modal')?.classList.remove('share_modal')
        }
    }, [isShareModalOpen]);


    const handleChange = (value: string, type: string) => {

        setForm((el) => ({
            ...el,
            [type]: value
        }));
    }

    // console.log("form", form);

    if (!user) return null;

    return (
        <>
            <div className="flex gap-2.5 items-center bg-white rounded-xl p-2.5">
                <img src={user.profile_image ? user.profile_image : profileImage} className="w-[45px]"/>
                <div onClick={() => setIsShareModalOpen(true)}
                     className="border border-solid rounded-full py-1 px-2.5 pr-0 w-full">
                    {`What's on your mind, ${user.first_name}?`}
                </div>
            </div>

            {isShareModalOpen && (
                <Modal className="">

                    <div className="bg-white p-6 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit w-[450px]">

                        <div className="flex justify-between">
                            <div></div>
                            <h3 className="font-bold">Creat post</h3>
                            <CloseSvg onClick={() => setIsShareModalOpen(false)}></CloseSvg>
                        </div>

                        <UserNameWithPicture isShown={false} status={status}></UserNameWithPicture>

                        <h3>friends</h3>

                        <textarea
                            style={{backgroundColor: form.bgColor}}
                            value={form.text}
                            onChange={(e) => handleChange(e.target.value, 'text')}
                            placeholder={`What's on your mind, ${user.first_name}?`}
                            className="w-full p-2 border rounded border-0 outline-0 h-[200px] resize-none"
                        />

                        <ColorPicker form={form}
                                     setForm={(v, t) => handleChange(v, t)}
                                     setEmoji={(emoji) => setEmoji(emoji)}
                        ></ColorPicker>

                        <AddToPost form={form} setForm={(v, t) => handleChange(v, t)}></AddToPost>

                        <Button disabled={!form.text.length}
                                onClick={shareThoughts}
                                value="Post"
                                className="flex justify-center w-full bg-black text-white p-2 rounded-lg"/>
                    </div>
                </Modal>
            )}
        </>
    )
}