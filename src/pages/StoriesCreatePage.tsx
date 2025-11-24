import LeftSideOfStoryMenu from "../components/stories/LeftSideOfStoryMenu";
import RightSideOfStories from "../components/stories/RightSideofStories";
import {useState} from "react";
import Button from "../UI/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../Store/store";
import {updateUser} from "../Store/userThunk";
import {UserInterface} from "../Interface/user-interface";
import {UpdateUserInfo} from "../Interface/update-user-info";

export default function StoriesCreatePage() {
    const [photoStories, setPhotoStories] = useState<string>()
    const [textStories, setTextStories] = useState<boolean>()
    const [discardStory, setDiscardStory] = useState<boolean>(false);
    const selectText = useSelector((state: RootState) => state.textStorySlice);
    const selectSong = useSelector((state: RootState) => state.searchSongSlice.selectedSong);
    const selectUser: UserInterface = useSelector((state: RootState) => state.userStore.data);
    const dispatch = useDispatch<AppDispatch>();
    const shareStory = () => {

        dispatch(updateUser({

            photo: photoStories!,
            photoSettings: {
                ...selectText.textSettings,
                song: selectSong
            },
            createdDate: new Date()
        }))

    }

    return <div>
        <div className="flex w-full">
            <div className="left-side__menu w-100 h-screen">
                <div className="flex flex-col justify-between h-full py-5">

                    <LeftSideOfStoryMenu textStory={textStories} photoStory={photoStories}/>

                    {(!!photoStories || textStories) && (<div className="flex justify-center gap-2">
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