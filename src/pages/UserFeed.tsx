import UserprofileInFeed from "../components/UserprofileInFeed";
import Feed from "../components/Feed";
import FeedEvents from "../components/FeedEvents";


export default function UserFeed() {

    return <div className="flex gap-10 justify-between feed">
        <UserprofileInFeed/>
        <Feed/>
        <FeedEvents/>
    </div>
}