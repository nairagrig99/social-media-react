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
    stories: string[],
    user_share_list: UserShareList[]
}

export interface UserShareList {
    "share_date": ShareListItem
}

export interface ShareListItem {
    "text": string,
    "images": string[],
    "video": string[]
}




