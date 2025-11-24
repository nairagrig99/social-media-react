import {UserStory} from "./user-interface";

export interface UpdateUserInfo {
    id: string,
    key: string,
    value: (string | UserStory)[],
    createdDate: Date
}