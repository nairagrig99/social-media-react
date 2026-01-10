import {UserInterface} from "../../Interface/user-interface";
import {useSelector} from "react-redux";
import {RootState} from "../../Store/store";
import avatar from "../../assets/images/avatar.png"
import useContextHook from "../../Hooks/useContextHook";

export default function UserFeelings() {

    const user: UserInterface = useSelector((state: RootState) => state.userStore.signInUser);
    const context = useContextHook();

    if (!user) {
        return null;
    }

    if (!context) return null

    return (
        <div className="">
            <div className="flex gap-2.5 items-center">
                <img src={user.profile_image ? user.profile_image : avatar} alt=""
                     className="w-[40px] border border-solid rounded-full"/>
                <h3>{user.first_name}</h3>
                <div className="flex flex-wrap">
                    {context && (
                        <div>
                            {context.form.feelingEmoji && (
                                <span> feeling {context.form.feelingEmoji}</span>
                            )}
                            <br/>
                            {context.form.friends && (
                                <span> with {context.form.friends}</span>
                            )}
                            <br/>
                            {context.form.location && (<span> at {context.form.location}</span>)}
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}


