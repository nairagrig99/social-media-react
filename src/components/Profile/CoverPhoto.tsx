import {useRef, useState} from "react";

import RenderFile from "../RenderFile";
import Button from "../../UI/Button";
import PhotoSvg from "../../UI/PhotoSvg";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Store/store";
import {updateUser} from "../../Store/userThunk";
import avatar from "../../assets/images/avatar.png";

export default function CoverPhoto() {
    const [coverPhoto, setCoverPhoto] = useState<string>("")
    const fileRef = useRef<HTMLInputElement>(null);
    const coverPhotoRef = useRef<HTMLImageElement>(null);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({x: 0, y: 0});
    const dispatch = useDispatch<AppDispatch>();
    const selector = useSelector((state: RootState) => state.userStore);
    const openPanel = () => {
        fileRef?.current?.click()
    }
    const saveCoverPhoto = () => {
        const coverPhotoUpdate = {
            id: selector.signInUser.id,
            key: 'cover_photo',
            updates: {photo: coverPhoto, settings: position}
        }

        dispatch(updateUser(coverPhotoUpdate)).then((response) => {
            const res = response.payload
            const coverPhotoList = {
                id: selector.signInUser.id,
                key: "cover_photo_list",
                updates: [...res.cover_photo_list, res.cover_photo]
            }
            dispatch(updateUser(coverPhotoList))
        })
    }
    const mouseDown = (event: any) => {
        if (coverPhoto) {
            setDragging(true);
            setOffset({
                x: event.clientX - position.x,
                y: event.clientY - position.y,
            });
        }

    }
    const mouseUp = () => {
        if (coverPhoto) setDragging(false);
    }
    const mouseMove = (event: any) => {
        if (coverPhoto) {
            if (!dragging) return;
            setPosition({
                x: event.clientX - offset.x,
                y: event.clientY - offset.y,
            });
        }
    }

    return <div className="relative w-[900px] overflow-hidden border h-[360px]"
                onMouseUp={() => mouseUp()}
                onMouseMove={(e) => mouseMove(e)}
                onMouseLeave={() => mouseUp()}
                onMouseDown={(e) => mouseDown(e)}
    >
        <img ref={coverPhotoRef} src={coverPhoto || selector.signInUser.cover_photo.photo || avatar} alt=""
             className="w-full object-cover absolute"
             style={{
                 left: position.x || selector.signInUser.cover_photo.settings.x,
                 top: position.y || selector.signInUser.cover_photo.settings.y,
                 cursor: dragging ? "grabbing" : "grab",
                 userSelect: "none",
                 transition: !!coverPhoto && dragging ? "none" : "0.1s ease-out"
             }}
        />
        <RenderFile ref={fileRef} onFileReady={setCoverPhoto}/>
        <div>
            <div className="absolute bottom-[5px] right-[20px] bg-[#FFF] p-1 rounded-sm flex justify-between gap-2">
                <Button onClick={openPanel}
                        className=""
                        value="Edit Cover Photo"/>
                <PhotoSvg onClick={openPanel}/>
            </div>

            {(coverPhoto && selector.updateStatus !== 'succeeded') && <Button onClick={saveCoverPhoto}
                                                                              className="absolute bottom-[5px] left-[20px] bg-[#FFF] p-1 rounded-sm"
                                                                              value="Save"/>}
        </div>

    </div>
}