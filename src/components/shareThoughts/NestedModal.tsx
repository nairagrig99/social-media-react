import ImageSwiper from "./ImageSwiper";
import React from "react";
import SearchFriendList from "./FriendsList";
import {useSelector} from "react-redux";
import {RootState} from "../../Store/store";
import {ComponentModalEnum} from "../../constants/component-modal.enum";
import GoBack from "./GoBack";
import SearchLocation from "./SearchLocation";
import ShareFellingWithEmoji from "./ShareFellingWithEmoji";

export default function NestedModal() {
    const select = useSelector((state: RootState) => state.modalStory);

    if (!select.isShowShare) return null;

    return (
        <>
            <GoBack/>
            {select.content === ComponentModalEnum.IMAGES && <ImageSwiper/>}
            {select.content === ComponentModalEnum.FRIEND_LIST && <SearchFriendList/>}
            {select.content === ComponentModalEnum.LOCATION && <SearchLocation/>}
            {select.content === ComponentModalEnum.FEELING_EMOJI && <ShareFellingWithEmoji/>}
        </>
    )
}