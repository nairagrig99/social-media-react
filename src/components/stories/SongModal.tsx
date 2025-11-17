import Modal from "../Modal";
import CloseSvg from "../../UI/CloseSvg";
import Input from "../../UI/Input";
import {StatusEnum} from "../../constants/status.enum";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../Store/store";
import {clearSearch, setSelectedSong} from "../../Store/songSlice";
import {useEffect, useState} from "react";
import {searchSongThunk} from "../../Store/songThunk";
import useDebounce from "../../Hooks/useDebounce";

type SongProps = {
    setOpenModal: (data: boolean) => void
}

export default function SongModal({setOpenModal}: SongProps) {

    const songList = useSelector((state: RootState) => state.searchSongSlice.searchSong);
    const searchSong = useSelector((state: RootState) => state.searchSongSlice);
    const dispatch = useDispatch<AppDispatch>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debounceTime = useDebounce(searchTerm, 3000);

    useEffect(() => {
        if (debounceTime.trim() != '') {
            dispatch(searchSongThunk(searchTerm));
        }
    }, [debounceTime]);
    const handleInputChange = (ev: any) => {
        setSearchTerm(ev.target.value);
    }

    const selectSong = (song: any) => {
        dispatch(setSelectedSong(song));
        setOpenModal(false);
    }

    const closeDialog = () => {
        dispatch(clearSearch());
        setOpenModal(false);
    }

    return <Modal className="absolute inset-0 w-full h-full bg-[rgba(255,255,255,0.7)]">
        <div
            className="w-[500px] h-[760px] z-[9999] bg-[#cdc8c8] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10">

            <CloseSvg className="absolute right-0 top-[-9px] w-[38px] h-[58px]" onClick={closeDialog}/>

            <div className="search-input">

                <Input type="search"
                       placeholder="Song Name"
                       className="w-full h-[55px] bg-white rounded-[8px] mb-5 p-2 outline-none focus:ring-0"
                       name="q"
                       value={searchTerm}
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
    </Modal>
}