import Button from "../../UI/Button";
import EditSvg from "../../UI/EditSvg";
import Modal from "../../UI/Modal";

export default function EditProfile() {

    const editProfile = () => {

    }

    return <div
        className="bg-[rgb(145_141_141/20%)] p-[5px] rounded-[5px] flex justify-between items-center gap-1 absolute right-0 bottom-[-58px]">
        <EditSvg/>
        <Button value='Edit profile'/>
    </div>
}