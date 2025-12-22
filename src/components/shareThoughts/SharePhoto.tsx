import {useRef} from "react";
import useFile from "../../Hooks/useFile";
import useContextHook from "../../Hooks/useContextHook";

export default function SharePhoto() {
    const fileRef = useRef<HTMLInputElement>(null);

    const context = useContextHook();
    const openPanel = () => {
        fileRef?.current?.click()
    }

    const useFileHook = useFile();

    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        useFileHook.fileChange(event).then((file) => {
            if (file) {
                context.handleChange('images', [...context.form.images as string[], file])
            }
        })
    }

    return (
        <div onClick={openPanel}>
            <input ref={fileRef} disabled={!!context.form.bgColor.length} type="file" onChange={fileChange}
                   className="hidden"/>
            <svg width="32"
                 height="32"
                 viewBox="0 0 24 24"
                 fill="none"
                 className={!!context.form.bgColor.length ? 'opacity-30 cursor-not-allowed' : ''}>
                <rect x="3" y="3" width="18" height="18" rx="3" fill="#4CAF50"/>
                <path d="M6 15l3-3 3 3 4-5 2 2v4H6z" fill="white"/>
                <circle cx="9" cy="9" r="2" fill="white"/>
            </svg>
        </div>

    )
}