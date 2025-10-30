import {updateUser} from "../../Store/userThunk";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Store/store";
import Modal from "../Modal";
import {useRef} from "react";
interface ChildProps {
    photoStory: (data: string) => void;
}
export default function CreatePhotoStory({photoStory}:ChildProps) {

    const dispatch = useDispatch<AppDispatch>();
    const fileRef = useRef<HTMLInputElement>(null);
    const registeredUser = useSelector((state: RootState) => state.userStore.data);

    const openPanel = () => {
        fileRef?.current?.click()
    }
    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const files = event?.target?.files;
        if (files && files.length > 0) {
            const file = files[0];

            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    photoStory(e.target?.result as string)
                    // const update = [...registeredUser.stories, e.target?.result as string];
                    // if (registeredUser.id) {
                    //     const updateValue = {
                    //         id: registeredUser.id,
                    //         key: 'stories',
                    //         value: update,
                    //         createdDate: new Date()
                    //     }
                    //      dispatch(updateUser(updateValue))
                    // }
                    // return update;
                }
                reader.readAsDataURL(file);
            }
        }
    }
    return <div
        onClick={openPanel}
        className="cursor-pointer text-[25px] font-medium font-[cursive] text-white w-[350px] h-[360px] bg-blue-500 rounded-[15px] flex items-center justify-center">
        Create a photo story
        <input
            ref={fileRef}
            onChange={(event) => fileChange(event)}
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
        />
    </div>
}