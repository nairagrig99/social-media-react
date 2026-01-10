import {UserInterface} from "../../Interface/user-interface";
import {useSelector} from "react-redux";
import {RootState} from "../../Store/store";
import avatar from "../../assets/images/avatar.png"
import useContextHook from "../../Hooks/useContextHook";
import {ShareStory} from "../../Interface/share-story.interface";
import DateStructr from "./DateStructr";

type UserInfo = {
    user: UserInterface,
    info: ShareStory,
    date: string,
}
export default function UserShareInFeed({user, info, date}: UserInfo) {

    return (
        <div className="mb-5">
            <div className="flex gap-2.5 items-center">
                <img src={user.profile_image ? user.profile_image : avatar} alt=""
                     className="w-[40px] border border-solid rounded-full"/>
                <div>
                    <h3>{user.first_name}</h3>
                </div>
                <div className="flex flex-wrap">
                    {info && (
                        <div>
                            {info.feelingEmoji && (
                                <span> feeling {info.feelingEmoji}</span>
                            )}
                            {info.friends && (
                                <span> with {info.friends}</span>
                            )}
                            {info.location && (<span> at {info.location}</span>)}
                        </div>
                    )}
                </div>
            </div>
            <DateStructr date={date}/>
        </div>
    )
}


