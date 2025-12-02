import LeftSideOfStoryMenu from "../components/stories/LeftSideOfStoryMenu";
import RightSideOfStories from "../components/stories/RightSideofStories";
import {useState} from "react";
import Button from "../UI/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../Store/store";
import {UserInterface} from "../Interface/user-interface";
import {updateUser} from "../Store/userThunk";
import {PictureBlob} from "../Interface/picture-blob.interface";
import {useNavigate} from "react-router-dom";

export default function StoriesCreatePage() {
    const [photoStories, setPhotoStories] = useState<string>()
    const [textStories, setTextStories] = useState<boolean>()
    const [discardStory, setDiscardStory] = useState<boolean>(false);
    const selectText = useSelector((state: RootState) => state.textStorySlice.textSettings);
    const selectSong = useSelector((state: RootState) => state.searchSongSlice.selectedSong);
    const selectUser: UserInterface = useSelector((state: RootState) => state.userStore.signInUser);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const shareStory = () => {

        if (photoStories?.length) {
            dispatch(updateUser({
                id: selectUser.id,
                key: 'stories',
                innerKey: "photoStoryList",
                photo: photoStories!,
                createdDate: new Date().toISOString(),
                photoSettings: {
                    text: selectText,
                    song: selectSong!,
                },
            })).then(() => {
                navigate('/feed')
            })
        } else {
            dispatch(updateUser({
                id: selectUser.id,
                key: 'stories',
                innerKey: "textStoryList",
                text: selectText.text,
                textSettings: {
                    song: selectSong!,
                    text: selectText
                },
                createdDate: new Date().toISOString(),
            })).then(() => {
                navigate('/feed')
            })
        }
    }

    return <div>
        <div className="flex w-full">
            <div className="left-side__menu w-100 h-screen">
                <div className="flex flex-col justify-between h-full py-5">

                    <LeftSideOfStoryMenu textStory={textStories} photoStory={photoStories}/>

                    {(!!Object.keys(photoStories ?? "").length || textStories) && (
                        <div className="flex justify-center gap-2">
                            <Button onClick={() => setDiscardStory((discard) => !discard)} value="Discard"
                                    className="bg-gray-500 px-2.5 py-1.5 rounded text-white"/>
                            <Button onClick={shareStory} value="Share to Story"
                                    className="bg-blue-500 px-2.5 py-1.5 rounded text-white"/>
                        </div>)}

                </div>
            </div>
            <div className="right-side__content w-full bg-[#e9e5e5] h-screen">
                <RightSideOfStories photoStory={(data) => setPhotoStories(data)}
                                    textStory={(data) => setTextStories(data)}
                                    discardStory={discardStory}/>
            </div>

        </div>
    </div>
}