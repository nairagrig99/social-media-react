import {UserInterface} from "../Interface/user-interface";

export const INITIAL_STATE: UserInterface = {
    id: '',
    photo: [],
    profile_image: '',
    coverPhoto: [],
    friends: [],
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    re_password: "",
    gender: "",
    birthOfDate: "",
    country: "",
    city: "",
    cover_photo: {
        photo: "",
        settings: {x:0,y:0}
    },
    cover_photo_list: [],
    profile_photo: "",
    profile_photo_list: [],
    stories: {
        photoStoryList: [],
        textStoryList: []
    },
    user_share_list: []

}