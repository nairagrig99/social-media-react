export interface ProfileMenuInterface {
    "id": number,
    "label": string,
    "icon": string
}

export interface ProfileMenuState {
    data: ProfileMenuInterface | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}