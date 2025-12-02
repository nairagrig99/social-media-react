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
                    fontSize: "",
                    color: "",
                },
                // @ts-ignore
                createdDate: new Date().toISOString()
            }
        ],
        textStoryList: [
            {
                text: "",
                textSettings: {
                    song: null,
                    text: {
                        fontSize: "",
                        color: "",
                        positionX: 0,
                        positionY: 0
                    }
                },
                // @ts-ignore
                createdDate: new Date().toISOString()
            }
        ]
    },
    user_share_list: []

}