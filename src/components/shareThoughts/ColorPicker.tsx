import Input from "../../UI/Input";
import EmojiPicker from "emoji-picker-react";
import {useState} from "react";
import {storyFormProps} from "../../Interface/story-form-props.type";


export default function ColorPicker({form, setForm, setEmoji}: storyFormProps) {


    const [showPicker, setShowPicker] = useState(false);
    const onEmojiClick = (emojiObject: any) => {
        if (setEmoji) {
            setEmoji(emojiObject.emoji);
        }
    };

    return <div className="flex justify-between mb-2">
        <div>

            <Input name="color"
                   value={form.bgColor}
                   onChange={(event) => setForm(event.target.value, 'bgColor')}
                   type="color"/>
            
        </div>
        <div className="relative text-[22px]">
            <button onClick={() => setShowPicker(!showPicker)} className="absolute right-0">
                😊
            </button>
            <div className="absolute bottom-0 right-0 bottom-[-457px] z-10">{
                showPicker && (<EmojiPicker onEmojiClick={onEmojiClick}/>)
            }</div>
        </div>
    </div>
}