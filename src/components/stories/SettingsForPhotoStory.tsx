import Modal from "../Modal";
import {useEffect, useRef, useState} from "react";
import Input from "../../UI/Input";
import {useDispatch, useSelector} from "react-redux";
import {searchSongThunk} from "../../Store/songThunk";
import {AppDispatch, RootState} from "../../Store/store";
import useDebounce from "../../Hooks/useDebounce";
import {clearSearch, setSelectedSong} from "../../Store/songSlice";
import CloseSvg from "../../UI/CloseSvg";
import {StatusEnum} from "../../constants/status.enum";

export default function SettingsForPhotoStory() {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>()
    const songList = useSelector((state: RootState) => state.searchSongSlice.searchSong);
    const searchSong = useSelector((state: RootState) => state.searchSongSlice);
    const debounceTime = useDebounce(searchTerm, 3000);
    const addTextToPhoto = () => {

    }
    const addMusicToPhoto = () => {
        setOpenModal(true)
    }

    useEffect(() => {
        if (debounceTime.trim() != '') {
            dispatch(searchSongThunk(searchTerm));
        }
    }, [debounceTime]);

    const handleInputChange = (ev: any) => {
        setSearchTerm(ev.target.value);
    }

    const selectSong = (song: any) => {
        dispatch(setSelectedSong(song))
        setOpenModal(false)
    }

    const closeDialog = () => {
        setOpenModal(false)
        dispatch(clearSearch());
    }

    return <div className="flex flex-col gap-5 p-3">
        <div onClick={addTextToPhoto} className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#E5E7EB"/>
                <text x="12" y="16"
                      textAnchor="middle"
                      fontSize="12" fontFamily="Arial" fill="#111827">Aa
                </text>
            </svg>
            Add Text
        </div>
        <div onClick={addMusicToPhoto} className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 width="40"
                 height="40"
                 fill="currentColor">
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
            </svg>
            Add Music
        </div>
        {openModal && (<Modal className="absolute inset-0 w-full h-full bg-[rgba(255,255,255,0.7)]">
            <div
                className="w-[500px] h-[760px] bg-[#cdc8c8] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10">

                <CloseSvg className="absolute right-0 top-[-9px] w-[38px] h-[58px]" onClick={closeDialog}/>

                <div className="search-input">

                    <Input type="search"
                           placeholder="Song Name"
                           className="w-full h-[55px] bg-white rounded-[8px] mb-5 p-2 outline-none focus:ring-0"
                           name="q"
                           onChange={handleInputChange}/>
                </div>

                <div className="rearch-result h-[90%] overflow-y-auto">

                    {searchSong.status === StatusEnum.IDLE &&
                        <p>Search to find Song...</p>
                    }

                    {searchSong.status === StatusEnum.REJECTED &&
                        <p>There is something went wrong</p>
                    }

                    {searchSong.status === StatusEnum.LOADING &&
                        <div
                            className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto my-5"></div>
                    }

                    {songList && searchSong.status === StatusEnum.SUCCEED && songList.map((song, index) => (
                        <div
                            key={song.trackId + index}
                            className="flex items-center gap-3 p-3 mb-2 bg-white rounded hover:bg-gray-50 cursor-pointer hover:bg-[#000000]"
                            onClick={() => selectSong(song)}
                        >
                            <img
                                src={song.artworkUrl100}
                                alt={song.trackName}
                                className="w-16 h-16 rounded"
                            />
                            <div className="flex-1 w-[100px]">
                                <h4 className="font-semibold">{song.trackName}</h4>
                                <p className="text-sm text-gray-600 truncate">{song.artistName}</p>
                                <p className="text-xs text-gray-400 truncate ">{song.collectionName}</p>
                            </div>

                            {song.previewUrl && (
                                <audio
                                    controls
                                    src={song.previewUrl}
                                    className="w-48"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Modal>)
        }
    </div>
}