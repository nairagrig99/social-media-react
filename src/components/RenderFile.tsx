import useFile from "../Hooks/useFile";

export type RenderFileProps = {
    ref: React.Ref<HTMLInputElement>,
    onFileReady: (file: string) => void
}
export default function RenderFile({ref, onFileReady}: RenderFileProps) {

    const useFileHook = useFile();
    const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        useFileHook.fileChange(event).then((file) => onFileReady(file));
    }

    return <input
        ref={ref}
        onChange={(event) => fileChange(event)}
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
    />

}