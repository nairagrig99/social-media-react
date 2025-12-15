import CloseSvg from "../../UI/CloseSvg";
import FacebookLogo from "../../UI/FacebookLogo";
import {Link} from "react-router-dom";
import UserNameWithPicture from "../UserNameWithPicture";
import SettingsForPhotoStory from "./SettingsForPhotoStory";
import SettingsForTextStory from "./SettingsForTextStory";
import {StorySettings} from "../../Interface/story-settings";
import {RootState} from "../../Store/store";
import {useSelector} from "react-redux";

export default function LeftSideOfStoryMenu({photoStory, textStory}: StorySettings) {

    const user = useSelector((state: RootState) => state.userStore.signInUser);
    const isLoading = useSelector((state: RootState) => state.userStore.status);


    return <div>
        <div className="flex items-center gap-2 border-b border-solid p-2">
            <Link to="/feed">
                <CloseSvg/>
            </Link>
            <Link to="/">
                <FacebookLogo/>
            </Link>
        </div>
        <div className="p-2 border-b border-solid">
            <UserNameWithPicture isShown={false} status={isLoading || !!user}/>
        </div>
        <div>
            {photoStory && (<SettingsForPhotoStory/>)}
            {textStory && (<SettingsForTextStory/>)}
        </div>
    </div>
}