import {UserInterface} from "../../Interface/user-interface";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store/store";
import profileImage from "../../assets/images/avatar.png"
import Button from "../../UI/Button";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import Modal from "../Modal";
import UserNameWithPicture from "../UserNameWithPicture";
import AddToPost from "./AddToPost";
import ColorPicker from "./ColorPicker";
import CloseSvg from "../../UI/CloseSvg";
import {ShareStory} from "../../Interface/share-story.interface";
import ImageGrid from "./ImageGrid";
import ImageSwiper from "./ImageSwiper";
import SelectEmoji from "./SelectEmoji";
import {FormContext} from "../../Context/FormContext";

const INITIAL_STATE = {
    text: "",
    feelingEmoji: "",
    friends: "",
    place: "",
    bgColor: "",
    images: []
}
export default function UserShare() {
    const user: UserInterface = useSelector((state: RootState) => state.userStore.signInUser);
    const status = useSelector((state: RootState) => state.userStore.status);
    const selectModal = useSelector((state: RootState) => state.modalStory.isShowShare);
    const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
    const [form, setForm] = useState<ShareStory>(INITIAL_STATE);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isShareModalOpen) setForm(INITIAL_STATE)
    }, [isShareModalOpen]);


    const setEmoji = useCallback((emoji: string) => {

        setForm((el) => ({
            ...el,
            'text': el.text + emoji
        }))
    }, [])

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


    const handleChange = useCallback(<K extends keyof ShareStory>(
        key: K,
        value: ShareStory[K],
    ) => {
        setForm(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    // Memoize the removeImage callback
    const removeImage = useCallback((ind: number) => {
        setForm((form) => ({
            ...form,
            images: form.images.filter((_, index) => ind !== index)
        }))
    }, [])

    const handleTextChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleChange('text', event.target.value);
    }, [handleChange]);

    const formContextValue = useMemo(() => ({
        form,
        handleChange
    }), [form, handleChange]);

    const textareaStyle = useMemo(() => ({
        backgroundColor: form.bgColor,
        height: form.bgColor.length ? "200px" : form.images.length ? 'fit-content' : '200px'
    }), [form.bgColor, form.images.length]);

    // function insertTextAtCursor(el, text) {
    //     const start = el.selectionStart;
    //     const end = el.selectionEnd;
    //
    //     el.value = el.value.slice(0, start) + text + el.value.slice(end);
    //
    //     el.selectionStart = el.selectionEnd = start + text.length;
    // }

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
                <Modal>
                    <div
                        className="bg-white p-6 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit w-[450px]">

                        <div className="flex justify-between">
                            <div></div>
                            <h3 className="font-bold">Creat post</h3>
                            <CloseSvg onClick={setIsShareModalOpen}></CloseSvg>
                        </div>

                        {!selectModal && <UserNameWithPicture isShown={false} status={status}></UserNameWithPicture>}

                        {!selectModal && <h3>friends</h3>}

                        <div>
                            <div className="relative">
                                {!selectModal && <textarea
                                    style={textareaStyle}
                                    value={form.text}
                                    onChange={handleTextChange}
                                    placeholder={`What's on your mind, ${user.first_name}?`}
                                    className="w-full p-2 border rounded border-0 outline-0 h-[200px] resize-none"
                                />}
                                {!!form.bgColor.length &&
                                    <CloseSvg onClick={() => handleChange('bgColor', '')} className="absolute top-0 right-0"/>}
                            </div>


                            {!selectModal && <ImageGrid images={form.images}/>}
                            {selectModal && <ImageSwiper images={form.images} removeImage={removeImage}/>}

                        </div>

                        {!selectModal && <>
                            <div className="flex justify-between mb-2">
                                <ColorPicker form={form.bgColor}
                                             setForm={handleChange}
                                             disabled={!!form.images.length}
                                ></ColorPicker>

                                <SelectEmoji setEmoji={setEmoji}></SelectEmoji>
                            </div>

                            <FormContext.Provider value={formContextValue}>
                                <AddToPost></AddToPost>
                            </FormContext.Provider>

                            <Button disabled={!form.text.length}
                                    onClick={shareThoughts}
                                    value="Post"
                                    className="flex justify-center w-full bg-black text-white p-2 rounded-lg"/>
                        </>}
                    </div>
                </Modal>
            )}
        </>
    )
}
