
import {iTunesTrack} from "./itunes-track.interface";
import {PictureBlob} from "./picture-blob.interface";
import {TextSettings} from "../Store/TextStorySlice";

export interface PhotoStory {
    id: string;
    key: string;
    text?:string;
    innerKey: string;
    photo?: string;
    createdDate: string;
    photoSettings?: PhotoSettings;
    textSettings?:PhotoSettings
}
interface PhotoSettings {
    text: TextSettings;
    song: iTunesTrack;
}