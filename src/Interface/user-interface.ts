import {iTunesTrack} from "./itunes-track.interface";

export interface RecordUser {
    record: initialInterface
}

export interface initialInterface {
    sign_in: UserInterface,
    sign_up?: UserInterface[]
}

export interface UserInterface {
    id: string,
    profile_image: string,
    photo: [],
    coverPhoto: [],
    friends: []
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    re_password: string;
    gender: string;
    birthOfDate: string;
    country: string;
    city: string;
    stories: UserStory,
    user_share_list: UserShareList[]
}

export interface UserShareList {
    share_date: ShareListItem
}

export interface ShareListItem {
    text: string,
    images: string[],
    video: string[]
}

export interface UserStory {
    photoStoryList: {
        photo: string;
        photoSettings: {
            text: string;
            fontSize: string;
            color: string;
            song?: iTunesTrack | null;
        };
        createdDate: Date
    }[];

    textStoryList: {
        text: string;
        textSettings: {
            fontSize: string;
            bgColor: string;
            song?: iTunesTrack | null;
        };
        createdDate: Date
    }[];
}



