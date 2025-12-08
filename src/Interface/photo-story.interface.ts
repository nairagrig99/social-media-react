import {iTunesTrack} from "./itunes-track.interface";
import {TextSettings} from "../Store/TextStorySlice";
import {StoryCombineModal, StoryPhoto, StoryText} from "./user-interface";

export interface PhotoStory {
    id: string,
    key: string,
    photoStoryList: StoryPhoto[],
    textStoryList: StoryText[]
    // updatedValue: StoryCombineModal
}

interface PhotoSettings {
    text: TextSettings;
    song: iTunesTrack;
}