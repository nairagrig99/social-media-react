import {useRef} from "react";
import imageCompression from "browser-image-compression";

interface ChildProps {
    photoStory: (a: any) => void;
}

export default function CreatePhotoStory({photoStory}: ChildProps) {

    const fileRef = useRef<HTMLInputElement>(null);

    const openPanel = () => {
        fileRef?.current?.click()
    }
    const fileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files;
        if (files && files.length > 0) {
            const file = files[0];

            if (file) {
                try {
                    const compressedFile = await imageCompression(file, {
                        maxSizeMB: 0.5,
                        maxWidthOrHeight: 1024,
                        useWebWorker: true,
                        initialQuality: 0.8
                    });

                    const base64String = await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(compressedFile);
                    });

                    photoStory(base64String);
                } catch (error) {
                    console.error("Compression failed", error);
                }
            }
        }
    };

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