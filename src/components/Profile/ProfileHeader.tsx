import CoverPhoto from "./CoverPhoto";
import ProfilePhoto from "./ProfilePhoto";
import EditProfile from "./EditProfile";

export default function ProfileHeader() {
    return <div className="flex flex-col items-center relative w-[900px] mx-auto">
        <CoverPhoto/>
        <div className="flex">
            <ProfilePhoto/>
            <EditProfile/>
        </div>
    </div>
}