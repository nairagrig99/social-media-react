export interface UserInterface {
    id: number,
    personal_information: PersonalInformationInterface[]
}

interface PersonalInformationInterface {
    name: string,
    photo: [],
    coverPhoto: [],
    friends: []
}