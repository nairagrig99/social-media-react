import {ProfileMenuInterface} from "../Interface/profile-menu.interface";
import React from "react";
import MetaAiSvg from "../UI/MetaAi";
import PeopleSvg from "../UI/PeoplSvg";
import MemorizeSvg from "../UI/MemorizeSvg";
import SavedSvg from "../UI/SavedSvg";
import GroupsSvg from "../UI/GroupsSvg";
import MarketPlace from "../UI/MarketPlace";
import EventsSvg from "../UI/EventsSvg";

export default function LeftSideMenu() {
    return <>
        <div className="mt-5">

            <div className="pb-2.5 flex items-center gap-5">
                <MetaAiSvg/>
                <span>Meta Ai</span>
            </div>
            <div className="pb-2.5 flex items-center gap-5">
                <PeopleSvg/>
                <span>Friends</span>
            </div>
            <div className="pb-2.5 flex items-center gap-5">
                <MemorizeSvg/>
                <span>Memories</span>
            </div>
            <div className="pb-2.5 flex items-center gap-5">
                <SavedSvg/>
                <span>Saved</span>
            </div>
            <div className="pb-2.5 flex items-center gap-5">
                <GroupsSvg/>
                <span>Groups</span>
            </div>
            <div className="pb-2.5 flex items-center gap-5">
                <MarketPlace/>
                <span>Marketplace</span>
            </div>
            <div className="pb-2.5 flex items-center gap-5">
                <EventsSvg/>
                <span>Events</span>
            </div>

        </div>

    </>
}