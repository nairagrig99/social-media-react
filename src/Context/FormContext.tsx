import {ShareStory} from "../Interface/share-story.interface";

import {createContext} from "react";

interface FormContextType {
    form: ShareStory;
    handleChange: <K extends keyof ShareStory>(key: K, value: ShareStory[K]) => void;
    removeImage?: (index: number) => void
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

