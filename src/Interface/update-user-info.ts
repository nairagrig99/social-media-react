import {UserStoryModel} from "./user-interface";


export interface UpdateUserInfo {
    id: string,
    key: string,
    value: (string | UserStoryModel)[],
    createdDate: string
}