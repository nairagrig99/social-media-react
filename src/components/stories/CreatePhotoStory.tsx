import {useRef} from "react";
import useFile from "../../Hooks/useFile";
import RenderFile from "../RenderFile";

interface ChildProps {
    photoStory: (a: any) => void;
}

export default function CreatePhotoStory({photoStory}: ChildProps) {
    const fileRef = useRef<HTMLInputElement>(null);
    const openPanel = () => {
        fileRef?.current?.click()
    }

    return <div
        onClick={openPanel}
        className="cursor-pointer text-[25px] font-medium font-[cursive] text-white w-[350px] h-[360px] bg-blue-500 rounded-[15px] flex items-center justify-center">
        Create a photo story
        <RenderFile ref={fileRef} onFileReady={photoStory}/>
    </div>
}