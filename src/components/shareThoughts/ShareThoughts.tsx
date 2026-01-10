import {ShareStory} from "../../Interface/share-story.interface";
import ImageGrid from "./ImageGrid";

type ShareProps = {
    shareText: ShareStory
}

export default function ShareThoughts({shareText}: ShareProps) {
    return <>
        {shareText.text && <p>{shareText.text}</p>}
        {shareText.images.length > 0 &&  <ImageGrid images={shareText.images}></ImageGrid>}
    </>


}