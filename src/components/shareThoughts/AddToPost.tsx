import SharePhoto from "./SharePhoto";
import MentionFriend from "./MentionFriend";
import React from "react";
import ShareFeeling from "./ShareFeeling";
import Location from "./Location";


const AddToPost = () => {

    return <div className="flex items-center justify-between py-2 border p-2 rounded mb-2">
        <p>Add to your post</p>

        <div className="flex">
            <SharePhoto/>
            <MentionFriend/>
            <Location/>
            <ShareFeeling/>
        </div>

    </div>
}
export default AddToPost;