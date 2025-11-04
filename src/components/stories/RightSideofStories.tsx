import CreatePhotoStory from "./CreatePhotoStory";
import CreateTextStory from "./CreateTextStory";
import {useState} from "react";
import PhotoEdit from "./PhotoEdit";
import {StorySettings} from "../../Interface/story-settings";

type StorySettingsVoid = {
    photoStory: (data: string) => void,
    textStory: (data: string) => void
}
export default function RightSideOfStories({photoStory, textStory}: StorySettingsVoid) {
    const [photo, setPhotoStory] = useState<string>();
    const [text, setTextStory] = useState();

    const getPhotoStory = (imgSrc: string) => {
        setPhotoStory(imgSrc);
        photoStory(imgSrc)
    }

    return <div className="flex justify-center gap-5 items-center h-full">
        {!photo && !text &&
            (<>
                <CreatePhotoStory photoStory={getPhotoStory}/>
                <CreateTextStory/>
            </>)}
        <div>
            {photo && <PhotoEdit photoStory={photo}/>}
        </div>
    </div>
}