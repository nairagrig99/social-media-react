import UserStory from "./UserStory";
import UserShare from "./shareThoughts/UserShare";
import UserFeedAndShares from "./UserFeedAndShares";


export default function Feed() {
    return <div className="w-[500px] flex gap-10 relative right-0 left-1/2 -translate-x-1/2 transform">
        <div className=" w-full h-fit-content p-5 flex flex-col gap-10">
            <UserShare/>
            <UserStory/>
            <UserFeedAndShares/>
        </div>
    </div>
}