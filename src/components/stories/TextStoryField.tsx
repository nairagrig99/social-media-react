import Input from "../../UI/Input";
import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../Store/store";
import MuteSvg from "../../UI/MuteSvg";
import {useOnClickOutside} from "../../Hooks/useOnClickOutside";
import {selectTextStoryWithPhoto} from "../../Store/songSlice";

export type TextStoryFieldProps = {
    input: {
        color: string,
        fontSize: string
    },
    isTextStory: boolean,
    setInputVisible?: (value: boolean) => void
}

export default function TextStoryField({input, setInputVisible, isTextStory}: TextStoryFieldProps) {

    const ref = useRef(null);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({x: 0, y: 0});
    const [storyText, setStoryText] = useState<string>();

    const [isInputVisible, setIsInputVisible] = useState<boolean>(true);

    const selectText = useSelector((state: RootState) => state.searchSongSlice.isTextSelected);
    const selectedSong = useSelector((store: RootState) => store.searchSongSlice.selectedSong)

    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);


    useEffect(() => {
        if (setInputVisible) {
            setInputVisible(isInputVisible)
        }
    }, [isInputVisible]);

    useOnClickOutside(ref, () => {
        // setIsInputVisible(false)
        // dispatch(selectTextStoryWithPhoto(true))
    });
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y,
        });
    };

    const handleMouseUp = () => {
        setDragging(false)
    };

    const handleBlur = () => {
        setIsInputVisible(false);
    }

    const muteVoice = (event: React.MouseEvent<SVGSVGElement>) => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
        }
        setIsMuted(!isMuted);
    }

    return <div ref={ref} className="w-[350px] h-[500px] border border-solid overflow-hidden relative z-10"
                style={{
                    backgroundColor: isTextStory ? input?.color : ""
                }}>

        {selectedSong && (
            <>
                <audio className="hidden"
                       ref={audioRef}
                       controlsList="nodownload noplaybackrate noplay"
                       autoPlay={true}
                       controls
                       src={selectedSong.previewUrl}></audio>

                <MuteSvg mute={isMuted}
                         className={`absolute top-[12px] z-[9999] right-[15px] bg-[rgba(225,225,225,0.8)] w-[35px] h-[35px] rounded-full`}
                         onClick={muteVoice}/>
            </>
        )}
        <div className="absolute text-[25px]"
             onMouseDown={handleMouseDown}
             onMouseMove={(e) => handleMouseMove(e)}
             onMouseUp={handleMouseUp}
             onMouseLeave={handleMouseUp}
             style={{
                 left: position.x,
                 top: position.y,
                 cursor: dragging ? "grabbing" : "grab",
                 userSelect: "none",
                 transition: dragging ? "none" : "0.1s ease-out",
                 color: !isTextStory ? input?.color : ""
             }}
        >
            <div onDoubleClick={() => setIsInputVisible ? setIsInputVisible(true) : ''}
                 style={{
                     fontSize: `${input?.fontSize}px`
                 }}>
                {!isInputVisible && storyText}
            </div>
        </div>

        {isInputVisible && selectText &&
            <Input name="photoStoryText"
                   style={{
                       fontSize: `${input?.fontSize}px`,
                       color: !isTextStory ? input?.color : ''
                   }}
                   value={storyText}
                   onBlur={handleBlur}
                   onChange={(e) => setStoryText(e?.target.value)}
                   blockClass="absolute z-[1] bg-[rgb(145_141_141_/_20%)] w-full h-full"
                   placeholder="Share your feeling"
                   className="outline-none caret-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
        }
    </div>
}