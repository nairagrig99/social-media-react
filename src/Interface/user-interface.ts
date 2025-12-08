import {iTunesTrack} from "./itunes-track.interface";

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
    stories: UserStoryModel,
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

export interface UserStoryModel {
    photoStoryList: {
        photo: string;
        photoSettings: {
            text: string;
            fontSize: string;
            color: string;
            song?: iTunesTrack | null;
        };
        createdDate: ""
    }[];

    textStoryList: {
        text: string;
        textSettings: {
            song?: iTunesTrack | null;
            text: {
                fontSize: string;
                color: string;
                positionX: number,
                positionY: number
            }
        }
        createdDate: ""
    }[];
}

export type StoryCombineAndModal = UserStoryModel["photoStoryList"][number] & UserStoryModel["textStoryList"][number];
export type StoryCombineOrModal = UserStoryModel["photoStoryList"][number] | UserStoryModel["textStoryList"][number];

export type StoryPhoto = UserStoryModel["photoStoryList"][number];
export type StoryText = UserStoryModel["textStoryList"][number];

export type StoryCombineModal = {
    photoStoryList: UserStoryModel["photoStoryList"];
    textStoryList: UserStoryModel["textStoryList"];
}