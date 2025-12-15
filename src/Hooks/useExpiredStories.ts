import {StoryCombineOrModal} from "../Interface/user-interface";

export default function useExpiredStories() {
    return function handleExpiredStories(story: StoryCombineOrModal[]) {
        return story && story.filter((story) => {
            const now = Date.now();
            const createdAt = new Date(story.createdDate).getTime();
            const hoursPassed = (now - createdAt) / (1000 * 60 * 60);
            return hoursPassed >= 24
        });
    }
}