import {ShareStory} from "./share-story.interface";

export type storyFormProps = {
    form: ShareStory,
    setForm: (value: string , type: string) => void,
    setEmoji?: (emoji:string) => void
}