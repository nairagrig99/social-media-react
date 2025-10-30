import UserprofileInFeed from "../components/UserprofileInFeed";
import Feed from "../components/Feed";
import FeedEvents from "../components/FeedEvents";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchUser, profileMenu} from "../Store/userThunk";

export default function UserFeed() {
    const userStoreDispatch = useDispatch();
    useEffect(() => {
        // @ts-ignore
        userStoreDispatch(fetchUser())
    }, [userStoreDispatch]);

    return <div className="flex gap-10 justify-between feed">
        <UserprofileInFeed/>
        <Feed/>
        <FeedEvents/>
    </div>
}