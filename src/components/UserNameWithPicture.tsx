import {useSelector} from "react-redux";
import {RootState} from "../Store/store";
import {UserInterface} from "../Interface/user-interface";
import avatar from '../assets/images/avatar.png'
import {ProfileMenuInterface} from "../Interface/profile-menu.interface";

const menuItems = [
    {
        "id": 1,
        "label": "Meta AI",
        "icon": "../assets/images/meta-ai.png"
    },
    {
        "id": 2,
        "label": "Friends",
        "icon": "friends.png"
    },
    {
        "id": 3,
        "label": "Memories",
        "icon": "memories.png"
    },
    {
        "id": 4,
        "label": "Saved",
        "icon": "saved.png"
    },
    {
        "id": 5,
        "label": "Groups",
        "icon": "groups.png"
    },
    {
        "id": 6,
        "label": "Video",
        "icon": "video.png"
    },
    {
        "id": 7,
        "label": "Marketplace",
        "icon": "marketplace.png"
    },
    {
        "id": 8,
        "label": "Feeds",
        "icon": "feeds.png"
    },
    {
        "id": 9,
        "label": "Events",
        "icon": "events.png"
    }
]
export default function UserNameWithPicture() {
    const user: UserInterface = useSelector((state: RootState) => state.userStore.data)

    return (
        <div className="">
            <div className="flex gap-2.5 items-center">
                <img src={user.profile_image ? user.profile_image : avatar} alt=""
                     className="w-[40px] border border-solid rounded-full"/>
                <h3>{user.first_name}</h3>
            </div>
            <div className="mt-5">
                {
                    menuItems && (menuItems.map((menu: ProfileMenuInterface) => {
                        return (
                            <div key={menu.id} className="pb-2.5">
                                <span>{menu.label}</span>
                                {/*{<img src={menu.icon}/>}*/}
                            </div>
                        );
                    }))
                }
            </div>
        </div>
    )
}