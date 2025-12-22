import EmojiPicker from "emoji-picker-react";
import React, {useState} from "react";

type EmojiProps = {
    setEmoji?: (emoji: string) => void
}
const SelectEmoji = React.memo(({setEmoji}: EmojiProps) => {
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (emojiObject: any) => {
        if (setEmoji) {
            setEmoji(emojiObject.emoji);
        }
    };
    return (
        <div className="relative text-[22px]">
            <button onClick={() => setShowPicker(!showPicker)} className="absolute right-0">
                😊
            </button>
            <div className="absolute bottom-0 right-0 bottom-[-457px] z-10">{
                showPicker && (<EmojiPicker onEmojiClick={onEmojiClick}/>)
            }</div>
        </div>
    )
})

export default SelectEmoji;