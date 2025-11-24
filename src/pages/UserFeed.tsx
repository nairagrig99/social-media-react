import UserprofileInFeed from "../components/UserprofileInFeed";
import Feed from "../components/Feed";
import FeedEvents from "../components/FeedEvents";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchUser} from "../Store/userThunk";
import {AppDispatch} from "../Store/store";

export default function UserFeed() {

    return <div className="flex gap-10 justify-between feed">
        <UserprofileInFeed/>
        <Feed/>
        <FeedEvents/>
    </div>
}