import {UserInterface} from "../Interface/user-interface";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Store/store";
import profileImage from "../assets/images/avatar.png"
import Input from "../UI/Input";
import Button from "../UI/Button";
import {updateUser} from "../Store/userThunk";
import {useState} from "react";

export default function UserShare() {
    const user: UserInterface = useSelector((state: RootState) => state.userStore.data);
    const [form, setForm] = useState<string>('')
    const dispatch = useDispatch();

       const shareThoughts = () => {
        const date = new Date()

        const formatted = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}_${date.getMilliseconds()}ms`;
        const updateValue = {
            [formatted]: {
                id: user.id,
                key: 'user_share_list',
                value: form
            }
        }
        // @ts-ignore
        dispatch(updateUser(updateValue))
    }


    return (
        <div className="flex gap-2.5 items-center bg-white rounded-xl p-2.5">
            <img src={user.profile_image ? user.profile_image : profileImage} className="w-[45px]"/>
            <Input name="share"
                   onChange={(event: any) => setForm(event.target.value)}
                   blockClass="w-full"
                   placeholder={`What's on your mind ${user.first_name}?`}
                   className="bg-[#d4cdcd] p-2.5 rounded-4xl w-full "/>
            <Button onClick={shareThoughts} value="share" className="text-white bg-[#4545d4] rounded-lg px-3 py-2"/>
        </div>
    )
}