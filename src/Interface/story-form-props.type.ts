import {ShareStory} from "./share-story.interface";

export type storyFormProps = {
    form: string | string[],
    setForm: <K extends keyof ShareStory>(key: K, value: ShareStory[K]) => void,
    disabled?: boolean
}