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
    stories: {
        photoStoryList: [
            {
                photo: "",
                photoSettings: {
                    text: "",
                    size: "",
                    color: ""

                }
            }
        ],
        textStoryList: [
            {
                text: "",
                textSettings: {
                    size: "",
                    bgColor: ""
                }
            }
        ]
    },

    user_share_list: []
}