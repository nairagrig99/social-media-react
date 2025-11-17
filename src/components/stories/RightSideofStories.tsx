import CreatePhotoStory from "./CreatePhotoStory";
import CreateTextStory from "./CreateTextStory";
import {useEffect, useState} from "react";
import PhotoEdit from "./PhotoEdit";
import {StorySettings} from "../../Interface/story-settings";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../Store/store";
import {clearSearch, removeSelectedSong, selectTextStoryWithPhoto} from "../../Store/songSlice";
import TextEdit from "./TextEdit";

type StorySettingsVoid = {
    photoStory: (data: string) => void,
    textStory: (data: boolean) => void,
    discardStory: boolean
}
export default function RightSideOfStories({photoStory, textStory, discardStory}: StorySettingsVoid) {
    const [photo, setPhotoStory] = useState<string>();
    const [text, setTextStory] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setPhotoStory('');
        setTextStory(false)
        photoStory('');
        textStory(false);
        dispatch(removeSelectedSong());
        dispatch(clearSearch());
    }, [discardStory]);
    const getPhotoStory = (imgSrc: string) => {
        setPhotoStory(imgSrc);
        photoStory(imgSrc);
    }
    const createTextStory = (data: boolean) => {
        setTextStory(data)
        textStory(data)
        dispatch(selectTextStoryWithPhoto(true))
    }

    return <div className="flex justify-center gap-5 items-center h-full right-side__content">
        {!photo && !text &&
            (<>
                <CreatePhotoStory photoStory={getPhotoStory}/>
                <CreateTextStory textStory={createTextStory}/>
            </>)}
        <div>
            {photo && <PhotoEdit photoStory={photo}/>}
            {text && <TextEdit/>}
        </div>
    </div>
}