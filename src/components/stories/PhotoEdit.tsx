import {useSelector} from "react-redux";
import {RootState} from "../../Store/store";
import MuteSvg from "../../UI/MuteSvg";
import React, {useRef, useState} from "react";

type Photo = {
    photoStory: string
}
export default function PhotoEdit({photoStory}: Photo) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMuted, setIsMuted] = useState(false);
    const selectedSong = useSelector((state: RootState) => state.searchSongSlice.selectedSong);
    const muteVoice = (event: React.MouseEvent<SVGSVGElement>) => {

        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
        }
        setIsMuted(!isMuted);
    }

    return <div className="relative">
        {selectedSong && (
            <>
                <audio className="hidden" ref={audioRef} controlsList="nodownload noplaybackrate noplay" autoPlay={true}
                       controls
                       src={selectedSong.previewUrl}></audio>


                <MuteSvg mute={isMuted} className={`absolute top-[12px] right-[15px] bg-[rgba(225,225,225,0.8)] w-[35px]
         h-[35px] rounded-full`}
                         onClick={muteVoice}/>
            </>
        )}
        <img src={photoStory} alt=""/>
    </div>
}