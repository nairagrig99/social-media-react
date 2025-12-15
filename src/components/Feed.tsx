import UserStory from "./UserStory";
import UserFriendsStory from "./UserFriendsStory";
import UserShare from "./shareThoughts/UserShare";
import UserFeedAndShares from "./UserFeedAndShares";


export default function Feed() {
    return <div className="w-[500px] flex gap-10">
        <div className=" w-full h-fit-content p-5 flex flex-col gap-10">
            <UserShare/>
            <UserStory/>
            <UserFriendsStory/>
            <UserFeedAndShares/>
        </div>
    </div>
}