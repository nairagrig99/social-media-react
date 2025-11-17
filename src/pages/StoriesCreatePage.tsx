import LeftSideOfStoryMenu from "../components/stories/LeftSideOfStoryMenu";
import RightSideOfStories from "../components/stories/RightSideofStories";
import {useState} from "react";
import Button from "../UI/Button";

export default function StoriesCreatePage() {
    const [photoStories, setPhotoStories] = useState<string>()
    const [textStories, setTextStories] = useState<boolean>()
    const [discardStory, setDiscardStory] = useState<boolean>(false)
    console.log("textStories",textStories)
    return <div>
        <div className="flex w-full">
            <div className="left-side__menu w-100 h-screen">
                <div className="flex flex-col justify-between h-full py-5">

                    <LeftSideOfStoryMenu textStory={textStories} photoStory={photoStories}/>

                    {!!photoStories?.length && (<div className="flex justify-center gap-2">
                        <Button onClick={() => setDiscardStory((discard) => !discard)} value="Discard"
                                className="bg-gray-500 px-2.5 py-1.5 rounded text-white"/>
                        <Button value="Share to Story" className="bg-blue-500 px-2.5 py-1.5 rounded text-white"/>
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