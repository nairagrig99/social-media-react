import RenderFile from "../RenderFile";
import {useEffect, useRef, useState} from "react";
import avatar from '../../assets/images/avatar.png'
import PhotoSvg from "../../UI/PhotoSvg";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Store/store";
import {updateUser} from "../../Store/userThunk";

export default function ProfilePhoto() {
    const fileRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<string>();
    const dispatch = useDispatch<AppDispatch>();
    const select = useSelector((store: RootState) => store.userStore.signInUser)
    const openPanel = () => {
        fileRef?.current?.click()
    }

    useEffect(() => {
        if (file) {
            dispatch(updateUser({
                id: select.id,
                key: 'profile_photo',
                updates: file
            }))
        }
    }, [file]);

    return <div className="absolute bottom-[-98px] left-[130px]">
        <div className=" flex items-center gap-3">
            <div className="bg-white rounded-full relative">
                <img src={file || select.profile_photo || avatar} className="w-[150px] rounded-full"/>
                <PhotoSvg
                    className="absolute  w-[28px] h-[28px]  rounded-xl bottom-[27px] right-[-4px] bg-[rgba(225,225,225,0.8)] border-none mx-auto flex justify-center items-center"
                    onClick={openPanel}/>
            </div>
            <p>{select.first_name} {select.last_name}</p>

        </div>
        <RenderFile ref={fileRef} onFileReady={setFile}/>
    </div>
}