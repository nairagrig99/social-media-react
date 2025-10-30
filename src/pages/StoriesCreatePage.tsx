import LeftSideOfStoryMenu from "../components/stories/LeftSideOfStoryMenu";
import RightSideOfStories from "../components/stories/RightSideofStories";
import {StorySettings} from "../Interface/story-settings";
import {useState} from "react";

export default function StoriesCreatePage() {
    const [photoStories, setPhotoStories] = useState<string>()
    const [textStories, setTextStories] = useState<string>()


    return <div>
        <div className="flex w-full">
            <div className="left-side__menu w-100 h-screen">
                <LeftSideOfStoryMenu textStory={textStories} photoStory={photoStories}/>
            </div>
            <div className="right-side__content w-full bg-[#e9e5e5] h-screen">
                <RightSideOfStories photoStory={(data) => setPhotoStories(data)}
                                    textStory={(data) => setTextStories(data)}/>
            </div>
        </div>
    </div>
}