import {UserInterface} from "../../Interface/user-interface";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Store/store";
import profileImage from "../../assets/images/avatar.png"
import Button from "../../UI/Button";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import Modal from "../../UI/Modal";
import AddToPost from "./AddToPost";
import ColorPicker from "./ColorPicker";
import CloseSvg from "../../UI/CloseSvg";
import {ShareStory} from "../../Interface/share-story.interface";
import ImageGrid from "./ImageGrid";
import SelectEmoji from "./SelectEmoji";
import {FormContext} from "../../Context/FormContext";
import NestedModal from "./NestedModal";
import UserFeelings from "./UserFeelings";
import {updateUser} from "../../Store/userThunk";
import Loading from "../HOC/Loading";
import {toggleCreatePostModal} from "../../Store/CreatPostModalSlice";
import {FORM_INITIAL_STATE} from "../../constants/form-state";
import {ButtonModeEnum} from "../../constants/button-mode.enum";

const UserShare = () => {
    const user: UserInterface = useSelector((state: RootState) => state.userStore.signInUser);
    const selectModal = useSelector((state: RootState) => state.modalStory.isShowShare);
    const isCreatePost = useSelector((state: RootState) => state.creatPostModalSlice.isCreatePost);
    const contentForEdit = useSelector((state: RootState) => state.creatPostModalSlice.editPostContent);
    const buttonModelSelector = useSelector((state: RootState) => state.creatPostModalSlice.mode);

    const [form, setForm] = useState<ShareStory>(FORM_INITIAL_STATE);
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        if (!isCreatePost) setForm(FORM_INITIAL_STATE)
        if (isCreatePost) setForm(contentForEdit)
    }, [isCreatePost]);


    const setEmoji = useCallback((emoji: string) => {
        setForm((el) => ({
            ...el,
            'text': el.text + emoji
        }))
    }, [])

    const shareThoughts = () => {
        const formatted = new Date().toISOString();

        const updateValue = {
            id: user.id,
            key: 'user_share_list',
            updates: {
                [formatted]: form,
                ...user.user_share_list
            }
        }
        dispatch(updateUser(updateValue)).then(() => dispatch(toggleCreatePostModal(false)))
    }

    useEffect(() => {
        if (isCreatePost) {
            document.querySelector('#modal')?.classList.add('share_modal');
        }

        return () => {
            document.querySelector('#modal')?.classList.remove('share_modal')
        }
    }, [isCreatePost, dispatch]);

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
        removeImage,
        handleChange
    }), [form, removeImage, handleChange]);

    const textareaStyle = useMemo(() => ({
        backgroundColor: form.bgColor,
        height: form.bgColor.length ? "200px" : form.images.length ? 'fit-content' : '200px'
    }), [form.bgColor, form.images.length]);

    if (!user) return null;

    return (
        <>
            <div className="flex gap-2.5 items-center bg-white rounded-xl p-2.5">
                <img src={user.profile_image ? user.profile_image : profileImage} className="w-[45px]"/>
                <div onClick={() => dispatch(toggleCreatePostModal({
                    isModal: true,
                    content: FORM_INITIAL_STATE,
                    mode: ButtonModeEnum.CREATE
                }))}
                     className="border border-solid rounded-full py-1 px-2.5 pr-0 w-full">
                    {`What's on your mind, ${user.first_name}?`}
                </div>
            </div>


            <Modal isOpen={isCreatePost}>
                <FormContext.Provider value={formContextValue}>
                    <div
                        className="bg-white p-6 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-fit border flex flex-col justify-between">

                        <div className="flex justify-between">
                            <div></div>
                            <h3 className="font-bold">Creat post</h3>
                            <CloseSvg onClick={() => dispatch(toggleCreatePostModal({
                                isModal: false,
                                content: FORM_INITIAL_STATE
                            }))}></CloseSvg>
                        </div>

                        {!selectModal && <UserFeelings/>}

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
                                    <CloseSvg onClick={() => handleChange('bgColor', '')}
                                              className="absolute top-0 right-0"/>}
                            </div>


                            {!selectModal && <ImageGrid images={form.images}/>}


                            {selectModal && <NestedModal/>}

                        </div>

                        {!selectModal && <>
                            <div className="flex justify-between mb-2">
                                <ColorPicker form={form.bgColor}
                                             setForm={handleChange}
                                             disabled={!!form.images.length}
                                ></ColorPicker>

                                <SelectEmoji setEmoji={setEmoji}></SelectEmoji>
                            </div>

                            <AddToPost></AddToPost>

                            <Button disabled={!Object.values(form).some((f) => f.length > 0)}
                                    onClick={shareThoughts}
                                    value={buttonModelSelector}
                                    className="flex justify-center w-full bg-black text-white p-2 rounded-lg"/>
                        </>}
                    </div>
                </FormContext.Provider>
            </Modal>
        </>
    )
}
export default Loading(UserShare, {statusProps: (state: RootState) => state.userStore.updateStatus})