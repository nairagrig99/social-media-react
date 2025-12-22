import {storyFormProps} from "../../Interface/story-form-props.type";
import SharePhoto from "./SharePhoto";
import MentionFriend from "./MentionFriend";
import ShareFeeling from "./ShareFeeling";
import Location from "./Location";
import Gif from "./Gig";
import React from "react";

const AddToPost = () => {

    return <div className="flex items-center justify-between py-2 border p-2 rounded mb-2">
        <p>Add to your post</p>

        <div className="flex">
            <SharePhoto/>
            <MentionFriend/>
            <ShareFeeling/>
            <Location/>
            <Gif/>
        </div>
    </div>
}
export default AddToPost;