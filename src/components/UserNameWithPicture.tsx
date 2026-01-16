import {useSelector} from "react-redux";
import {RootState} from "../Store/store";
import {UserInterface} from "../Interface/user-interface";

import avatar from '../assets/images/avatar.png';
import React from "react";
import Loading from "./HOC/Loading";
import {Link} from "react-router-dom";
import LeftSideMenu from "./LeftSideMenu";

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
            <Link to='/Profile' className="flex gap-2.5 items-center">
                <img src={user.profile_image ? user.profile_image : avatar} alt=""
                     className="w-[40px] border border-solid rounded-full"/>
                <h3>{user.first_name}</h3>
            </Link>

            {isShown && <LeftSideMenu/>}
        </div>
    )
})
export default Loading(UserNameWithPicture, {statusProps: (state: RootState) => state.userStore.status});

