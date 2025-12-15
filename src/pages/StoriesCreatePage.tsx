import LeftSideOfStoryMenu from "../components/stories/LeftSideOfStoryMenu";
import RightSideOfStories from "../components/stories/RightSideofStories";
import {useState} from "react";
import Button from "../UI/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../Store/store";
import {UserInterface} from "../Interface/user-interface";
import {updateUser} from "../Store/userThunk";
import {useNavigate} from "react-router-dom";
import Loading from "../components/HOC/Loading";

export function StoriesCreatePage() {
    const [photoStories, setPhotoStories] = useState<string>()
    const [textStories, setTextStories] = useState<boolean>()
    const [discardStory, setDiscardStory] = useState<boolean>(false);
    const selectText = useSelector((state: RootState) => state.textStorySlice.textSettings);
    const selectSong = useSelector((state: RootState) => state.searchSongSlice.selectedSong);
    const selectUser: UserInterface = useSelector((state: RootState) => state.userStore.signInUser);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const shareStory = () => {
        const updates: any = {};
        if (photoStories) {
            updates.photoStoryList = [
                ...selectUser.stories.photoStoryList,
                {
                    photo: photoStories!,
                    createdDate: new Date().toISOString(),
                    photoSettings: {
                        text: selectText,
                        song: selectSong!,
                    },
                }
            ]
        }

        if (textStories) {
            updates.textStoryList = [
                ...selectUser.stories.textStoryList,
                {
                    text: selectText.text,
                    createdDate: new Date().toISOString(),
                    textSettings: {
                        song: selectSong!,
                        text: selectText
                    }
                }
            ]
        }

        if (selectUser.stories.photoStoryList.length && !photoStories) {
            updates.photoStoryList = [...selectUser.stories.photoStoryList]
        }

        if (selectUser.stories.textStoryList.length && !textStories) {
            updates.textStoryList = [...selectUser.stories.textStoryList]
        }

        dispatch(updateUser({
            id: selectUser.id,
            key: 'stories',
            updates
        })).then(() => {
            navigate('/feed');
        })
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

const StoriesCreatePageWithLoading = Loading(StoriesCreatePage);
export default function StoriesCreatePageContainer() {

    const updateUserStory = useSelector((state: RootState) => state.userStore.updateStatus)

    return <StoriesCreatePageWithLoading  status={updateUserStory}/>
}
