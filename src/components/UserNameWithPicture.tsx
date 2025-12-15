import {useSelector} from "react-redux";
import {RootState} from "../Store/store";
import {UserInterface} from "../Interface/user-interface";
import {ProfileMenuInterface} from "../Interface/profile-menu.interface";
import metaAi from '../assets/images/meta-ai.png';
import friends from '../assets/images/friends.png';
import memories from '../assets/images/memories.png';
import avatar from '../assets/images/avatar.png';
import React from "react";
import Loading from "./HOC/Loading";


const menuItems = [
    {id: 1, label: "Meta AI", icon: metaAi},
    {id: 2, label: "Friends", icon: friends},
    {id: 3, label: "Memories", icon: memories},
    {id: 4, label: "Saved", icon: metaAi},
    {id: 5, label: "Groups", icon: friends},
    {id: 6, label: "Video", icon: memories},
    {id: 7, label: "Marketplace", icon: metaAi},
    {id: 8, label: "Feeds", icon: memories},
    {id: 9, label: "Events", icon: metaAi},
];

type menuInterface = {
    isShown?: boolean
}
const UserNameWithPicture = React.memo(function UserNameWithPicture({isShown = true}: menuInterface) {

    const user: UserInterface = useSelector((state: RootState) => state.userStore.signInUser);

    if (!user) {
        return null;
    }

    return (
        <div className="">
            <div className="flex gap-2.5 items-center">
                <img src={user.profile_image ? user.profile_image : avatar} alt=""
                     className="w-[40px] border border-solid rounded-full"/>
                <h3>{user.first_name}</h3>
            </div>

            {isShown && (<div className="mt-5">
                    {
                        menuItems && (menuItems.map((menu: ProfileMenuInterface) => {
                            return (
                                <div key={menu.id} className="pb-2.5 flex items-center gap-5">
                                    {<img className="w-[35px]" src={menu.icon}/>}
                                    <span>{menu.label}</span>
                                </div>
                            );
                        }))
                    }
                </div>
            )}
        </div>
    )
})
// export default UserNameWithPicture
export default Loading(UserNameWithPicture)

