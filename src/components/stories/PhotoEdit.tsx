type Photo = {
    photoStory: string
}
export default function PhotoEdit({photoStory}: Photo) {
    return <div>
        <img src={photoStory} alt=""/>
    </div>
}