import {useRef} from "react";
import useFile from "../../Hooks/useFile";

interface ChildProps {
    photoStory: (a: any) => void;
}

export default function CreatePhotoStory({photoStory}: ChildProps) {
    const fileRef = useRef<HTMLInputElement>(null);
    const useFileHook = useFile();
    const openPanel = () => {
        fileRef?.current?.click()
    }
    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        useFileHook.fileChange(event).then((file) => photoStory(file));
    }

    return <div
        onClick={openPanel}
        className="cursor-pointer text-[25px] font-medium font-[cursive] text-white w-[350px] h-[360px] bg-blue-500 rounded-[15px] flex items-center justify-center">
        Create a photo story
        <input
            ref={fileRef}
            onChange={(event) => fileChange(event)}
            type="file"
            id="fileInput"
            accept="image/*"
            className="hidden"
        />
    </div>
}