import Button from "../../UI/Button";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../Store/store";
import {ShareStory} from "../../Interface/share-story.interface";
import {toggleCreatePostModal} from "../../Store/CreatPostModalSlice";
import {ButtonModeEnum} from "../../constants/button-mode.enum";

type ContentProps = {
    content: ShareStory
}
export default function EditPost({content}: ContentProps) {
    const [showModal, setShowModal] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()

    return <div className="m-0 h-fit  relative">
        <Button className="text-[20px] cursor-pointer" value="..."
                onClick={() => setShowModal(prevState => !prevState)}/>
        {showModal && (
            <div className="flex flex-col rounded-md items-start w-[100px] h-fit p-2 absolute right-0 bg-[#c9c6c4]">
                <Button value="Edit"
                        onClick={() => dispatch(toggleCreatePostModal({
                            isModal: true,
                            content: content,
                            mode: ButtonModeEnum.EDIT
                        }))}/>
                <Button value="Remove"/>
            </div>)}
    </div>
}