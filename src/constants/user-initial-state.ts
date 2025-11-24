import {initialInterface, RecordUser, UserInterface} from "../Interface/user-interface";

export const INITIAL_STATE: RecordUser = {
    record: {
        sign_in: {
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
                        createdDate: new Date()
                    }
                ],
                textStoryList: [
                    {
                        text: "",
                        textSettings: {
                            fontSize: "",
                            bgColor: ""
                        },
                        createdDate: new Date()
                    }
                ]
            },

            user_share_list: []
        }
    }
}