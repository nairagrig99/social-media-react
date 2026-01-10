import {useSelector} from "react-redux";
import {RootState} from "../Store/store";

import UserShareInFeed from "./shareThoughts/UserShareInFeed";
import ShareThoughts from "./shareThoughts/ShareThoughts";
import EditPost from "./shareThoughts/EditPost";

export default function UserFeedAndShares() {
    const selectStore = useSelector((state: RootState) => state.userStore.signInUser);

    if (!selectStore) return null;
    return (
        <div>
            {
                Object.entries(selectStore.user_share_list).map(([dateKey, value]) => (
                    <div key={dateKey} className=" bg-white flex justify-between p-[15px] border border-solid mb-2">
                        <div>
                            <UserShareInFeed user={selectStore} info={value} date={dateKey}></UserShareInFeed>
                            <ShareThoughts shareText={value}></ShareThoughts>
                        </div>
                        <EditPost content={value}></EditPost>
                    </div>

                ))
            }
        </div>
    )
}